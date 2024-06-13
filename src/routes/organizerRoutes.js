const { Router } = require("express");
const router = Router(); //routes
const usersController = require("../controllers/organizerController");

router.get("/organizer/:id", usersController.getMyEvents); //prueba
router.get("/organizer", usersController.getAll); //prueba
router.get("/organizer/:id/fechaASC", usersController.fechaASC);
router.get("/organizer/:id/fechaDESC", usersController.fechaDESC);
router.get("/organizer/:id/categoriaASC", usersController.categoriaASC);
router.get("/organizer/:id/categoriaDESC", usersController.categoriaDESC);
router.post("/organizer", usersController.updateEvent);
router.put("/organizer", usersController.createEvent);
router.delete("/organizer/evento/:id", usersController.desactiveEvent);

module.exports = router;
