'use strict';

const programs = require('../model/programs-model');

describe(('Test Program Routes'), ()=>{
     it('Add a program to the database', async()=>{
        let program = {
            name: "cinematography",
            version: "v1",
            department: "sae",
            is_active: true
        }
        let createOne = await programs.create(program);
        let record = await programs.readByConditon({key: "name",value: "cinematography"})
        expect(record[0]["name"]).toEqual(program.name)
    });

    it('read all programs from the database', async()=>{
        let readAll = await programs.read();
        if (readAll.length > 0) {
            let bool = true;
            expect(bool).toBeTruthy();
        }
    })

    it('Update an existed program from the database', async()=>{
        let program = {
            name: "cinematography",
            version: "v1",
            department: "sae",
            is_active: false
        }
        let updateOne = await programs.update(program);
        let record = await programs.readByConditon({key: "name",value: "cinematography"})
        expect(record[0].is_active).toBeTruthy();
    })

    it('delete a certain program from the database', async()=>{
        let record = await programs.readByConditon({key: "name",value: "cinematography"})
        let deleteOne = await programs.delete(record[0]);
        expect(deleteOne.length).toEqual(0)
    })


});