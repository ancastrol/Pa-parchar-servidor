const { Router } = require("express");
const router = Router(); //routes
const clientController = require("../controllers/clientController");

router.get('/client/:id',clientController.calendarState);

module.exports = router;
