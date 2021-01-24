'use strict';

const express = require('express');

const app = express();
const superagent = require('superagent');
const pg = require('pg');
// const methodOverride = require('method-override');

// App setup
require('dotenv').config();
const PORT = process.env.PORT;
// app.use(cors());
// app.use(express.urlencoded({ extended: true }));
app.use(express.json())
// app.use(methodOverride('_method'));
// app.use(express.static('./public'));
// app.set('view engine', 'ejs');
const client = new pg.Client(process.env.DATABASE_URL);
const Laptop = require('./crud_data/laptop-model');

app.post('/laptop', async(req, res)=>{
    let data = req.body;
    // console.log(data)
    let arr = await Laptop.create(data);
    client.query(arr[0], arr[1])
    .then(result =>{
        res.status(200).json(result)
    }).catch(err=>{ console.error(err); })
    
})

app.post('/searchLaptop', async(req, res)=>{
    let data = req.body;
    let result = await Laptop.read(data);
    client.query(result[0], result[1])
    .then(data=>{
        res.status(200).json(data.rows)
    })
    .catch(err=>{ console.error(err) })

})

app.put('/changeLaptop/:id', async(req, res)=>{
    let id = req.params.id;
    let data = req.body;
    let result = await Laptop.change(data, id);
    client.query(result[0], result[1])
    .then(data=>{
        res.status(200).json(data.rows)
    })
    .catch(err=>{ console.error(err) })
})


client.connect()
.then(()=>{
    app.listen(PORT, ()=>{
        console.log(`Listening to port`)
    })
})