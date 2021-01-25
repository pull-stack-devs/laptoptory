/*


'use strict';

require('dotenv').config();

const pg = require('pg');
const client = new pg.Client('postgres://localhost:5432/inventory_app');

class Laptop {
    constructor() {
        // this.id = data.id;
        // this.serial_no = data.serial_no;
        // this.cpu = data.cpu;
        // this.ram = data.ram;
        // this.storage = data.storage;
        // this.storage_type = data.storage_type;
        // this.carry_case = data.carry_case;
        // this.external_mouse = data.external_mouse;
        // this.power_cable = data.power_cable;
        // this.charger = data.charger;
        // this.display_resolution = data.display_resolution;
        // this.model = data.model;
        // this.availability = data.availability;
    }

    create(data){
        let sql = `INSERT INTO laptops (id,serial_no, brand, cpu, ram, storage,storage_type,carry_case,external_mouse,power_cable,charger,display_resolution,model,availability) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14) RETURNING *;`;
        let values = [data.id, data.serial_no, data.brand, data.cpu, data.ram,data.storage,data.storage_type,data.carry_case,data.external_mouse,data.power_cable,data.charger,data.display_resolution,data.model,data.availability];
        return [sql, values];
    }

    // Leave it till we ask Rawan
    read(data) {
        let sql=`SELECT * FROM laptops`;
        let addCat = ``;
        let values = [];
        if(data) {
            console.log("data>>>>>>", data)
            if (data.id) {
                addCat = ` WHERE id= $1`
                values.push(data.id)
            } else if(data.serial_no) {
                addCat = ` WHERE serial_no= $1`
                values.push(data.serial_no)
            } else if(data.brand) {
                addCat = ` WHERE brand = $1`
                values.push(data.brand)
            }else if(data.cpu) {
                addCat = ` WHERE cpu=$1`
                values.push(data.cpu)
            }else if (data.ram) {
                addCat = ` WHERE ram=$1`
                values.push(data.ram)
            }else if(data.storage) {
                addCat = ` WHERE storage=$1`
                values.push(data.storage)
            }else if (data.storage_type) {
                addCat = ` WHERE storage_type=$1`
                values.push(data.storage_type)
            }
            
            // console.log(addCat)
            sql = sql + `${addCat};`;
            return [sql, values];
        } else {
            return [sql, values];
        }
    }

    change(data, id) {
        let sql = `UPDATE laptops SET id=$1, serial_no=$2, brand=$3, cpu=$4, ram=$5, storage=$6, storage_type=$7, carry_case=$8, external_mouse=$9, power_cable=$10, charger=$11, display_resolution=$12, model=$13, availability=$14 WHERE id = $15`;
        let values = [data.id, data.serial_no, data.brand, data.cpu, data.ram,data.storage,data.storage_type,data.carry_case,data.external_mouse,data.power_cable,data.charger,data.display_resolution,data.model,data.availability, id];
        return [sql, values];
    }
}

module.exports = new Laptop();

*/