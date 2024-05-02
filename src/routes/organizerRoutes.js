const { Router } = require("express");
const router = Router(); //routes
const usersController = require("../controllers/organizerController");

router.get("/organizer", usersController.getAll);//prueba 
router.get('/organizer/:id/eventASC',usersController.eventASC)
router.put("/organizer/evento/:id",usersController.desactiveEvent);

module.exports = router;