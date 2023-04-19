const { DataTypes } = require("sequelize")
const { connection } = require("./database")

const Professor = connection.define("professor", {
    nome: {
        type: DataTypes.STRING,
        allowNull: false
    },

    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    }
})

module.exports = Professor