const express = require('express');
const Usuario = require('../models/usuario');

const app = express();

app.post('/login', function(req, res) {
    const { email, password } = req.body;
    let inSesion = req.session;
    Usuario.find({ email }, function(err, usuarioDB) {
        if (err) {
            return res.status(500).send({ message: 'Error al intentar obtener el usuario' });
        } else {
            if (usuarioDB.length == 1) {
                Usuario.find({ email, password }, function(err, usuarioDbPassword) {
                    if (err) {
                        return res.status(500).send({ message: 'Error al intentar obtener el usuario' });
                    } else {
                        if (usuarioDbPassword.length == 1) {
                            inSesion = usuarioDbPassword[0]["email"];
                            inSesion.id_usuario = usuarioDbPassword[0]["_id"];
                            res.send('Validado');
                        } else {
                            res.send("Usuario o contraseña incorrectos");
                        }
                    }
                })
            } else {
                res.send("Usuario no registrado")
            }
        }
    });
});

app.post('/logout', function(req, res) {
    req.session.destroy(function(err) {
        if (err) {
            return res.status(500).send({ message: 'Error al intentar cerrar la sesión. (status:500)' })
        } else {
            req.session = null
            res.send('logout')
            res.end()
        }
    })
});

app.all('/', function(req, res) {
    return res.send({ message: 'Error al intentar mostrar el recurso solicitado.' }).end()
});

module.exports = app;