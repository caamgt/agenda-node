const express = require('express');
const Evento = require('../models/evento');

const app = express();

app.get('/events/all', function(req, res) {
    req.session.reload(function(err) {
        //Control de sesión
        if (err) {
            res.send('logout');
            res.end();
        } else {
            sesionDeUsuario = req.session.id_usuario;
            Evento.find({ id_usuario: sesionDeUsuario }, (err, eventos) => {
                if (err) {
                    return res.status(500).send({ message: 'Error al intentar obtener los eventos.' });
                } else {
                    if (!eventos) {
                        return res.status(404).send({ message: 'No exiten eventos en la base de datos.' });
                    } else {
                        res.json(eventos);
                    }
                }
            })
        }
    })
})

app.post('/events/new', function(req, res) {
    req.session.reload(function(err) {
        //Control de sesión
        if (err) {
            res.send('logout');
            res.end();
        } else {
            let nuevoEvento = new Evento()
            nuevoEvento.id_usuario = req.session.id_usuario
            nuevoEvento.title = req.body.title
            nuevoEvento.start = req.body.start
            nuevoEvento.end = req.body.end
            nuevoEvento.save((err) => {
                if (err && err.code != 11000) {
                    return res.status(500).send({ message: 'Error al intentar insertar el un nuevo evento.' });
                } else if (err && err.code == 11000) {
                    return res.status(200).send({ message: 'Error al intentar insertar el evento.' + err.code + ')' });
                } else {
                    return res.status(200).send({ message: 'El evento ha sido agregado correctamente' });
                }
            })
        }
    })
});

app.post('/events/update_evento', function(req, res) {
    req.session.reload(function(err) {
        //Control de sesión
        if (err) {
            res.send('logout');
            res.end();
        } else {
            let eventoID = req.query._id;
            Evento.findById(eventoID, (err, evento) => {
                if (err) {
                    return res.status(500).send({ message: 'Error al intentar hallar el evento.' });
                } else {
                    let start = req.body.start,
                        end = req.body.end
                    Evento.update({ _id: eventoID }, {
                        start: start,
                        end: end
                    }, (err) => {
                        if (err) {
                            return res.status(500).send({ message: 'Error al intentar actualizar el evento.' });
                        } else {
                            res.send('El evento ha sido actualizado correctamente');
                        }
                    })
                }
            })
        }
    });
});

app.post('/events/delete', function(req, res) {
    req.session.reload(function(err) {
        if (err) {
            res.send('logout')
            res.end()
        } else {
            let eventoID = req.query._id;
            Evento.findById(eventoID, (err, evento) => {
                if (err) {
                    return res.status(500).send({ message: 'Error al intentar hallar el evento.' })
                } else {
                    evento.remove(err => {
                        if (err) {
                            return res.status(500).send({ message: 'Error al intentar borrar el evento.' })
                        } else {
                            res.send('El evento ha sido borrado correctamente')
                        }
                    })
                }
            })
        }
    });
});


app.all('/', function(req, res) {
    return res.send({ message: 'Error al intentar mostrar el recurso solicitado.' }).end()
});

module.exports = app;