const { Router } = require("express");
const router = Router(); //routes
const clientController = require("../controllers/clientController");

router.get('/client',clientController.calendarState);

module.exports = router;
