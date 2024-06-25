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

//traer mis eventos por id usuario
Organizer.getMyEvents = (id, result) => {
  const sql = `SELECT e.id_evento, e.nombre_evento, e.ruta_imagen, LEFT(e.fecha_hora,10) as fecha, RIGHT(e.fecha_hora, 8) as hora, e.disponibilidad, e.descripcion, o.descrip_cat, e.lugar
FROM evento e JOIN categoria_evento o ON e.id_categoria = o.id_categoria where id_usuario = ${id};`;

  db.query(sql, [id], (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
    } else {
      result(null, res);
    }
  });
};

//Petición organizar fecha ascendntemente
Organizer.fechaASC = (id, result) => {
  db.query(
    `SELECT e.id_evento, e.nombre_evento,e.ruta_imagen, LEFT(e.fecha_hora,10) as fecha, RIGHT(e.fecha_hora, 8) as hora, e.disponibilidad, e.descripcion, o.descrip_cat, e.lugar
FROM evento e JOIN categoria_evento o ON e.id_categoria = o.id_categoria where id_usuario = ${id} ORDER BY fecha_hora ASC;`,
    [id],
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
//Petición organizar fecha descendentemente
Organizer.fechaDESC = (id, result) => {
  db.query(
    `SELECT e.id_evento, e.nombre_evento,e.ruta_imagen, LEFT(e.fecha_hora,10) as fecha, RIGHT(e.fecha_hora, 8) as hora, e.disponibilidad, e.descripcion, o.descrip_cat, e.lugar
FROM evento e JOIN categoria_evento o ON e.id_categoria = o.id_categoria where id_usuario = ${id} ORDER BY fecha_hora DESC;`,
    [id],
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
//Petición organizar categoria ascendentemente
Organizer.categoriaASC = (id, result) => {
  db.query(
    `SELECT e.id_evento, e.nombre_evento,e.ruta_imagen, LEFT(e.fecha_hora,10) as fecha, RIGHT(e.fecha_hora, 8) as hora, e.disponibilidad, e.descripcion, o.descrip_cat, e.lugar
FROM evento e JOIN categoria_evento o ON e.id_categoria = o.id_categoria where id_usuario = ${id} ORDER BY e.id_categoria ASC;`,
    [id],
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

//Petición organizar categoria descendente
Organizer.categoriaDESC = (id, result) => {
  db.query(
    `SELECT e.id_evento, e.nombre_evento,e.ruta_imagen, LEFT(e.fecha_hora,10) as fecha, RIGHT(e.fecha_hora, 8) as hora, e.disponibilidad, e.descripcion, o.descrip_cat, e.lugar
FROM evento e JOIN categoria_evento o ON e.id_categoria = o.id_categoria where id_usuario = ${id} ORDER BY e.id_categoria DESC;`,
    [id],
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

//Peticion cambiar datos evento
Organizer.updateEvent = (organizer, result) => {
  const sql = `UPDATE evento SET nombre_evento = ?, descripcion = ?, fecha_hora = ?, lugar = ?, direccion = ?, id_categoria = ?, disponibilidad = ?, ruta_imagen = ?, link_compra = ? WHERE id_evento = ?`;

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
      organizer.id_evento,
    ],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
      } else {
        console.log("Evento actualizado: ", res);
        result(null, res, { message: "Evento actualizado" });
      }
    }
  );
};

//Peticion actualizar evento
Organizer.updateEvent = (organizer, result) => {
  const sql = `UPDATE evento SET nombre_evento = ?, descripcion = ?, fecha_hora = ?, lugar = ?, direccion = ?, id_categoria = ?, disponibilidad = ?, ruta_imagen = ?, link_compra = ? WHERE id_evento = ?`;

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
      organizer.id_evento,
    ],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
      } else {
        console.log("Evento actualizado: ", res);
        result(null, res, { message: "Evento actualizado" });
      }
    }
  );
};

//Peticion crear evento
Organizer.createEvent = (organizer, result) => {
  const sql = `INSERT INTO evento (nombre_evento, descripcion, fecha_hora, lugar, direccion, id_categoria, disponibilidad, ruta_imagen, link_compra, id_usuario) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?);`;

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
      organizer.id_usuario,
    ],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
      } else {
        console.log("Evento creado: ", res);
        result(null, res, { message: "Evento creado" });
      }
    }
  );
};

//Peticion actualizar evento
Organizer.updateEvent = (organizer, result) => {
  const sql = `UPDATE evento SET nombre_evento = ?, descripcion = ?, fecha_hora = ?, lugar = ?, direccion = ?, id_categoria = ?, disponibilidad = ?, link_compra = ? WHERE id_evento = ?`;

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
      organizer.link_compra,
      organizer.id_evento,
    ],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
      } else {
        console.log("Evento actualizado: ", res);
        result(null, res, { message: "Evento actualizado" });
      }
    }
  );
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
