const {DataTypes} = require("sequelize")
const {connection} = require("./database")
const Professor = require("./professor")

const Turma = connection.define("turma", {
    nome: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    }
})

Turma.hasOne(Professor)
Professor.belongsTo(Turma)

module.exports = Turma