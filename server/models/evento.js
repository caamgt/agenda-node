const mongoose = require('mongoose');

let Schema = mongoose.Schema;

let eventoSchema = new Schema({
    title: {
        type: String,
        required: [true, "El titulo del evento es necesario"]
    },
    start: {
        type: String,
        required: [true, "La fecha de inicio es necesaria"]
    },
    end: {
        type: String,
        required: false
    },
    id_usuario: {
        type: Schema.ObjectId,
        ref: 'Usuario',
        required: false
    }
});


module.exports = mongoose.model('Evento', eventoSchema);