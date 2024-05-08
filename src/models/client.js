const db = require("../config/config");
const Client = {};

//Peticion eventos por dia calendario segun estado
Client.calendarState = (id, date1, date2, result) => {
  let sql = `SELECT nombre_evento, DATE(fecha_hora) fecha, lugar FROM evento WHERE `;
  let parametros = [];
  let ya = false;

  if (date1 && date2) {
    console.log(1);
    ya = true;
    sql = sql + "fecha_hora BETWEEN ? AND ? ";
    parametros.push(date1);
    parametros.push(date2);
  } else if (date1) {
    console.log(2);
    ya = true;
    sql = sql + "fecha_hora >= ? ";
    parametros.push(date1);
  } else if (date2) {
    console.log(3);
    ya = true;
    sql = sql + "fecha_hora <= ? ";
    parametros.push(date2);
  }

  sql = sql + " AND id_evento IN (SELECT id_evento FROM evento_interes WHERE (id_estado = 2 OR id_estado = 3) AND id_usuario = ?)";
  parametros.push(id);

  console.log(sql);

  db.query(sql, [], (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
    } else {
      result(null, res);
    }
  });
};

module.exports = Client;
