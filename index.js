require("dotenv").config()
const express = require("express")
const morgan = require("morgan")

const { connection, authenticate } = require("./database/database")
authenticate(connection)

const rotaTurmas = require("./routes/turmas")
const rotaAlunos = require("./routes/alunos")
const rotaProfessors = require("./routes/professors")

const app = express()
app.use(express.json())
app.use(morgan("dev"))
app.use(rotaTurmas)
app.use(rotaAlunos)
app.use(rotaProfessors)

app.listen(3000, () => {
    connection.sync({force: true})
    console.log("Conexão rodando em http://localhost:3000")
})