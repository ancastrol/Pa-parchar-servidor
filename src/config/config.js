const mysql = require("mysql");
const db = mysql.createConnection({
  host: "localhost", //URL del servidor
  user: "root", //El nombre del dueño de la BD
  password: "", //La contraseña del dueño
  database: "nodejs_base1", //El nombre dado a la BD
});
db.connect(function (err) {
  if (err) throw err;
  console.log("Base de datos conectada");
});
module.exports = db;
