const { Pool } = require("pg")

const pool = new Pool({
    user: "postgres",
    password: "Z7h1z;9ph",
    host: "localhost",
    port: 5432,
    database: "perncommerce"
})

module.exports = {
    query: (text, params) => pool.query(text, params)
}