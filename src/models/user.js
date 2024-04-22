const db = require("../config/config");
const User = {};
User.create = (user, result) => {
  const sql = `
                INSERT INTO users(
                email,
                name,
                lastname,
                phone,
                image,
                password,
                created_at,
                updated_at
                )
                VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
  db.query(
    sql,
    [
      user.email,
      user.name,
      user.lastname,
      user.phone,
      user.image,
      user.password,
      new Date(),
      new Date(),
    ],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
      } else {
        console.log("Id del nuevo Usuario: ", res.insertId);
        result(null, res.insertId);
      }
    }
  );
};

User.getAll = (result) => {
  const sql = `SELECT * FROM usuarios`;

  db.query(sql, [], (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
    } else {
      result(null, res);
    }
  });
};
User.getById = (id, result) => {
  db.query(`SELECT * FROM usuario WHERE id_usuario = ${id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
    } else {
      result(null, res);
    }
  });
};

//peticion para ingresar pagina principal

User.mainPage = (result) => {
  const sql = `SELECT ruta_imagen, LEFT(nombre_evento,10), LEFT(descripcion, 25), LEFT(fecha_hora, 10) FROM evento where id_evento in (SELECT id_evento FROM evento_interes WHERE id_estado !=4 AND id_estado != 1 )`;

  db.query(sql, [], (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
    } else {
      result(null, res);
    }
  });
};

//peticion para ingresar pagina principal segun su id de usuario

User.mainPagebyId = (id, result) => {
  db.query(
    `SELECT ruta_imagen, LEFT(nombre_evento,10), LEFT(descripcion, 25), LEFT(fecha_hora, 10) FROM evento where id_evento in (SELECT id_evento FROM evento_interes WHERE id_estado !=4 AND id_estado != 1 AND id_usuario = ${id})`,
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

//Peticion ver detalles de evento

User.showEvent = (result) => {
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

//Peticion Crear cuenta



//Peticion buscar evento por id

User.searchEventById = (id, result) => {
  db.query(`SELECT * FROM evento WHERE id_evento = ${id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
    } else {
      result(null, res);
    }
  });
};

module.exports = User;
