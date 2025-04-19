/*
  Event Routes
  /api/events
*/
const { Router } = require('express');
const router = Router();
const { validarJWT } = require("../middlewares/validar-jwt");
const { getEventos, crearEvento, actualizarEvento, eliminarEvento } = require('../controllers/events');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { isDate } = require('../helpers/isDate');


router.use(validarJWT);

// obtener eventos
router.get('/', getEventos);


//crear un nuevo evento
router.post(
  '/',
  [
    check('title', 'El titulo es requerido').not().isEmpty(),
    check('start', 'La fecha de inicio es requerida').custom(isDate),
    check('end', 'La fecha de fin es requerida').custom(isDate),
    validarCampos
  ],
  crearEvento
);

//Actualizar un evento
router.put(
  '/:id',
  [
    check('title', 'El titulo es requerido').not().isEmpty(),
    check('start', 'La fecha de inicio es requerida').custom(isDate),
    check('end', 'La fecha de fin es requerida').custom(isDate),
    validarCampos
  ],
  actualizarEvento);

//Borrar evento
router.delete('/:id', eliminarEvento);


module.exports = router;