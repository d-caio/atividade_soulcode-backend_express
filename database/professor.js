const { DataTypes } = require("sequelize")
const { connection } = require("./database")

const Professor = connection.define("professor", {
    nome: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },

    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            is: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            emailSoulSchool(valor) {
                if (!valor.endsWith("@soulschool.com")) {
                    throw new Error("O e-mail precisa ser do domínio soulschool.")
                }
            }
        }
    }
})

module.exports = Professor