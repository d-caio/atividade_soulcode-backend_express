const {Router} = require("express")
const Aluno = require("../database/aluno")
const Turma = require("../database/turma")

const router = Router()

router.post("/alunos", async (req, res) => {
    const {nome, matricula, dataNasc, email, turmaId} = req.body

    try {
        const turma = await Turma.findByPk(turmaId)
        if (turma) {
            const aluno = await Aluno.create({nome, matricula, dataNasc, email, turmaId})
            res.status(201).json(aluno)
        } else {
            res.status(404).json({message: "Turma não encontrada."})
        }
    } catch (erro) {
        console.log(erro)
        res.status(500).json("Aconteceu um erro.")
    }
})

module.exports = router