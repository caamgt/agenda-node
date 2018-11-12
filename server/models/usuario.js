const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

let Schema = mongoose.Schema;

let usuarioSchema = new Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es necesario']
    },
    email: {
        type: String,
        unique: true,
        lowercase: true,
        required: [true, 'El correo es necesario']
    },
    password: {
        type: String,
        lowercase: true,
        required: [true, 'La contraseña es obligatoria']
    },
    role: {
        type: String,
        default: 'USER_ROLE'
    }
});



usuarioSchema.plugin(uniqueValidator, { message: '{PATH} debe de ser unico' });


module.exports = mongoose.model('Usuario', usuarioSchema);