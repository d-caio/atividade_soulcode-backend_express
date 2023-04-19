const {DataTypes} = require("sequelize")
const {connection} = require("./database")

const Turma = connection.define("turma", {
    nome: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    }
})

module.exports = Turma