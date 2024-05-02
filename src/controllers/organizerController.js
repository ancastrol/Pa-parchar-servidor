const organizer = require("../models/organizer");
const router = require("../routes/organizerRoutes");

module.exports = {
  getAll(req, res) {
    organizer.getAll((err, data) => {
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

  eventASC(req, res) {
    const id = req.params.id;
    console.log(req.params.id);
    organizer.eventASC(id, (err, data) => {
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
  //Peticion desactivar usuario
  desactiveEvent(req, res) {
    console.log("En el controlador");
    const id = req.query.id || null;

    organizer.desactiveEvent(id_evento, (err, data) => {
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
          message: "Evento no encontrado",
        });
      }
      return res.status(202).json({
        success: true,
        message: "Evento desactivado exitosamente",
        data: data,
      });
    });
  },
};
