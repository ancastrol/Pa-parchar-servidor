const { Router } = require("express");
const router = Router(); //routes
const organizerController = require("../controllers/organizerController");

router.get("/organizer/:id", organizerController.getMyEvents);
router.get("/admin/events", organizerController.getAllEvents);
router.get("/admin/users", organizerController.getAllUsers);
router.delete("/admin/eliminarEvento", organizerController.deleteEvent);
router.get("/organizer", organizerController.getAll);
router.get('/organizer/:id/fechaASC',organizerController.fechaASC);
router.get('/organizer/:id/fechaDESC',organizerController.fechaDESC);
router.get('/organizer/:id/categoriaASC',organizerController.categoriaASC);
router.get('/organizer/:id/categoriaDESC',organizerController.categoriaDESC);
router.post('/organizer',organizerController.updateEvent);
router.post('/organizer/evento',organizerController.createEvent);
router.put('/organizer/actEvento',organizerController.updateEvent);

module.exports = router;