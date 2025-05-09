const express = require('express');
const { check } = require('express-validator');
const { crearUsuarioAdmin, loginAdmin } = require('../controllers/adminAuth');
const { validarCampos } = require('../middlewares/validar-campos');
const router = express.Router();
const { validarJWT } = require('../middlewares/validar-jwt');
const { revalidarToken } = require('../controllers/adminAuth');


router.post(
  '/auth/login', 
  [
    check('email', 'El email es requerido').isEmail(),  
    check('password', 'La contraseña de de ser de 6 caracteres').isLength({ min: 6 }),
    validarCampos
  ],
  loginAdmin);

  router.get('/auth/renew', validarJWT, revalidarToken
  
  );

  router.use(validarJWT);

  router.post(
    '/auth/new', 
    [//middlewares
      check('name', 'El nombre es requerido').not().isEmpty(),
      check('email', 'El email es requerido').isEmail(),
      validarCampos
    ] , 
    crearUsuarioAdmin
  );

module.exports = router;