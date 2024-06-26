const User = require("../models/user");
module.exports = {
  
  //Peticion login
  searchLogin(req, res) {
    const user = req.body; //Datos del usuario desde el front-end
    User.searchLogin(user, (err, data) => {
      if (err) {
        return res.status(501).json({
          success: false,
          message: "Error al consultar el usuario",
          error: err,
        });
      }
      console.log("Controller Usuarios encontrados: ", data.length); //for debugging
      return res.status(201).json({
        success: true,
        message: "Usuarios encontrados:" + data.length,
        data: data, //Datos desde Model
      });
    });
  },

  //Peticion registrar usuario
  register(req, res) {
    const user = req.body; //Datos del cliente
    User.register(user, (err, data) => {
      if (err) {
        return res.status(501).json({
          success: false,
          message: "Error al crear el usuario",
          error: err,
        });
      }
      return res.status(201).json({
        success: true,
        message:  data.message,
        data: data, //Id del usuario creado
      });
    });
  },

  //Peticion cambiar nombre de usuario
  changeName(req, res){
    const user = req.body;
    User.changeName(user, (err, data) => {
      if (err) {
        return res.status(501).json({
          success: false,
          message: "Error al cambiar nombre de usuario",
          error: err,
        });
      }
      return res.status(201).json({
        success: true,
        message: "Nombre cambiado exitosamente",
        data: data,
      });
    });
  },

  //Peticion cambiar correo de usuario
  changeEmail(req, res){
    const user = req.body;
    User.changeEmail(user, (err, data) => {
      if (err) {
        return res.status(501).json({
          success: false,
          message: "Error al cambiar correo de usuario",
          error: err,
        });
      }
      return res.status(201).json({
        success: true,
        message: "Correo cambiado exitosamente",
        data: data,
      });
    });
  },

  //Peticion cambiar contraseña de usuario
  changePassword(req, res){
    const user = req.body;
    User.changePassword(user, (err, data) => {
      if (err) {
        return res.status(501).json({
          success: false,
          message: "Error al cambiar contraseña de usuario",
          error: err,
        });
      }
      return res.status(201).json({
        success: true,
        message: res.message,
        data: data,
      });
    });
  },
  
  //Peticion obtener usuarios
  getAll(req, res) {
    User.getAll((err, data) => {
      if (err) {
        res.status(501).json({
          success: false,
          message: "Error al obtener los usuarios",
          error: err,
        });
      }
      return res.status(200).json({
        success: true,
        message: "Usuarios obtenidos",
        data: data,
      });
    });
  },

  //Peticion obtener usuarios segun id
  getById(req, res) {
    const id = req.params.id;
    User.getById(id, (err, data) => {
      if (err) {
        return res.status(501).json({
          success: false,
          message: "Error al obtener el usuario",
          error: err,
        });
      }
      return res.status(202).json({
        success: true,
        message: "Usuario obtenido",
        data: data,
      });
    });
  },

  getProfile(req, res){
    const id = req.params.id;
    User.getProfile(id, (err, data) => {
      if (err) {
        return res.status(501).json({
          success: false,
          message: "Error al obtener el perfil",
          error: err,
        });
      }
      return res.status(202).json({
        success: true,
        message: "Perfil encontrado",
        data: data,
      });
    });
  },

  //Peticion para ingresar pagina principal
  mainPage(req, res) {
    User.mainPage((err, data) => {
      if (err) {
        return res.status(501).json({
          success: false,
          message: "Error al ingresar a la pagina",
          error: err,
        });
      }
      return res.status(202).json({
        success: true,
        message: "Peticion aceptada",
        data: data,
      });
    });
  },

  //Peticion ver eventos en carrousel
  eventsCarrousel(req, res) {
    User.eventsCarrousel((err, data) => {
      if (err) {
        return res.status(501).json({
          success: false,
          message: "Eventos no encontrados",
          error: err,
        });
      }
      return res.status(202).json({
        success: true,
        message: "Peticion aceptada",
        data: data,
      });
    });
  },


  //Peticion ver todos los eventos
  moreEventsPage(req, res) {
    User.moreEventsPage((err, data) => {
      if (err) {
        return res.status(501).json({
          success: false,
          message: "Error al ingresar a la pagina",
          error: err,
        });
      }
      return res.status(202).json({
        success: true,
        message: "Peticion aceptada",
        data: data,
      });
    });
  },

  //Peticion ingresar al carrusel segun id de usuario
  eventsCarrouselId(req, res) {
    const id = req.params.id;
    User.eventsCarrouselId(id, (err, data) => {
      if (err) {
        return res.status(501).json({
          success: false,
          message: "Error al encontrar eventos carrusel",
          error: err,
        });
      }
      return res.status(202).json({
        success: true,
        message: "Peticion aceptada",
        data: data,
      });
    });
  },

  //Peticion ingresar pagina principal segun id de usuario
  mainPageById(req, res) {
    const id = req.params.id;
    console.log(req.params.id);
    User.mainPagebyId(id, (err, data) => {
      if (err) {
        return res.status(501).json({
          success: false,
          message: "Error al encontrar eventos",
          error: err,
        });
      }
      return res.status(202).json({
        success: true,
        message: "Peticion aceptada",
        data: data,
      });
    });
  },

  //Peticion ver detalles de evento
  showEvent(req, res) {
    const id = req.params.id;
    User.showEvent(id, (err, data) => {
      if (err) {
        return res.status(501).json({
          success: false,
          message: "Error al ingresar a la pagina",
          error: err,
        });
      }
      return res.status(202).json({
        success: true,
        message: "Peticion aceptada",
        data: data,
      });
    });
  },

  //Peticion eventos calendario
  calendar(req, res) {
    const month = req.params.month;
    const user = req.params.id
    const data = {month : month, id:user}
    User.calendar(data, (err, data) => {
      if (err) {
        return res.status(501).json({
          success: false,
          message: "Error al buscar eventos",
          error: err,
        });
      }
      return res.status(202).json({
        success: true,
        message: "Peticion aceptada",
        data: data,
      });
    });
  },

  //Peticion buscar evento
  searchEvent(req, res) {
    const busqueda = req.body.searchElement;
    User.searchEvent(busqueda, (err, data) => {
      if (err) {
        return res.status(501).json({
          success: false,
          message: "No se encontraron resultados",
          error: err,
        });
      }
      return res.status(201).json({
        success: true,
        message: "Peticion aceptada",
        data: data,
      });
    });
  },

  //Peticion cambiar estado de evento
  eventStatus(req, res) {
    const id_usuario = req.body.id_usuario;
    const id_evento = req.body.id_evento;
    const id_estado = req.body.estado;
    User.eventStatus(id_usuario, id_evento, id_estado, (err, data) => {
      if (err) {
        return res.status(501).json({
          success: false,
          message: "Error al cambiar estado de evento",
          error: err,
        });
      }
      return res.status(202).json({
        success: true,
        message: "Peticion aceptada",
        data: data,
      });
    });
  },

  //Peticion buscar evento segun id usuario
  searchEventByUserId(req, res) {
    console.log("En el controlador");
    const id = req.query.id;
    const nombre = req.query.nombre || false;
    const date = req.query.date || false;
    const categoria = req.query.categoria || false;
    const lugar = req.query.lugar || false;
    //const operation = {nombre_evento:nombre_evento, fecha_hora:fecha_hora, id_categoria:id_categoria, lugar:lugar};

    //console.log(id, nombre, date , categoria, lugar);

    User.searchEventByUserId(id,nombre,date,categoria,lugar,
      (err, data) => {
        if (err) {
          return res.status(501).json({
            success: false,
            message: "No se encontraron resultados",
            error: err,
          });
        }
        return res.status(201).json({
          success: true,
          message: "Peticion aceptada",
          data: data,
        });
      }
    );
  },

  //Peticion cambiar nombre usuario
  updateNameUser(req, res) {
    const id = req.body;
    console.log("En el controlador ", id);
    User.updateNameUser(id, (err, data) => {
      if (err) {
        return res.status(501).json({
          success: false,
          message: "Error al actualizar nombre de usuario",
          error: err,
        });
      }
      return res.status(202).json({
        success: true,
        message: "Peticion aceptada",
        data: data,
      });
    });
  },

  //Peticion cambiar correo usuario
  updateEmailUser(req, res) {
    console.log("En el controlador");
    const id = req.body;
    User.updateEmailUser(id, (err, data) => {
      if (err) {
        return res.status(501).json({
          success: false,
          message: "Error al actualizar correo usuario",
          error: err,
        });
      }
      return res.status(202).json({
        success: true,
        message: "Peticion aceptada",
        data: data,
      });
    });
  },

  //Peticion cambiar contraseña usuario
  updatePasswordUser(req, res) {
    console.log("En el controlador");
    const id = req.body;
    User.updatePasswordUser(id, (err, data) => {
      if (err) {
        return res.status(501).json({
          success: false,
          message: "Error al actualizar contraseña",
          error: err,
        });
      }
      return res.status(202).json({
        success: true,
        message: "Peticion aceptada",
        data: data,
      });
    });
  },

  //Peticion cambiar imagen usuario
  updateImageProfileUser(req, res) {
    console.log("En el controlador");
    const id = req.body;
    User.updateImageProfileUser(id, (err, data) => {
      if (err) {
        return res.status(501).json({
          success: false,
          message: "Error al actualizar",
          error: err,
        });
      }
      return res.status(202).json({
        success: true,
        message: "Peticion aceptada",
        data: data,
      });
    });
  },

  //Peticion desactivar usuario
  desactiveProfileUser(req, res) {
    console.log("En el controlador");
    const id = req.body.id_usuario;
    User.desactiveProfileUser(id, (err, data) => {
      if (err) {
        return res.status(501).json({
          success: false,
          message: "'Error al desactivar perfil",
          error: err,
        });
      }
      if(data.affectedRows == 0){
        return res.status(202).json({
        success: false,
        message: "No se puede Bloquear al administrador",
        data: data,
        });
      }
      return res.status(202).json({
        success: true,
        message: "Perfil cambiado de estado exitosamente",
        data: data,
      });
    });
  },

  //Peticion eliminar usuario
  deleteProfileUser(req, res) {
    console.log("En el controlador");
    const id = req.body.id_usuario;
    User.deleteProfileUser(id, (err, data) => {
      if (err) {
        return res.status(501).json({
          success: false,
          message: "Error al eliminar perfil",
          error: err,
        });
      }
      return res.status(202).json({
          success: true,
          message: "Perfil eliminado exitosamente",
          data: data,
      });
    });
  },
};
