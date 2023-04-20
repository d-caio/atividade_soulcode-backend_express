const {DataTypes} = require("sequelize")
const {connection} = require("./database")
const Turma = require("./turma")

const Aluno = connection.define("aluno", {
    nome: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },

    matricula: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            len: [7]
        }
    },

    dataNasc: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },

    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true
        }
    }
})

Turma.hasMany(Aluno)
Aluno.belongsTo(Turma)

module.exports = Aluno