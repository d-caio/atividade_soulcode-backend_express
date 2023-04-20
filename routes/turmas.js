const { Router } = require("express")
const {Op} = require("sequelize")
const Turma = require("../database/turma")
const Professor = require("../database/professor")

const router = Router()

router.post("/turmas", async (req, res) => {
    const { nome } = req.body

    try {
        const turma = await Turma.create({ nome })
        res.status(201).json(turma)
    } catch (erro) {
        res.status(500).json({ message: "Aconteceu um erro." })
    }
})

router.get("/turmas", async (req, res) => {
    try {
        const turma = await Turma.findAll({ include: [Professor] })
        res.status(201).json(turma)
    } catch (erro) {
        res.status(500).json({ message: "Um erro aconteceu." })
    }
})

router.get("/turmas/:id", async (req, res) => {
    try {
        const turma = await Turma.findByPk(req.params.id, { include: [Professor] })
        turma ? res.json(turma) : res.status(404).json({ message: "Turma não encontrada" })
    } catch (erro) {
        res.status(500).json({ message: "Um erro aconteceu." })
    }
})

router.get("/turmas/procurar/:nome", async (req, res) => {
    try {
        const turmas = await Turma.findAll({
            where: {
                nome: {
                    [Op.like]: `%${req.params.nome}%`
                }
            },
            include: [Professor]
        })
    res.json(turmas)
    } catch (erro) {
        res.status(500).json({ message: "Um erro aconteceu." })
    }
})

router.put("/turmas/:id", async (req, res) => {
    const { id } = req.params
    const { nome } = req.body

    try {
        const turma = await Turma.findByPk(id)
        if (turma) {
            const turmaAtualizada = await turma.update({ nome })
            res.json(turmaAtualizada)
        } else {
            res.status(404).json({ message: "Turma não encontrada." })
        }
    } catch (erro) {
        res.status(500).json({ message: "Aconteceu um erro." })
    }
})

router.delete("/turmas/:id", async (req, res) => {
    const { id } = req.params

    try {
        const turma = await Turma.findByPk(id)
        if (turma) {
                await turma.destroy()
                res.json({ message: "Turma destruída com sucesso." })       
        } else {
            res.status(404).json({ message: "Turma não encontrada." })
        }
    } catch (erro) {
        res.status(500).json({ message: "Aconteceu um erro." })
    }
})
module.exports = router