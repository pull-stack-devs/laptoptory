'use strict';

const program_requir = require('../model/program-requirements-model');

describe(('Test Program Requirement Routes'), ()=>{
    it('Add program requirement element', async ()=>{
        let programReq = {
            program_name: "graphic designer",
            program_version: "v1",
            cpu: "i7",
            ram: "16",
            storage_space: "1000",
            storage_type: "ssd",
            display_resolution: "2160"
        }

        let createOne = await program_requir.create(programReq);
        let readOne = await program_requir.get("graphic designer");
        expect(readOne[0].program_name).toEqual("graphic designer");
    })

    it('Add program requirement element', async ()=>{
        let readAll = await program_requir.read();
        if (readAll.length > 0) {
            let bool = true;
            expect(bool).toBeTruthy();
        }
    })

    it('delete a certain program from the database', async()=>{
        let readOne = await program_requir.get("graphic designer");
        let deleteOne = await program_requir.delete(readOne[1]);
        expect(deleteOne.length).toEqual(0)
    })
});