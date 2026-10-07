const mongoose = require("mongoose");

const clienteSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true
    },
    edad: {
        type: Number,
        required: true
    },
    ciudad: {
        type: String,
        required: true
    }
});

const Cliente = mongoose.model("Cliente", clienteSchema);

module.exports = Cliente;
