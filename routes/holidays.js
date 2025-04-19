const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const { createHoliday, getHolidays, getHolidaysById, updateHoliday, deleteHoliday } = require('../controllers/holidays');
const { validarJWT } = require("../middlewares/validar-jwt");
const { validarCampos } = require('../middlewares/validar-campos');
const { isDate } = require('../helpers/isDate');

router.post(
  '/createHoliday',
  [
    check('description', 'La descripción del feriado es requerida').not().isEmpty(),
    check('date', 'La fecha tiene formato incorrecto').custom(isDate),
    validarCampos
  ],
   createHoliday );

router.get('/', getHolidays);

router.get('/:id', getHolidaysById );

router.put('/:id',
  [
    check('description', 'La descripción del feriado es requerida').not().isEmpty(),
    check('date', 'La fecha tiene formato incorrecto').custom(isDate),
    validarCampos
  ], updateHoliday );

router.delete('/:id', deleteHoliday );




module.exports = router;