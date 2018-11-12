const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const colors = require('colors');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.use('/', express.static(__dirname + '../../public'));

app.use(require('./routes/index'));


mongoose.connect('mongodb://localhost:27017/agenda', { useNewUrlParser: true, useCreateIndex: true }, (err, res) => {
    if (err) {
        return console.log('Error en la conexión con la base de datos ' + err);
    }
    console.log('Base de datos ONLINE'.green);
});

const port = process.env.port || 3000;
app.listen(port, (err) => {
    if (err) {
        throw new Error(err);
    }
    console.log(`Server is runing in port ${port}`);
});