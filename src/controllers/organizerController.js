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
    const id = req.params.id || null;

    organizer.desactiveEvent(id, (err, data) => {
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
