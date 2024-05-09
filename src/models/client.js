const db = require("../config/config");
const Client = {};

// Client.calendarState = (id, date1, date2, result) => {
//   let sql = `SELECT nombre_evento, DATE(fecha_hora) fecha, lugar FROM evento WHERE `;
//   let parametros = [];
//   let ya = false;

//   if (date1 && date2) {
//     console.log(1);
//     ya = true;
//     sql = sql + "fecha_hora BETWEEN ? AND ? ";
//     parametros.push(date1);
//     parametros.push(date2);
//   }
//   // } else if (date1) {
//   //   console.log(2);
//   //   ya = true;
//   //   sql = sql + "fecha_hora >= ? ";
//   //   parametros.push(date1);
//   // } else if (date2) {
//   //   console.log(3);
//   //   ya = true;
//   //   sql = sql + "fecha_hora <= ? ";
//   //   parametros.push(date2);
//   // }
//   else {
//     if (date1) {
//       console.log(2);
//       ya = true;
//       sql += "fecha_hora >= ? ";
//       parametros.push(date1);
//     }
//     if (date2) {
//       console.log(3);
//       if (ya) sql += "AND "; // Solo añadir AND si ya hay condiciones
//       sql += "fecha_hora <= ? ";
//       parametros.push(date2);
//     }
//   }

//   sql +=
//     "AND id_evento IN (SELECT id_evento FROM evento_interes WHERE (id_estado = 2 OR id_estado = 3) AND id_usuario = ?)";
//   parametros.push(id);

//   console.log(sql);

//   db.query(sql, [], (err, res) => {
//     if (err) {
//       console.log("error: ", err);
//       result(err, null);
//     } else {
//       result(null, res);
//     }
//   });
// };


//Peticion eventos por dia calendario segun estado
Client.calendarState = (id, date1, date2, result) => {
  let sql = `SELECT nombre_evento, DATE(fecha_hora) fecha, lugar FROM evento WHERE `;
  let parametros = [];
  let ya = false; //Variable que controla el flujo de las condicionales

  if (date1 && date2) {
    console.log(1);
    ya = true;
    sql += "fecha_hora BETWEEN ? AND ? ";
    parametros.push(date1);
    parametros.push(date2);
  } else {
    if (date1) {
      console.log(2);
      ya = true;
      sql += "fecha_hora >= ? ";
      parametros.push(date1);
    }
    if (date2) {
      console.log(3);
      if (ya) sql += "AND "; // Solo añadir AND si ya hay condiciones
      sql += "fecha_hora <= ? ";
      parametros.push(date2);
    }
  }

  sql += "AND id_evento IN (SELECT id_evento FROM evento_interes WHERE (id_estado = 2 OR id_estado = 3) AND id_usuario = ?)";
  parametros.push(id);

  console.log(sql);

  db.query(sql, parametros, (err, res) => {
    if (err) {
      console.log("error: ", err);
      return result(err, null); // Utiliza return para salir de la función después de llamar a result() con el error
    }
    
    result(null, res); // Llama a result() solo una vez en el caso de éxito
  });
}

module.exports = Client;
