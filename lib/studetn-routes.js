const express = require('express');
const router = express.Router();
const bearerMiddleware = require('../middleware/bearer-auth');
const authorizeMid = require('../middleware/authorize');
const notFoundHandler = require('../middleware/404');
const errorHandler = require('../middleware/500');
const laptop = require('../model/laptop-model');
const studentLaptop = require('../model/laptops-students-model');
const studnets = require('../model/student-model');
const program = require('../model/programs-model');
const logger = require('./logger');

router.post(
  '/students',
  bearerMiddleware,
  authorizeMid('create'),
  async (req, res) => {
    try {
      let data = req.body;
      console.log(data);
      let rows = await studnets.create(data);
      res.status(201).json(rows);
    } catch (err) {
      errorHandler(err);
    }
  }
);

router.get(
  '/students',
  bearerMiddleware,
  authorizeMid('read'),
  async (req, res) => {
    try {
      let rows = await studnets.read();
      res.status(200).json(rows);
    } catch (err) {
      errorHandler(err);
    }
  }
);

router.put(
  '/students',
  bearerMiddleware,
  authorizeMid('update'),
  async (req, res) => {
    try {
      let data = req.body;
      let rows = await studnets.update(data);
      res.status(200).json(rows);
    } catch (err) {
      errorHandler(err);
    }
  }
);

router.delete(
  '/students',
  bearerMiddleware,
  authorizeMid('delete'),
  async (req, res) => {
    try {
      let data = req.body;
      let rows = await studnets.delete(data);
      res.status(200).json(rows);
    } catch (err) {
      errorHandler(err);
    }
  }
);

router.get(
  '/students/search',
  bearerMiddleware,
  authorizeMid('read'),
  async (req, res) => {
    if (req.query.nationality) {
      let nationality = req.query.nationality;
      try {
        let rows = await studnets.readByConditon({
          key: 'nationality',
          value: nationality,
        });
        res.status(200).json(rows);
      } catch (err) {
        errorHandler(err);
      }
    } else if (req.query.status) {
      let studentStatus = req.query.status;
      try {
        let rows = await studnets.readByConditon({
          key: 'student_status',
          value: studentStatus,
        });
        res.status(200).json(rows);
      } catch (err) {
        errorHandler(err);
      }
    } else if (req.query.program) {
      let prog = req.query.program;
      let programInfo = await program.readByConditon({
        key: 'id',
        value: prog,
      });

      let rows = await studnets.readByProgram([
        {
          key: 'program_name',
          value: programInfo[0].name,
        },
        {
          key: 'program_version',
          value: programInfo[0].version,
        },
      ]);
      res.status(200).json(rows);
    } else {
      notFoundHandler();
    }
  }
);

router.get(
  '/studentsWithLaptops/search',
  bearerMiddleware,
  authorizeMid('read'),
  async (req, res) => {
    if (req.query.studentId) {
      let studentId = req.query.studentId;
      try {
        let rows = await studentLaptop.readByConditon({
          key: 'std_id',
          value: studentId,
        });
        res.status(200).json(rows);
      } catch (err) {
        errorHandler(err);
      }
    } else if (req.query.laptopSerial) {
      let laptopSerial = req.query.laptopSerial;
      try {
        let rows = await studentLaptop.readByConditon({
          key: 'laptop_id',
          value: laptopSerial,
        });
        res.status(200).json(rows);
      } catch (err) {
        errorHandler(err);
      }
    } else if (req.query.availability) {
      let laptop_availability = req.query.availability;
      try {
        let rows = await studentLaptop.readByConditon({
          key: 'availability_student',
          value: laptop_availability,
        });
        res.status(200).json(rows);
      } catch (err) {
        errorHandler(err);
      }
    } else {
      notFoundHandler();
    }
  }
);

router.post(
  '/students/assignLaptop',
  bearerMiddleware,
  authorizeMid('create'),
  async (req, res) => {
    if (req.body.studentId && req.body.laptopSerial) {
      let studentId = req.body.studentId;
      let laptopSerial = req.body.laptopSerial;

      try {
        let laptopInfo = await laptop.readByConditon({
          key: 'serial_no',
          value: laptopSerial,
        });
         console.log(laptopInfo);
        if (!laptopInfo[0].availability) {
          errorHandler('laptop not available');
        }
        let changeLaptopAvailablity = await laptop.updateAvailabilty([
          laptopSerial,
          false,
        ]);

        let assignLaptopToStudent = await studentLaptop.assign({
          std_id: studentId,
          laptop_id: laptopSerial,
          availability_student: true,
        });
        console.log(assignLaptopToStudent);
        await logger({
          timestamp: new Date().toISOString(),
          action: 'Grant',
          user: req.user.username,
          description: `${req.user.username} granted laptop with s/n: ${laptopSerial} to student with std_id: ${studentId}`,
        });
        res.status(200).json({
          assigned: assignLaptopToStudent,
          available: changeLaptopAvailablity,
        });
      } catch (err) {
        errorHandler(err);
      }
    }
  }
);

router.get(
  '/studentLaptops',
  bearerMiddleware,
  authorizeMid('read'),
  async (req, res) => {
    try {
      let laptopInfo = await studentLaptop.joinLaptopStudent();
      res.status(200).send(laptopInfo);
    } catch (err) {
      errorHandler(err);
    }
  }
);

router.post(
  '/students/returnLaptop/',
  bearerMiddleware,
  authorizeMid('create'),
  async (req, res) => {
    if (req.body.studentId && req.body.id &&req.body.laptopSerial) {
      let studentId = req.body.studentId;
      let laptopSerial = req.body.laptopSerial;

      try {
        let laptopInfo = await laptop.readByConditon({
          key: 'serial_no',
          value: laptopSerial,
        });
        if (laptopInfo[0].availability) {
          errorHandler('Laptop is already returned');
        }
        let changeLaptopAvailablity = await laptop.updateAvailabilty([
          laptopSerial,
          true,
        ]);

        let returnLaptopFromStudent = await studentLaptop.update({
          std_id: null,
          laptop_id: null,
          id: req.body.id,
          availability_student: false,
        });

        console.log(returnLaptopFromStudent);
        await logger({
          timestamp: new Date().toISOString(),
          action: 'Return',
          user: req.user.username,
          description: `Student with std_id: ${studentId} returned laptop with s/n: ${laptopSerial} to ${req.user.username}`,
        });
        res.status(200).json({
          assigned: returnLaptopFromStudent,
          available: changeLaptopAvailablity,
        });
      } catch (err) {
        errorHandler(err);
      }
    }
  }
);
module.exports = router;
