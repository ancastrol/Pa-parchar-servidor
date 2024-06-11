const db = require("../config/config");
const User = {};

User.register = (user, result) => {
  const sql = `SELECT COUNT(*) AS datos_existentes FROM usuario WHERE correo = ?`;
  db.query(sql, [user.correo], (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
    } 
    else {
      console.log("res: ", res[0]);
      if (res[0].datos_existentes > 0) {
        result(null, { message: "Correo ya registrado" });
        console.log("si esta entrando");
      } 
      else {
        const sql = `INSERT INTO usuario (nombre, correo, contrasenia) VALUES (?, ?, ?)`;
        db.query(
          sql,
          [user.nombre, user.correo, user.contrasenia],
          (err, res) => {
            if (err) {
              console.log("err: ", err);
              result(err, null);
            } else {
              console.log("Id del nuevo usuario: ", res.insertId);
              result(null, res.insertId, { message: "Usuario creado" });
            }
          }
        );
      }
    }
  });
};

//Peticion Login
User.searchLogin = (user, result) => {
  const sql = `SELECT * FROM usuario WHERE correo = ? AND contrasenia = ?`;
  db.query(
    sql,
    [user.correo, user.contrasenia],
    (err, res) => {
      if (err) {
        result(err, null);
      } else {
        result(null, res);
      }
    }
  );
};

//Peticion obtener usuarios
User.getAll = (result) => {
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

//Peticion obtener usuarios segun id
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


User.getProfile = (id, result) => {
  db.query(`SELECT * FROM usuario WHERE id_usuario = ${id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
    } else {
      result(null, res);
    }
  });
};

//Peticion para ingresar eventos al carrousel
User.eventsCarrousel = (result) => {
  const sql = `SELECT id_evento, nombre_evento, left(descripcion,800) as descripcion, left(fecha_hora, 19) AS fecha_hora, ruta_imagen FROM evento WHERE fecha_hora > curdate() ORDER by fecha_hora ASC LIMIT 3`;

  db.query(sql, [], (err, res) => {
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
  const sql = `SELECT id_evento, ruta_imagen, nombre_evento, CONCAT(LEFT(descripcion, 60), '...') AS descripcion, LEFT(fecha_hora, 10) AS fecha_hora 
  FROM evento WHERE fecha_hora > curdate() ORDER BY fecha_hora asc LIMIT 10 OFFSET 3;`;

  db.query(sql, [], (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
    } else {
      result(null, res);
    }
  });
};

// Mostrar eventos en ver mas eventos, para una maximo de 100 eventos

User.moreEventsPage = (result) => {
  const sql = `SELECT id_evento, ruta_imagen, nombre_evento, CONCAT(LEFT(descripcion, 60), '...') AS descripcion, LEFT(fecha_hora, 10) as fecha_hora FROM evento WHERE fecha_hora > curdate() 
  ORDER BY fecha_hora ASC LIMIT 100`;

  db.query(sql, [], (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
    } else {
      result(null, res);
    }
  });
};

//Peticion para ingresar pagina principal segun su id de usuario
User.eventsCarrouselId = (id, result) => {
  const sql = `SELECT id_evento, ruta_imagen, nombre_evento, LEFT(descripcion, 25) as descripcion, LEFT(fecha_hora, 10) as fecha_hora FROM evento where fecha_hora > curdate() 
  AND id_evento in (SELECT id_evento FROM evento_interes WHERE id_estado !=4 AND id_estado != 1 AND id_usuario = ?) ORDER by fecha_hora ASC LIMIT 3`;

  db.query(sql, [id], (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
    } else {
      result(null, res);
    }
  });
};

//Peticion para ingresar pagina principal segun su id de usuario
User.mainPagebyId = (id, result) => {
  const sql= `SELECT id_evento, ruta_imagen, nombre_evento, LEFT(descripcion, 25) AS descripcion, LEFT(fecha_hora, 10) AS fecha_hora FROM evento where id_evento in (SELECT id_evento FROM evento_interes WHERE id_estado !=4 AND id_estado != 1 AND id_usuario = ?) AND fecha_hora > curdate() 
  ORDER BY fecha_hora ASC LIMIT 100 OFFSET 3`
  db.query(sql, [id], (err, res) => {
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
User.showEvent = (id_evento, result) => {
  const sql = `SELECT ruta_flayer AS flayer, nombre_evento, descripcion, LEFT(fecha_hora, 10) AS fecha, right(fecha_hora, 8) AS hora, lugar FROM evento where id_evento = ?`;

  db.query(sql, [id_evento], (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
    } else {
      result(null, res);
    }
  });
};

//Peticion buscar evento
User.searchEvent = (nombre, date, categoria, lugar, result) => {
  // console.log(nombre_evento + '--' + fecha_hora + '--' + id_categoria + '--' + lugar + '--')
  let sql = `SELECT * FROM evento WHERE `;
  let ya = false;
  let parametros = [];

  if (nombre) {
    sql = sql + "nombre_evento LIKE ?";
    ya = true;
    parametros.push("%" + nombre + "%");
  }

  if (date) {
    if (ya) {
      sql += " OR ";
    }
    sql = sql + "fecha_hora LIKE ?";
    ya = true;
    parametros.push("%" + date + "%");
  }

  if (categoria) {
    if (ya) {
      sql += " OR ";
    }
    sql =
      sql +
      "id_categoria IN (select id_categoria FROM categoria_evento where descrip_cat LIKE ?)";
    ya = true;
    parametros.push(categoria);
  }

  if (lugar) {
    if (ya) {
      sql += " OR ";
    }
    sql = sql + "lugar LIKE ?";
    ya = true;
    parametros.push("%" + lugar + "%");
  }

  if (!ya) {
    sql = `SELECT * FROM evento`;
  }

  console.log ("sql: "+ sql);
  console.log (parametros);
  
  db.query(sql, parametros, (err, res) => {

    if (err) {
      result(err, null);
    } else {
      result(null, res);
    }
  });
};

//Peticion buscar evento segun id usuario
User.searchEventByUserId = (id, nombre, date, categoria, lugar, result) => {
  // console.log(nombre_evento + '--' + fecha_hora + '--' + id_categoria + '--' + lugar + '--')
  let sql = `SELECT * FROM evento WHERE `;
  let ya = false;
  let parametros = [];

  if (nombre) {
    console.log(1)
    sql = sql + "nombre_evento LIKE ?";
    ya = true;
    parametros.push("%" + nombre + "%");
  }

  if (date) {
    console.log(2)
    if (ya) {
      sql += " OR ";
    }
    sql = sql + "fecha_hora LIKE ?";
    ya = true;
    parametros.push(date);
  }

  if (categoria) {
    console.log('caew')
    if (ya) {
      sql += " OR ";
    }
    sql =
      sql +
      "id_categoria IN (select id_categoria FROM categoria_evento where descrip_cat LIKE ?)";
    ya = true;
    parametros.push("%" + categoria + "%");
  }

  if (lugar) {
    console.log(4)
    if (ya) {
      sql += " OR ";
    }
    sql = sql + "lugar LIKE ?";
    ya = true;
    parametros.push("%" + lugar + "%");
  }
  
  if (ya) {
    console.log(5)
    sql +=
      "AND id_evento in (SELECT id_evento FROM evento_interes WHERE id_estado !=4 AND id_estado != 1 AND id_usuario = ?)";
    parametros.push(id);
  }

  if (!ya) {
    sql = `SELECT * FROM evento`;
  }

  // console.log ("sql: "+ sql);
  // console.log (parametros);

  db.query(sql, parametros, (err, res) => {
    console.log("error: ", err);
    console.log("result: ", res);

    if (err) {
      result(err, null);
    } else {
      result(null, res);
    }
  });
};

//Peticion cambiar nombre usuario
User.updateNameUser = (user, result) => {
  const sql = `UPDATE usuario SET nombre = ? WHERE id_usuario = ?`;
  db.query(sql, 
    [
      user.nombre, 
      user.id_usuario
    ], (err, res) => {
    if (err) {
      result(err, null);
    } else {
      result(null, res);
    }
  });
};

//Peticion cambiar correo usuario
User.updateEmailUser = (user, result) => {
  const sql = `UPDATE usuario SET correo = ? WHERE id_usuario = ?`;
  db.query(sql, [user.correo, user.id_usuario], (err, res) => {
    if (err) {
      result(err, null);
    } else {
      result(null, res);
    }
  });
};

//Peticion cambiar contraseña usuario
User.updatePasswordUser = (user, result) => {
  const sql = `UPDATE usuario SET contrasenia = ? WHERE id_usuario = ?`;
  db.query(sql, [user.contrasenia, user.id_usuario], (err, res) => {
    if (err) {
      result(err, null);
    } else {
      result(null, res);
    }
  });
};

//Peticion cambiar imagen usuario
User.updateImageProfileUser = (user, result) => {
  const sql = `UPDATE usuario SET imagen_perfil = ? WHERE id_usuario = ?`;
  db.query(sql, [user.imagen_perfil, user.id_usuario], (err, res) => {
    if (err) {
      result(err, null);
    } else {
      result(null, res);
    }
  });
};

//Peticion elimiar/desactivar cuenta
User.desactiveProfileUser = (id, result) => {
  const sql = `UPDATE usuario SET status = 0 WHERE id_usuario = ?`;
  db.query(sql, [id], (err, res) => {
    if (err) {
      result(err, null);
    } else {
      result(null, res);
    }
  });
};

module.exports = User;
