const express = require('express');
const app = express();
const morgan = require('morgan');
const cors = require('cors');
app.use(cors());

// Configuración de middleware para permitir CORS
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    next();
});

//setqings
app.set('port', process.env.PORT || 3000);
app.set('json spaces', 2);

//middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//routes
app.use(require('./src/routes/userRoutes'));
app.use(require('./src/routes/organizerRoutes'));
app.use(require('./src/routes/clientRoutes'));

//Inicializar el servidor
app.listen(3000, () => {
console.log( `Server is running on port ${app.get('port')}`);
});
