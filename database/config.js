const mongoose = require('mongoose');



const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.DB_CNN, {
      // useNewUrlParser: true,
      // useUnifiedTopology: true
    });
    console.log('Conexión a la base de datos establecida');
  } catch (err) {
    console.log('Error al conectar a la base de datos');
    console.log(err);
  }
}

module.exports = {
  dbConnection
}

