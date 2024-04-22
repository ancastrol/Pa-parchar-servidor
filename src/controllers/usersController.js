const User = require("../models/user");
module.exports = {
  register(req, res) {
    const user = req.body; //Datos del cliente
    User.create(user, (err, data) => {
      if (err) {
        return res.status(501).json({
          success: false,
          message: "Error al crear el usuario",
          error: err,
        });
      }
      return res.status(201).json({
        success: true,
        message: "Creado el usuario",
        data: data, //Id del usuario creado
      });
    });
  },

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

  //peticion para ingresar pagina principal

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

  //peticion para ingresar pagina principal segun su id de usuario

  mainPageById(req, res) {
    const id = req.params.id;
    User.mainPagebyId(id, (err, data) => {
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

  //Peticion ver detalles de evento

  showEvent(req, res) {
    User.showEvent((err, data) => {
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

  //Peticion buscar evento por id

  searchEventById(req, res) {
    console.log("En el controlador");
    const id = req.params.id;
    User.searchEventById(id, (err, data) => {
      if (err) {
        return res.status(501).json({
          success: false,
          message: "No se encontraron resultados",
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

}
