const {Router} = require("express")
const {Op} = require("sequelize")
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

router.get("/alunos", async (req, res) => {
    try {
        const alunos = await Aluno.findAll()
        res.json(alunos)
    } catch (erro) {
        res.status(500).json({message: "Aconteceu um erro."})
    }
})

router.get("/alunos/:id", async (req, res) => {
    const {id} = req.params

    try {
        const aluno = await Aluno.findByPk(id)
        aluno ? res.json(aluno) : res.status(404).json({message: "Aluno não encontrado."})
    } catch (erro) {
        res.status(500).json({message: "Um erro aconteceu."})
    }
})

router.get("/alunos/procurar/:nome", async (req, res) => {
    try {
        const alunos = await Aluno.findAll({
            where: {
                nome: {
                    [Op.like]: `%${req.params.nome}%`
                },
            },
        })
    res.json(alunos)
    } catch (erro) {
        res.status(500).json({ message: "Um erro aconteceu." })
    }
})

router.put("/alunos/:id", async (req, res) => {
    const {id} = req.params
    const {nome, matricula, dataNasc, email, turmaId} = req.body

    try {
        const aluno = await Aluno.findByPk(id)
        if (aluno) {
            const alunoAtualizado = await aluno.update({nome, matricula, dataNasc, email, turmaId})
            res.json(alunoAtualizado)
        } else {
            res.status(404).json({message: "Aluno não encontrado."})
        }
    } catch (erro) {
        res.status(500).json({message: "Um erro aconteceu."})
    }
})

router.delete("/alunos/:id", async (req, res) => {
    const {id} = req.params

    try {
        const aluno = await Aluno.findByPk(id)
        if (aluno) {
            await aluno.destroy()
            res.json({message: "Aluno excluído com sucesso."})
        } else {
            res.status(404).json({message: "Aluno não encontrado."})
        }
    } catch (erro) {
        res.status(500).json({message: "Um erro aconteceu."})
    }
})

module.exports = router