const express = require('express');
const Usuario = require('../models/usuario');

const app = express();

app.get('/buscar_usuario', (req, res) => {
    let usuarioId = req.query._id || '';
    Usuario.findById(usuarioId, (err, usuarios) => {
        console.log(usuarios);
        if (err) {
            return res.status(500).send('Error al obtener los usuarios');
        } else {
            if (!usuarios) {
                return res.status(404).send('Usuario no encontrado');
            } else {
                res.json(usuarios);
            }
        }
    });
});

app.post('/usuario', (req, res) => {
    const { nombre, email, password, role } = req.body;

    let usuario = new Usuario({
        nombre,
        email,
        password,
        role
    });

    usuario.save((err, usuarioDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        res.json({
            ok: true,
            usuario: usuarioDB
        });
    });
});

app.get('/crearUsuario', function(req, res) {
    Usuario.find({}, (err, usuarios) => {
        if (err) {
            return res.status(500).send({ message: 'Error al tratar obtener los usuarios.' });
        } else {
            if (usuarios.length <= 0) {
                //Crear un nuevo usuario. 
                let nuevoUsuario = new Usuario()
                nuevoUsuario.nombre = 'Carlos Alfaro'
                nuevoUsuario.email = 'calfaro@gmail.com'
                nuevoUsuario.password = '123456'
                nuevoUsuario.save((err, usuario1) => {
                    if (err) return res.status(500).send({ message: 'Error al crear el usuario' });
                })
            } else {
                return res.json(usuarios);
            }
        }
    });
});

app.all('/', function(req, res) {
    return res.send({ message: 'Error al intentar mostrar el recurso solicitado.' }).end()
})

module.exports = app;