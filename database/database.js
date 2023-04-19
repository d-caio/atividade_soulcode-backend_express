const { Sequelize } = require("sequelize")

const connection = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        dialect: "mysql"
    }
)

async function authenticate(conexao) {
    try {
        await conexao.authenticate()
        console.log("Conexão estabelecida com sucesso")
    } catch (erro) {
        console.log("Um erro aconteceu. ", erro)
    }
}

module.exports = {
    connection,
    authenticate
}