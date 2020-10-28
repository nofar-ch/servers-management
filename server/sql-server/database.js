const express = require('express');
const mysql = require('mysql');
const queries = require('./queries');
const bodyParser = require('body-parser')
const cors = require('cors');

const app = express();
app.use(bodyParser.json())
app.use(cors());

const PORT = 4000;

//Create connection
const mydb = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'livnim14',
    database: 'managment_servers'
});

//Connect to mysql
mydb.connect(err => {
    if(err)
        throw err;
    else
        console.log('mysql connected');
});

//GET
app.get('/servers', (req, res) => {
    mydb.query(queries.getServersQuery(), (err, result) => {
    if(err)
        res.send(err)
    else
        res.json(result);
    });
});

app.get('/types', (req, res) => {
    mydb.query(queries.getTypesQuery(), (err, result) => {
    if(err)
         res.send(err)
    else
         res.json(result);
    });
});

app.get('/types/:type', (req, res) => {
    var type = req.params.type;
    mydb.query(queries.getPrice(type), (err, result) => {
    if(err)
         res.send(err)
    else
         res.json(result);
    });
});

app.get('/currency/:currency', (req, res) => {
    var currency = req.params.currency;
    mydb.query(queries.changeCurrency(currency), (err, result) => {
    if(err)
            res.send(err)
    else
            res.json(result);
    });
});

//CREATE
app.post('/addserver', (req, res) => {
    var server = req.body;

    mydb.query(queries.insertServer(server),        
    (err, result) => {
        if(err)
            res.send(err)
        else
            res.json(result);
    });
});

//DELETE 
app.delete('/deleteserver/:id', (req, res) => {
    var id = req.params.id;
    mydb.query(queries.deleteServer(id),        
    (err, result) => {
        if(err)
            res.send(err)
        else
            res.json(result);
    });
});

//UPDATE 
app.put('/switch/:id', (req, res) => {
    var toggle = req.body;
    var id = req.params.id;
    mydb.query(queries.updateIsRunning(id, toggle),        
    (err, result) => {
        if(err)
            res.send(err)
        else
            res.json(result);
    });
});

app.put('/runtime/:id', (req, res) => {
    var runTime = req.body;
    var id = req.params.id;
    mydb.query(queries.updateRunTime(id, JSON.stringify(runTime.runTime)),        
    (err, result) => {
        if(err)
            res.send(err)
        else
            res.json(result);
    });
});

app.put('/isrunningoff', (req, res) => {
    mydb.query(queries.isRunningOff(),        
    (err, result) => {
        if(err)
            res.send(err)
        else
            res.json(result);
    });
});

app.put('/price/:id', (req, res) => {
    var price = req.body;
    var id = req.params.id;
    mydb.query(queries.updatePrice(id, price.price),        
    (err, result) => {
        if(err)
            res.send(err)
        else
            res.json(result);
    });
});



app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
});