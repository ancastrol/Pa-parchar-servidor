const db = require("../config/config");
const User = {};


User.register = (user, result) => {
  const sql = `SELECT COUNT(*) AS datos_existentes FROM usuario WHERE correo = ?`;
  db.query(
    sql, [user.correo], (err, res) => {
      if (err) {
        console.log('error: ', err);
        result(err, null);
      }
      else {
        console.log('Datos existentes: ', err);
        if (res[0].datos_existentes > 0) {
          result(null, { message: 'Correo ya registrado' });
        }
        else {
          const sql = `INSERT INTO usuario (nombre, rol, correo, contrasenia) VALUES (?, ?, ?, ?)`;
          db.query(
            sql,
            [user.nombre, user.rol, user.correo, user.contrasenia],
            (err, res) => {
              if (err) {
                console.log('err: ', err);
                result(err, null);
              }
              else {
                console.log('Id del nuevo usuario: ', res.insertId);
                result(null, res.insertId, { message: 'Usuario creado' });
              }
            }
          )
        }
      }
    }
  )
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

User.searchEventById = (result) => {
  db.query(`SELECT * FROM evento WHERE nombre_evento LIKE '%?%' OR DATE_FORMAT(fecha_hora, '%Y-%m-%d %H:%i:%s') LIKE '%?%' OR id_categoria IN  (select id_categoria FROM categoria_evento where descrip_cat LIKE '%?%') OR lugar LIKE '%?%'`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
    } 
    else{
      result(null, res);
    }
  });
};

module.exports = User;