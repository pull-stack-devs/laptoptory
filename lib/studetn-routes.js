const express = require('express');
const router = express.Router();
const bearerMiddleware = require('../middleware/bearer-auth');
const authorizeMid = require('../middleware/authorize');
const notFoundHandler = require('../middleware/404');
const laptop = require('../model/laptop-model');
const studentLaptop = require('../model/laptops-students-model');
const studnets = require('../model/student-model');
const program = require('../model/programs-model');

router.post(
  '/students/create',
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
  '/students/update',
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
  '/students/delete',
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
  '/students/search?',
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
  '/studentsWithLaptops/search?',
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
          key: 'availability',
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
        if (!laptopInfo[0].availability) {
          errorHandler('laptop not available');
        }
          let changeLaptopAvailablity = await laptop.updateAvailabilty(
            laptopSerial
          );
        
          let assignLaptopToStudent = await studentLaptop.assign({
            std_id: studentId,
            laptop_id: laptopSerial,
            availability: false,
          });
          res.status(200).json({"assigned":assignLaptopToStudent, "available":changeLaptopAvailablity});
      } catch (err) {
        errorHandler('laptop not available');
      }

      
      
    }
  }
);
module.exports = router;
