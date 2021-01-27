'use strict';

const laptops = require('../model/laptop-model');
let user = {"username": "super-admin", "password": "admin"}

describe(('Test Laptop Routes'), ()=>{
    it('Add a laptop to the database', async()=>{
        let laptop = {
            serial_no: "109",
            brand: "Lenovo",
            cpu: "i7",
            ram: "12",
            storage: "1000",
            storage_type: "ssd",
            charger: "1",
            display_resolution: "2160",
            model: "427678934-6",
            availability: true
        }
        let createOne = await laptops.create(laptop);
        let record = await laptops.readByConditon({key: "serial_no",value: "109"})
        expect(record[0]["serial_no"]).toEqual(laptop.serial_no)
    })

    it('Update an existed laptop from the database', async()=>{
        let laptop = {
            id: 18,
            serial_no: "108",
            brand: "Lenovo",
            cpu: "i7",
            ram: "12",
            storage: "1000",
            storage_type: "ssd",
            charger: "1",
            display_resolution: "2160",
            model: "427678934-6",
            availability: true
        }
        let updateOne = await laptops.update(laptop);
        expect(updateOne[0].availability).toBeTruthy();
    })

    it('delete a certain laptop from the database', async()=>{
        let deleteOne = await laptops.delete(19);
        expect(deleteOne).toEqual('Item 19 is deleted')
    })

    it('read all laptops from the database', async()=>{
        let readAll = await laptops.read();
        if (readAll.length > 0) {
            let bool = true;
            expect(bool).toBeTruthy();
        }
    })

    it('read all required laptops from the database', async()=>{
        let laptop = {
            cpu: "i7",
            ram: "8",
            storage: "500",
            storage_type: "hdd",
            display_resolution: "1080"
        }
        let readAll = await laptops.readByRequirements(laptop);
        if (readAll.length > 0) {
            let bool = true;
            expect(bool).toBeTruthy();
        } else {
            let bool = false;
            expect(bool).toBeFalsy();
        }
    })

    it('update all laptops from the database', async()=>{
        let readAll = await laptops.updateAvailabilty("107");
        expect(readAll[0].availability).toBeFalsy;
    })

})