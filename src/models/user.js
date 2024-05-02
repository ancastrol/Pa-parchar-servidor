const db = require("../config/config");
const User = {};

User.register = (user, result) => {
  const sql = `SELECT COUNT(*) AS datos_existentes FROM usuario WHERE correo = ?`;
  db.query(sql, [user.correo], (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
    } else {
      console.log("Datos existentes: ", err);
      if (res[0].datos_existentes > 0) {
        result(null, { message: "Correo ya registrado" });
      } else {
        const sql = `INSERT INTO usuario (nombre, rol, correo, contrasenia) VALUES (?, ?, ?, ?)`;
        db.query(
          sql,
          [user.nombre, user.rol, user.correo, user.contrasenia],
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
  const sql = `SELECT correo AS tipo FROM usuario WHERE correo = ? AND contrasenia = ?`;
  db.query(
    sql,
    [user.email, user.password, user.email, user.password],
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

//Peticion para ingresar pagina principal segun su id de usuario
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

//Peticion buscar evento
User.searchEvent = (operation, result) => {
  const sql = `SELECT * FROM evento WHERE nombre_evento LIKE ?`;
  db.query(sql, [operation.nombre_evento], (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
    }
    else {
      console.log("Resultados de la primera consulta:", res);
      if (res.length > 0) {
        result(null, res);
      }
      else {
        const sql = `SELECT * FROM evento WHERE DATE_FORMAT(fecha_hora, '%Y-%m-%d %H:%i:%s') LIKE ?`;
        db.query(sql, [operation.fecha_hora], (err, res) => {
          if (err) {
            console.log("error: ", err);
            result(err, null);
          } 
          else {
            console.log("Resultados de la segunda consulta:", res);
            if (res.length > 0) {
              result(null, res);
            } 
            else {
              const sql = `SELECT * FROM evento WHERE id_categoria IN (SELECT id_categoria FROM categoria_evento WHERE descrip_cat LIKE ?)`;
              db.query(sql, [operation.id_categoria], (err, res) => {
                if (err) {
                  console.log("error: ", err);
                  result(err, null);
                } 
                else {
                  console.log("Resultados de la tercera consulta:", res);
                  if (res.length > 0) {
                    result(null, res);
                  } 
                  else {
                    const sql = `SELECT * FROM evento WHERE lugar LIKE ?`;
                    db.query(sql, [operation.lugar], (err, res) => {
                      if (err) {
                        console.log("error: ", err);
                        result(err, null);
                      } 
                      else {
                        console.log("Resultados de la cuarta consulta:", res);
                        if (res.length > 0) {
                          result(null, res);
                        }
                        else {
                          result(null, [], { message: 'No se encontraron coincidencias' });
                        }
                      }
                    });
                  }
                }
              });
            }
          }
        });
      }
    }
  });
};

//Peticion buscar evento segun id usuario
User.searchEventByUserId = (operation, result) => {
  const sql = `SELECT * FROM evento WHERE nombre_evento LIKE ? 
  AND id_evento in (SELECT id_evento FROM evento_interes WHERE id_estado !=4 AND id_estado != 1 AND id_usuario = ${id})`;
  db.query(sql, [operation.nombre_evento], (err, res) => { 
    if (err) {
      console.log("error: ", err);
      result(err, null);
    }
    else {
      console.log("Entre a la que es:", res);
      if (res.length > 0) {
        result(null, res);
      }
      else {
        const sql = `SELECT * FROM evento WHERE DATE_FORMAT(fecha_hora, '%Y-%m-%d %H:%i:%s') LIKE ? 
        AND id_evento in (SELECT id_evento FROM evento_interes WHERE id_estado !=4 AND id_estado != 1 AND id_usuario = ${id})`;
        db.query(sql, [operation.fecha_hora], (err, res) => {
          if (err) {
            console.log("error: ", err);
            result(err, null);
          } 
          else {
            console.log("Resultados de la segunda consulta:", res);
            if (res.length > 0) {
              result(null, res);
            } 
            else {
              const sql = `SELECT * FROM evento WHERE id_categoria IN (SELECT id_categoria FROM categoria_evento WHERE descrip_cat LIKE ?) 
              AND id_evento in (SELECT id_evento FROM evento_interes WHERE id_estado !=4 AND id_estado != 1 AND id_usuario = ${id})`;
              db.query(sql, [operation.id_categoria], (err, res) => {
                if (err) {
                  console.log("error: ", err);
                  result(err, null);
                } 
                else {
                  console.log("Resultados de la tercera consulta:", res);
                  if (res.length > 0) {
                    result(null, res);
                  } 
                  else {
                    const sql = `SELECT * FROM evento WHERE lugar LIKE ? 
                    AND id_evento in (SELECT id_evento FROM evento_interes WHERE id_estado !=4 AND id_estado != 1 AND id_usuario = ${id})`;
                    db.query(sql, [operation.lugar], (err, res) => {
                      if (err) {
                        console.log("error: ", err);
                        result(err, null);
                      } 
                      else {
                        console.log("Resultados de la cuarta consulta:", res);
                        if (res.length > 0) {
                          result(null, res);
                        }
                        else {
                          result(null, [], { message: 'No se encontraron coincidencias' });
                        }
                      }
                    });
                  }
                }
              });
            }
          }
        });
      }
    }
  });
};

//Peticion cambiar nombre usuario
User.updateNameUser = (user, result) => {
  const sql = `UPDATE usuario SET nombre = ? WHERE id_usuario = ?`;
  db.query(sql, [user.nombre, user.id_usuario], (err, res) => {
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
  const sql = `UPDATE usuario set status = 0 WHERE id_usuario = ?`;
  db.query(sql, [id], (err, res) => {
    if (err) {
      result(err, null);
    } else {
      result(null, res);
    }
  });
};

module.exports = User;
