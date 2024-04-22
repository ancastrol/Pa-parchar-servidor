const { Router } = require('express');
const router = Router();
//routes
router.get('/', (req, res) => {
res.json({ "message": "Bienvenido a mi REST API" });
});


router.get('/saludo',(req,res)=> {
    res.json({"saludo":"ola"});
});
module.exports=router;  //exportar el mod