const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const { createAppointment, getAppointments, updateAppointment, deleteAppointment, getAppointmentsByClientId, cancelAppointment, completeAppointment, getActiveAppointments } = require('../controllers/appointments');
const { validarJWT } = require("../middlewares/validar-jwt");
const { validarCampos } = require('../middlewares/validar-campos');
const { isDate } = require('../helpers/isDate');


router.get('/', getAppointments );

router.get('/activeAppointments', getActiveAppointments);

router.use(validarJWT);

router.post(
  '/',
  [
    check('date', 'La fecha tiene formato incorrecto').custom(isDate),
    check('day', 'El dia es requerido').not().isEmpty(),
    check('start_hour', 'La hora de inicio es requerida').not().isEmpty(),
    check('end_hour', 'La hora de fin es requerida').not().isEmpty(),
    check('client_name', 'El nombre del cliente es requerido').not().isEmpty(),
    check('client_phone', 'El telefono del cliente es requerido').not().isEmpty(),
    check('client_email', 'El email del cliente es requerido').not().isEmpty(),
    check('professional_id', 'El id profesional es requerido').not().isEmpty(),
    check('duration', 'La duracion es requerida').not().isEmpty(),
    check('professional_name', 'El nombre del profesional es requerido').not().isEmpty(),
    check('client_id', 'El id del cliente es requerido').not().isEmpty(),
    validarCampos
  ],
   createAppointment );


router.get('/:id', getAppointmentsByClientId );

router.put('/:id',
  [
    check('date', 'La fecha tiene formato incorrecto').custom(isDate),
    check('day', 'El dia es requerido').not().isEmpty(),
    check('start_hour', 'La hora de inicio es requerida').not().isEmpty(),
    check('end_hour', 'La hora de fin es requerida').not().isEmpty(),
    check('client_name', 'El nombre del cliente es requerido').not().isEmpty(),
    check('client_phone', 'El telefono del cliente es requerido').not().isEmpty(),
    check('client_email', 'El email del cliente es requerido').not().isEmpty(),
    check('professional_id', 'El id profesional es requerido').not().isEmpty(),
    check('duration', 'La duracion es requerida').not().isEmpty(),
    check('professional_name', 'El nombre del profesional es requerido').not().isEmpty(),
    check('client_id', 'El id del cliente es requerido').not().isEmpty(),
    validarCampos
  ], updateAppointment );

  router.put('/cancel/:id', cancelAppointment);
  router.put('/complete/:id', completeAppointment);




module.exports = router;