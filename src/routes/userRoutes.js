const { Router } = require("express");
const router = Router(); //routes
const usersController = require("../controllers/usersController");
router.post("/usuario", usersController.register);
router.get("/usuario", usersController.getAll);
router.get("/usuario/:id", usersController.getById);
router.get("/principal",usersController.mainPage);
router.get("/principal/:id",usersController.mainPageById);
router.get("/evento/id",usersController.showEvent);
router.get("/busqueda/:id",usersController.searchEventById);
//router.get("/usuario/login",usersController.login);

module.exports = router;
