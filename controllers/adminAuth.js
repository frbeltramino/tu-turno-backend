const { response } = require('express');
const Usuario = require('../models/Usuario');
const bcrypt = require('bcryptjs');
const { generarJWT } = require('../helpers/jwt');


const loginAdmin = async (req, res = response) => {
  const { email, password } = req.body;

  try {
    const usuario = await Usuario.findOne({ email });

    if (!usuario) {
      return res.status(400).json({
        ok: false,
        message: 'Correo no registrado',
      });
    }

    // Verificar si es admin
    if (usuario.role !== 'admin') {
      return res.status(403).json({
        ok: false,
        message: 'No tienes permisos de administrador',
      });
    }

    // Validar contraseña (puedes usar bcrypt si está hasheada)
    const validPassword = bcrypt.compareSync(password, usuario.password);
    if (!validPassword) {
      return res.status(400).json({
        ok: false,
        message: 'Contraseña incorrecta',
      });
    }
   
    // Generar token
    const token = await generarJWT(usuario._id, usuario.name);

    res.json({
      ok: true,
      uid: usuario._id,
      name: usuario.name,
      user: usuario,
      token,
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({
      ok: false,
      message: 'Por favor hable con el administrador',
    });
  }
};

const revalidarToken = async (req, res = response) => {

  const { uid, name } = req;

  // generar un nuevo JWT y retornarlo
  console.log(uid);
  console.log(name);
  const token = await generarJWT(uid, name);

  res.json({
    ok: true,
    uid,
    name,
    token
  });
}


const crearUsuarioAdmin = async (req, res = response) => {
  const { name, email, phone, password } = req.body;

  try {
    // Verificar si ya existe un usuario con ese correo
    const usuarioExistente = await Usuario.findOne({ email });
    if (usuarioExistente) {
      return res.status(400).json({
        ok: false,
        message: 'Ya existe un usuario con ese correo',
      });
    }

    // Crear nuevo usuario con rol 'admin'
    const usuario = new Usuario({
      name,
      email,
      phone,
      password,
      role: 'admin',
    });

    // Encriptar contraseña
    const salt = bcrypt.genSaltSync(10);
    usuario.password = bcrypt.hashSync(password, salt);

    // Guardar en BD
    await usuario.save();

    // Respuesta simple
    res.status(201).json({
      ok: true,
      message: 'Usuario admin creado correctamente',
      userId: usuario._id,
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({
      ok: false,
      message: 'Por favor hable con el administrador',
      error: err.message,
    });
  }
};

module.exports = { crearUsuarioAdmin, loginAdmin, revalidarToken };