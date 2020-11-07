const clientes = require('../models/clientes')

const getAll = (req, res) => {
  clientes.find(function (err, clientes) {
    if (err) {
      res.status(500).send({ message: err.message })
    } else {
      res.status(200).send(clientes)
    }
  })
}

const getCompradores = (req, res) => {

  //Primeira maneira utilizando filter do javascript
  clientes.find({ comprou: true }, function (err, clientes) {

    if (err) {
      res.status(500).send({ message: err.message })
    } else {
      const clientesFiltados = clientes.map(cliente => {
        return {
          nome: cliente.nome,
          email: cliente.email
        }
      })

      res.status(200).send(clientesFiltados);
    }
  })

  //Segunda maneira utilizando projections
  // clientes.find({ comprou: true }, 'nome email', function (err, clientes) {
  //   if (err) {
  //     res.status(500).send({ message: err.message })
  //   } else {
  //     res.status(200).send(clientes);
  //   }
  // })

  //Terceira maneira utilizando projections v2
  // clientes.find({ comprou: true }, { nome: 1, email: 1, _id: 0 }, function (err, clientes) {
  //   if (err) {
  //     res.status(500).send({ message: err.message })
  //   } else {
  //     res.status(200).send(clientes);
  //   }
  // })
}

const getByCpf = (req, res) => {
  const cpf = req.params.cpf

  clientes.find({ cpf }, function (err, clientes) {
    if (err) {
      res.status(500).send({ message: err.message })
    } else {
      res.status(200).send(clientes);
    }
  })
}

const postCliente = (req, res) => {

  let cliente = new clientes(req.body)
  cliente.save(function (err) {

    if (err) {
      res.status(500).send({ message: err.message })
    } else {
      res.status(201).send({
        message: "Cliente incluido com sucesso",
        status: "true"
      })
    }
  })
}

module.exports = {
  getAll,
  getCompradores,
  getByCpf,
  postCliente
}
