const { response } = require('express');
const Usuario = require('../models/Usuario');
const bcrypt = require('bcryptjs');
const { generarJWT } = require('../helpers/jwt');
const Otp = require('../models/OTP');
const otpRegister = require('../models/RegisterOTP')



const crearUsuario = async (req, res = response) => {

  const { name, email, phone, otpRegisterParam } = req.body;
  console.log(req.body);
  try {

  let usuario = await Usuario.findOne({ email });
  if (usuario) {
    res.status(400).json({
      ok: false,
      message: 'Un usuario existe con ese correo'
    });
    return;
  }

  if (!phone) {
    res.status(400).json({
      ok: false,
      message: 'Ingrese un numero de telefono'
    });
    return;
  }

  if (!otpRegisterParam) {
    res.status(400).json({
      ok: false,
      message: 'Ingrese un código de verificación'
    });
    return;
  }

  let registerOtp = await otpRegister.findOne({ email });
  if (!registerOtp) {
    res.status(400).json({
      ok: false,
      message: 'El usuario no tiene un código generado'
    });
    return;
  }
  
  //Validar contraseña
  const validOTPPassword = otpRegisterParam == registerOtp.otp;
  if (!validOTPPassword) {
    res.status(400).json({
      ok: false,
      message: 'El código ingresado es incorrecto'
    });
    return;
  }

  usuario = new Usuario( req.body );

  
  usuario.password = otpRegisterParam;

  await usuario.save();
  //generar JWT
  const token = await generarJWT(usuario._id, usuario.name);


  res.status(201).json({
    ok: true,
    uid: usuario._id,
    name: usuario.name,
    user: usuario,
    token
  });
} catch (err) {
  res.status(500).json({
    ok: false,
    message: 'Por favor hable con el administrador',
    err: err
  });
}
}

const loginUsuario = async (req, res = response) => {
  const { email, password } = req.body;

  try {
    const usuario = await Usuario.findOne({ email });
    if (!usuario) {
      return res.status(400).json({ ok: false, message: 'El usuario no existe con ese email' });
    }

    if (usuario.role === 'admin') {
      // Validar contraseña fija de admin o por otp si hay generada
      const otpUser = await Otp.findOne({ idUsuario: usuario._id });
      if ( otpUser) {
        if (password !== otpUser.otp) {
          return res.status(400).json({ ok: false, message: 'Código OTP incorrecto' });
        }
      } else {
        if (password !== process.env.ADMIN_PASSWORD) {
          return res.status(400).json({ ok: false, message: 'Contraseña de admin incorrecta' });
        }
      }
      
    } else {
      // Validar OTP como siempre
      const otpUser = await Otp.findOne({ idUsuario: usuario._id });
      if (!otpUser || password !== otpUser.otp) {
        return res.status(400).json({ ok: false, message: 'Código OTP incorrecto o no generado' });
      }
    }

    const token = await generarJWT(usuario._id, usuario.name);
    res.status(200).json({ ok: true, uid: usuario._id, name: usuario.name, user: usuario, token });

  } catch (err) {
    res.status(500).json({ ok: false, message: 'Por favor hable con el administrador', err });
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

// otp para ingreso de usuario

const guardarOtp = async (req, res = response) => {

  const { otp, email } = req.body;
  const date = new Date();
  console.log(req.body);

  const usuario = await Usuario.findOne({ email });
  if (!usuario) {
    res.status(400).json({
      ok: false,
      message: 'El usuario no existe con ese email'
    });
    return;
  }
  const idUsuario = usuario._id;
  
  const otpSaved = await Otp.findOne({ idUsuario });
  if (otpSaved) {
    res.status(500).json({
      ok: false,
      message: 'Ya hay un código generado para éste usuario'
    });
    return;
  }

  try {

  const otpObject = new Otp({
    date,
    idUsuario,
    otp
  })

  await otpObject.save();

  res.status(201).json({
    ok: true,
    Otp,
    message: 'Otp guardado'
  });
} catch (err) {
  res.status(500).json({
    ok: false,
    message: 'Por favor hable con el administrador'
  });
}
}

const getOtp = async (req, res = response) => {
  const { idUsuario } = req.body;
  try {
    const otp = await Otp.findOne({ idUsuario });
    res.status(200).json({
      ok: true,
      otp
    });
  } catch (err) {
    res.status(500).json({
      ok: false,
      message: 'Por favor hable con el administrador'
    });
  }
}

const deleteOtp = async (req, res = response) => {
  const { email } = req.body;
  console.log(req.body);
  const usuario = await Usuario.findOne({ email });
  let usuario1 = await Usuario.findOne({ email });
  console.log(usuario);
  console.log(usuario1);
  try {
    const otp = await Otp.findOneAndDelete({ idUsuario: usuario._id });
    res.status(200).json({
      ok: true,
      message: 'Otp eliminado'
    });
  } catch (err) {
    res.status(500).json({
      ok: false,
      message: 'Por favor hable con el administrador',
    });
  }
}
// Otp para registro de usuario
const guardarRegisterOtp = async (req, res = response) => {
  const { otp, email } = req.body;
  const date = new Date();
  console.log("📩 Datos recibidos:", req.body);

  if (!otp || !email) {
    return res.status(400).json({
      ok: false,
      message: "Faltan datos en la solicitud",
    });
  }

  try {
    const otpRegisterObject = new otpRegister({
      date,
      email,
      otp,
    });

    console.log("💾 Guardando OTP:", otpRegisterObject);
    await otpRegisterObject.save();

    res.status(201).json({
      ok: true,
      message: "Otp para registro guardado",
      otp: otp, // 🔹 Ahora el frontend recibe el OTP
      email: email, // (opcional) Enviar el email de vuelta
    });
  } catch (err) {
    console.error("🔥 Error en el servidor:", err);
    res.status(500).json({
      ok: false,
      message: "Por favor hable con el administrador",
      error: err.message, // 🔹 Enviar error detallado
    });
  }
};

const deleteRegisterOtp = async (req, res = response) => {
  const { email } = req.body;
  const usuario = await Usuario.findOne({ email });
  try {
    const otp = await otpRegister.findOneAndDelete({ email });
    res.status(200).json({
      ok: true,
      message: "Otp de registroeliminado",
      otp: otp, // 🔹 Ahora el frontend recibe el OTP
      email: email, // (opcional) Enviar el email de vuelta
    });
  } catch (err) {
    console.error("🔥 Error en el servidor:", err);
    res.status(500).json({
      ok: false,
      message: "Por favor hable con el administrador",
      error: err.message, // 🔹 Enviar error detallado
    });
  }
};

const userUpdate = async (req, res) => {
  const { name, phone } = req.body;
  const { id } = req.params;

  try {
    const updatedUser = await Usuario.findByIdAndUpdate(
      id,
      { name, phone },
      { new: true } // Devuelve el usuario actualizado
    );

    if (!updatedUser) {
      return res.status(404).json({ ok: false, msg: 'Usuario no encontrado' });
    }

    res.json({ ok: true, user: updatedUser });
  } catch (error) {
    console.error('Error actualizando usuario:', error);
    res.status(500).json({ ok: false, msg: 'Error del servidor' });
  }
};




module.exports = {
  crearUsuario,
  loginUsuario,
  revalidarToken,
  guardarOtp,
  getOtp,
  deleteOtp,
  guardarRegisterOtp,
  deleteRegisterOtp,
  userUpdate  
};