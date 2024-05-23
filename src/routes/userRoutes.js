const { Router } = require("express");
const router = Router(); //routes
const usersController = require("../controllers/usersController");
router.post("/usuario", usersController.register);
router.get("/usuario", usersController.getAll);
router.post("/usuario/login", usersController.searchLogin);
router.get("/usuario/:id", usersController.getById);
router.get("/principal", usersController.mainPage);
router.get("/principal/events", usersController.moreEventsPage);
router.get("/principal/:id", usersController.mainPageById);
router.get("/evento/:id", usersController.showEvent);
router.get("/busqueda", usersController.searchEvent);
router.get("/buscar", usersController.searchEventByUserId);
router.post("/usuario/:id/nombre",usersController.updateNameUser);
router.post("/usuario/correo",usersController.updateEmailUser);
router.post("/usuario/contrasenia",usersController.updatePasswordUser);
router.post("/usuario/imagenPerfil",usersController.updateImageProfileUser);
router.put("/usuario/:id",usersController.desactiveProfileUser);

module.exports = router;