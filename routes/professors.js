const {Router} = require("express")
const {Op} = require("sequelize")
const Professor = require("../database/professor")
const Turma = require("../database/turma")

const router = Router()

router.post("/professors", async (req, res) => {
    const {nome, email, turmaId} = req.body

    try {
        const turma = await Turma.findByPk(turmaId)
        if (turma) {
            const professores = await Professor.findAll()
            const professorComMesmaTurma = professores.find(prof => prof.turmaId === turmaId)
            if (professorComMesmaTurma) {
                res.status(400).json({ message: "Essa turma já está sendo utilizada por outro professor." })
            } else {
                const professor = await Professor.create({nome, email, turmaId})
                res.json(professor)
            }
        } else {
            res.status(400).json({message: "Turma não encontrada."})
        }
    } catch (erro) {
        res.status(500).json({message: "Um erro aconteceu."})
    }
})

router.get("/professors", async (req, res) => {
    try {
        const professores = await Professor.findAll()
        res.json(professores)
    } catch (erro) {
        res.status(500).json({message: "Um erro aconteceu."})
    }
})

router.get("/professors/:id", async (req, res) => {
    const {id} = req.params

    try {
        const professor = await Professor.findByPk(id)
        professor ? res.json(professor) : res.json({message: "Professor não encontrado."})
    } catch (erro) {
        res.status(500).json({message: "Um erro aconteceu."})
    }
})

router.get("/professors/procurar/:nome", async (req, res) => {
    try {
        const professor = await Professor.findAll({
            where: {
                nome: {
                    [Op.like]: `%${req.params.nome}%`
                },
            },
        })
    res.json(professor)
    } catch (erro) {
        res.status(500).json({ message: "Um erro aconteceu." })
    }
})

router.put("/professors/:id", async (req, res) => {
    const {id} = req.params
    const {nome, email, turmaId} = req.body

    try {
        const professor = await Professor.findByPk(id)
        if (professor) {
            const professores = await Professor.findAll({ where: { turmaId } })
            const professorComMesmaTurma = professores.find(prof => prof.id !== professor.id)
            if (professorComMesmaTurma) {
                res.status(400).json({ message: "Essa turma já está sendo utilizada por outro professor." })
            } else {
                const professorAtualizado = await professor.update({nome, email, turmaId})
                res.json(professorAtualizado)
            }
        } else {
            res.status(404).json({message: "Professor não encontrado."})
        }
    } catch (erro) {
        res.status(500).json({message: "Erro ao buscar/atualizar professor."})
    }
})

router.delete("/professors/:id", async (req, res) => {
    const {id} = req.params

    try {
        const professor = await Professor.findByPk(id)
        if (professor) {
            await professor.destroy()
            res.json({message: "Professor excluído com sucesso."})
        } else {
            res.status(404).json({message: "Professor não encontrado."})
        }
    } catch (erro) {
        res.status(500).json({message: "Aconteceu um erro."})
    }
})

module.exports = router