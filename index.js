const express = require('express');
require('dotenv').config();
const app = express();
const { dbConnection } = require('./database/config');
const cors = require('cors');

//Base de datos
dbConnection();

// CORS
app.use(cors());

const port = process.env.PORT;


console.log(process.env);



//Directorio publico
app.use(express.static('public'));

// LEctura y parseo de body
app.use(express.json());


// rutas
app.use('/api/auth', require('./routes/auth'));
app.use('/api/events', require('./routes/events'));
app.use('/api/appointments', require('./routes/appointments'));
app.use('/api/holidays', require('./routes/holidays'));
app.use('/api/servicesAndProfessionals', require('./routes/servicesAndProfessionals'));


// escuchar peticiones
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});


