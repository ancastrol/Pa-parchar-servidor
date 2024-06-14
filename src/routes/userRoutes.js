const { Router } = require("express");
const router = Router(); //routes
const usersController = require("../controllers/usersController");
router.post("/crearUsuario", usersController.register);
router.get("/usuario", usersController.getAll);
router.post("/usuario/login", usersController.searchLogin);
router.get("/usuario/:id", usersController.getById);
router.get("/perfil/:id", usersController.getProfile);
router.get("/principal", usersController.mainPage);
router.get("/principal/eventsCarrousel", usersController.eventsCarrousel);
router.get("/principal/events", usersController.moreEventsPage);
router.get("/principal/:id", usersController.mainPageById);
router.get("/principal/eventsCarrousel/:id", usersController.eventsCarrouselId);
router.get("/evento/:id", usersController.showEvent);
router.post("/estadoEvento", usersController.eventStatus);
router.post("/busqueda", usersController.searchEvent); 
router.get("/buscar", usersController.searchEventByUserId);
router.post("/usuario/:id/nombre",usersController.updateNameUser);
router.post("/usuario/correo",usersController.updateEmailUser);
router.post("/usuario/contrasenia",usersController.updatePasswordUser);
router.post("/usuario/imagenPerfil",usersController.updateImageProfileUser);
router.put("/usuario/:id",usersController.desactiveProfileUser);

module.exports = router;