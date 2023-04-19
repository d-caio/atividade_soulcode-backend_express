const {DataTypes} = require("sequelize")
const {connection} = require("./database")
const Turma = require("./turma")

const Aluno = connection.define("aluno", {
    nome: {
        type: DataTypes.STRING,
        allowNull: false
    },

    matricula: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },

    dataNasc: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },

    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    }
})

Turma.hasMany(Aluno)
Aluno.belongsTo(Turma)

module.exports = Aluno