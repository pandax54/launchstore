// para evitar ter que enviar login e senha toda vez que envia uma query
// pg_ctl -D /usr/local/var/postgres start
const { Pool } = require("pg")


module.exports = new Pool({
    user: "fernandapenna",
    password: "",
    host: "localhost",
    port: 5432,
    database: "launchstoredb2"

})