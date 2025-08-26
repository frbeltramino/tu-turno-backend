const express = require('express');
require('dotenv').config();
const app = express();
const { dbConnection } = require('./database/config');
const cors = require('cors');
const { i18n, moment } = require('./i18n');


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

app.use(i18n.init);

// rutas
app.use('/api/auth', require('./routes/auth'));
app.use('/api/events', require('./routes/events'));
app.use('/api/appointments', require('./routes/appointments'));
app.use('/api/holidays', require('./routes/holidays'));
app.use('/api/servicesAndProfessionals', require('./routes/servicesAndProfessionals'));
app.use('/api/admin', require('./routes/admin'));


// escuchar peticiones
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});


