const db = require("../config/config");
const Organizer = {};

Organizer.getAll = (result) => {
  const sql = `SELECT * FROM evento`;

  db.query(sql, [], (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
    } else {
      result(null, res);
    }
  });
};

// Organizer.eventASC = (result) => {
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
//Petición organizar por fecha ascendntemente
Organizer.fechaASC = (id, result) => {
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
//Petición organizar por fecha descendentemente
Organizer.fechaDESC = (id, result) => {
  db.query(
    `SELECT nombre_evento, fecha_hora, descripcion, id_categoria, disponibilidad FROM evento WHERE id_usuario = ${id} ORDER BY fecha_hora DESC;`,
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
//Petición organizar por categoria ascendentemente
Organizer.categoriaASC = (id, result) => {
  db.query(
    `SELECT nombre_evento, fecha_hora, descripcion, id_categoria, disponibilidad FROM evento WHERE id_usuario = ${id} ORDER BY id_categoria ASC;`,
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

//Petición organizar por categoria descendente
Organizer.categoriaDESC = (id, result) => {
  db.query(
    `SELECT nombre_evento, fecha_hora, descripcion, id_categoria, disponibilidad FROM evento WHERE id_usuario = ${id} ORDER BY id_categoria DESC;`,
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

// //Cambiar datos evento
Organizer.updateEvent = (organizer,  result) => {
  const sql= `UPDATE evento SET nombre_evento = ?, descripcion = ?, fecha_hora = ?, lugar = ?, direccion = ?, id_categoria = ?, disponibilidad = ?, ruta_imagen = ?, link_compra = ? WHERE id_evento = ?`;

  db.query(
    sql, 
    [
      organizer.nombre_evento,
      organizer.descripcion,
      organizer.fecha_hora,
      organizer.lugar,
      organizer.direccion,
      organizer.id_categoria,
      organizer.disponibilidad,
      organizer.ruta_imagen,
      organizer.link_compra,
      organizer.id_evento
    ],
    (err,res) =>{
      if(err){
        console.log('error: ', err);
        result(err,null);
      }
      else{
        console.log('Evento actualizado: ', res);
        result(null, res, {message: 'Evento actualizado'});
      }
    }
  )
};

Organizer.createEvent = (organizer,  result) => {
  const sql= `INSERT INTO evento (nombre_evento, descripcion, fecha_hora, lugar, direccion, id_categoria, disponibilidad, ruta_imagen, link_compra, id_usuario) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?);`;

  db.query(
    sql, 
    [
      organizer.nombre_evento,
      organizer.descripcion,
      organizer.fecha_hora,
      organizer.lugar,
      organizer.direccion,
      organizer.id_categoria,
      organizer.disponibilidad,
      organizer.ruta_imagen,
      organizer.link_compra,
      organizer.id_usuario
    ],
    (err,res) =>{
      if(err){
        console.log('error: ', err);
        result(err,null);
      }
      else{
        console.log('Evento creado: ', res);
        result(null, res, {message: 'Evento creado'});
      }
    }
  )
};

//Peticion elimiar/desactivar evento
Organizer.desactiveEvent = (id, result) => {
  db.query(`DELETE FROM evento WHERE id_evento = ${id}`, (err, res) => {
    if (err) {
      result(err, null);
    } else {
      result(null, res);
    }
  });
};

module.exports = Organizer;
