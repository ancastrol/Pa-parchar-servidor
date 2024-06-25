const { Router } = require("express");
const router = Router(); //routes
const organizerController = require("../controllers/organizerController");

router.get("/organizer/:id", organizerController.getMyEvents);//prueba
router.get("/organizer", organizerController.getAll);//prueba 
router.get('/organizer/:id/fechaASC',organizerController.fechaASC);
router.get('/organizer/:id/fechaDESC',organizerController.fechaDESC);
router.get('/organizer/:id/categoriaASC',organizerController.categoriaASC);
router.get('/organizer/:id/categoriaDESC',organizerController.categoriaDESC);
router.post('/organizer',organizerController.updateEvent);
router.post('/organizer/evento',organizerController.createEvent);
router.put('/organizer/actEvento',organizerController.updateEvent);
router.delete("/organizer/evento/:id",organizerController.desactiveEvent);

module.exports = router;