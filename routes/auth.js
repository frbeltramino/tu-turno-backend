/*
  Rutas de usuarios
  host + /api/auth
*/

const express = require('express');
const { check } = require('express-validator');
const { crearUsuario, loginUsuario, revalidarToken, guardarOtp, getOtp, deleteOtp, guardarRegisterOtp, deleteRegisterOtp, userUpdate } = require('../controllers/auth');
const { validarCampos } = require('../middlewares/validar-campos');
const router = express.Router();
const { validarJWT } = require('../middlewares/validar-jwt');



router.post(
    '/new', 
    [//middlewares
      check('name', 'El nombre es requerido').not().isEmpty(),
      check('email', 'El email es requerido').isEmail(),
      check('phone', 'El telefono es requerido').not().isEmpty(),
      validarCampos
    ] , 
    crearUsuario
  );

router.post(
    '/', 
    [
      check('email', 'El email es requerido').isEmail(),  
      check('password', 'La contraseña de de ser de 6 caracteres').isLength({ min: 6 }),
      validarCampos
    ],
    loginUsuario);

router.get('/renew', validarJWT, revalidarToken

);

// otp para ingreso de usuario

router.post('/otp', guardarOtp );

router.get('/getOtp', getOtp );

router.delete('/deleteOtp', deleteOtp );

// otp para registro de usuario
router.post('/registerOtp', guardarRegisterOtp );

router.delete('/deleteRegisterOtp', deleteRegisterOtp );


router.use(validarJWT);

router.put('/userUpdate/:id', 
  [//middlewares
    check('name', 'El nombre es requerido').not().isEmpty(),
    check('phone', 'El telefono es requerido').not().isEmpty(),
    validarCampos
  ] , userUpdate);


module.exports = router;