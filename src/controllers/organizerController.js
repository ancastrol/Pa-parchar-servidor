const Organizer = require("../models/organizer");
const router = require("../routes/organizerRoutes");

module.exports = {
  getAll(req, res) {
    Organizer.getAll((err, data) => {
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
//peticion organizar por fecha ascendente
  fechaASC(req, res) {
    const id = req.params.id;
    console.log(req.params.id);
    Organizer.fechaASC(id, (err, data) => {
      if (err) {
        res.status(501).json({
          success: false,
          message: "Error al obtener los eventos",
          error: err,
        });
      }
      return res.status(200).json({
        success: true,
        message: "Eventos obtenidos",
        data: data,
      });
    });
  },
  //peticion organizar por fecha descendente
  fechaDESC(req, res) {
    const id = req.params.id;
    console.log(req.params.id);
    Organizer.fechaDESC(id, (err, data) => {
      if (err) {
        res.status(501).json({
          success: false,
          message: "Error al obtener los eventos",
          error: err,
        });
      }
      return res.status(200).json({
        success: true,
        message: "Eventos obtenidos",
        data: data,
      });
    });
  },
  //peticion organizar por categoria ascendente
  categoriaASC(req, res) {
    const id = req.params.id;
    console.log(req.params.id);
    Organizer.categoriaASC(id, (err, data) => {
      if (err) {
        res.status(501).json({
          success: false,
          message: "Error al obtener los eventos",
          error: err,
        });
      }
      return res.status(200).json({
        success: true,
        message: "Eventos obtenidos",
        data: data,
      });
    });
  },

  //peticion organizar por categoria descendente
  categoriaDESC(req, res) {
    const id = req.params.id;
    console.log(req.params.id);
    Organizer.categoriaDESC(id, (err, data) => {
      if (err) {
        res.status(501).json({
          success: false,
          message: "Error al obtener los eventos",
          error: err,
        });
      }
      return res.status(200).json({
        success: true,
        message: "Eventos obtenidos",
        data: data,
      });
    });
  },

  //Peticion cambiar datos evento
  updateEvent(req, res) {
    const organizer = req.body;
    console.log("En el controlador ", organizer);
    Organizer.updateEvent(organizer, (err, data) => {
      if (err) {
        return res.status(501).json({
          success: false,
          message: "Error al actualizar datos evento",
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

    //Peticion crear evento
    createEvent(req, res) {
      const organizer = req.body;
      console.log("En el controlador ", organizer);
      Organizer.createEvent(organizer, (err, data) => {
        if (err) {
          return res.status(501).json({
            success: false,
            message: "Error al crear evento",
            error: err,
          });
        }
        return res.status(202).json({
          success: true,
          message: "Evento creado",
          data: data,
        });
      });
    },

  //Peticion desactivar usuario
  desactiveEvent(req, res) {
    console.log("En el controlador");
    const id = req.params.id || null;

    Organizer.desactiveEvent(id, (err, data) => {
      if (err) {
        return res.status(501).json({
          success: false,
          message: "'Error al eliminar evento",
          error: err,
        });
      }
      if (!data) {
        return res.status(404).json({
          success: false,
          message: "Error en la BD",
        });
      }
      if(data.affectedRows == 0){
        return res.status(202).json({
          success: true,
          message: "Evento no encontrado",
          data: data,
        });
      }
      return res.status(202).json({
        success: true,
        message: "Evento eliminado exitosamente",
        data: data,
      });
    });
  },
};
