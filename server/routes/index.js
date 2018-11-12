const express = require('express');
const Usuario = require('../models/usuario');
const session = require('express-session');

const app = express();

//Manejar las sesiones de usuarios.
app.use(session({
    secret: 'seed_secret_nazgul',
    cookie: { maxAge: 72000000 },
    resave: false,
    saveUninitialized: true
}));


app.use(require('./login'));
app.use(require('./logout'));
app.use(require('./usuario'));
app.use(require('./evento'));

module.exports = app;