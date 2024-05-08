const Client = require("../models/client");

module.exports = {
  //Peticion eventos por dia calendario segun estado

  calendarState(req, res) {
    const id = req.params.id;
    const date1 = req.query.date1 || null;
    const date2 = req.query.date2 || null;

    Client.calendarState(id, date1, date2, (err, data) => {
      if (err) {
        res.status(501).json({
          success: false,
          message: "Error al obtener calendario",
          error: err,
        });
      }
      return res.status(200).json({
        success: true,
        message: "Calendario obtenido",
        data: data,
      });
    });
  },
};
