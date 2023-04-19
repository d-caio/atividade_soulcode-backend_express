const {Router} = require("express")
const Professor = require("../database/professor")
const Turma = require("../database/turma")

const router = Router()

router.post("/professors", async (req, res) => {
    const {nome, email, turmaId} = req.body

    try {
        const turma = await Turma.findByPk(turmaId)
        if (turma) {
            try {
                const professor = await Professor.create({nome, email, turmaId})
                res.status(201).json(professor)
            } catch (erro) {
                res.status(500).json({message: "Aconteceu um erro ao criar professor."})
            }
        } else {
            res.status(400).json({message: "Informações inválidas."})
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

// Fazer uma busca de turmaId para não poder ficar dois professores com a mesma turmaId. Usar filter OU {where: turmaId}
router.put("/professors/:id", async (req, res) => {
    const {id} = req.params
    const {nome, email, turmaId} = req.body

    try {
        const professor = await Professor.findByPk(id)
        if (professor) {
            try {
                const professorAtualizado = await professor.update({nome, email, turmaId})
                res.json(professorAtualizado)
            } catch (erro) {
                res.status(500).json({message: "Erro ao atualizar dados."})
            }
        } else {
            res.status(404).json({message: "Professor não encontrado."})
        }
    } catch (erro) {
        res.status(500).json({message: "Erro ao buscar professor."})
    }
})

module.exports = router