const mongoose = require('mongoose');

const clientesSchema = new mongoose.Schema({
    nome: { type: String },
    email: { type: String },
    cpf: { type: String, required: true },
    dataNascimento: { type: String },
    estadoCivil: { type: String },
    telefone: { type: String },
    comprou: { type: Boolean }
}, {
    versionKey: false
})

const clientes = mongoose.model('clientes', clientesSchema)

module.exports = clientes

