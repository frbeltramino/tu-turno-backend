const { Router } = require('express');
const router = Router();
const { validarJWT } = require("../middlewares/validar-jwt");
const { createService, createProfessional, getServicesWithProfessionals, deleteService, deleteProfessional } = require('../controllers/servicesAndProfessionals');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { isDate } = require('../helpers/isDate');




router.get("/", getServicesWithProfessionals);
// Crear un servicio
router.use(validarJWT);

router.post(
  '/service',
  [
    check('name', 'El nombre del servicio es requerido').not().isEmpty(),
    check('description', 'La descripción del servicio es requerida').not().isEmpty(),
    check('time_turns', 'El tiempo de turnos es requerido').not().isEmpty(),
    check('professionals', 'Los profesionales son requeridos').not().isEmpty(),
    validarCampos
  ],
  createService
);

// Crear un profesional
router.post(
  '/professional',
  [
    check('name', 'El nombre del profesional es requerido').not().isEmpty(),
    check('description', 'La descripción del profesional es requerida').not().isEmpty(),
    check('working_days', 'Los días de trabajo son requeridos').not().isEmpty(),
    validarCampos
  ],
  createProfessional
);

router.delete('/:id', deleteService);

router.delete('/professional/:id', deleteProfessional);



module.exports = router;