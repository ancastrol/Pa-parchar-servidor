const db = require("../config/config");
const organizer = {};

organizer.getAll = (result) => {
  const sql = `SELECT * FROM usuario`;

  db.query(sql, [], (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
    } else {
      result(null, res);
    }
  });
};

// organizer.eventASC = (result) => {
// const sql = `SELECT nombre_evento, fecha_hora, descripcion, id_categoria, disponibilidad FROM evento WHERE id_usuario = ${id} ORDER BY fecha_hora ASC;`;

// db.query(sql, [], (err, res) => {
//   if (err) {
// console.log("error: ", err);
// result(err, null);
//   } else {
// result(null, res);
//   }
// });
//   };

organizer.eventASC = (id, result) => {
  db.query(
    `SELECT nombre_evento, fecha_hora, descripcion, id_categoria, disponibilidad FROM evento WHERE id_usuario = ${id} ORDER BY fecha_hora ASC;`,
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
      } else {
        result(null, res);
      }
    }
  );
};

//Peticion elimiar/desactivar evento
organizer.desactiveEvent = (id, result) => {
  db.query(`DELETE FROM evento WHERE id_evento = ${id}`, (err, res) => {
    if (err) {
      result(err, null);
    } else {
      result(null, res);
    }
  });
};

module.exports = organizer;
