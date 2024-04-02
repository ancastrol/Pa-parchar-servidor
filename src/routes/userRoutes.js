const usersController = require('../controllers/usersController');
module.exports = (app) => {
app.post('/users', usersController.register);
}

const { Router } = require('express');  
const router = Router(); //routes  
const usersController = require('../controllers/usersController'); 
router.post('/users', usersController.register); 
router.get('/users', usersController.getAll); 
router.get('/users/:id', usersController.getById); 
module.exports = router; 

