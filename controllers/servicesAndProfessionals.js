const { response } = require('express');
const Service = require('../models/Service');
const Professional = require('../models/Professional');

const createService = async (req, res = response) => {
  try {
    const { name, price, description, image, time_turns, professionals } = req.body;
    console.log(req.body);
    // Validar que los campos requeridos están presentes
    if (!name || !description || !time_turns || !Array.isArray(professionals)) {
      return res.status(400).json({
        ok: false,
        message: "Faltan datos obligatorios o el formato de los profesionales es incorrecto",
      });
    }

    // Verificar si los profesionales existen en la BD antes de agregarlos
    const existingProfessionals = await Professional.find({ _id: { $in: professionals } });

    if (existingProfessionals.length !== professionals.length) {
      return res.status(400).json({
        ok: false,
        message: "Uno o más profesionales no existen en la base de datos",
      });
    }

    // Crear el nuevo servicio
    const service = new Service({
      name,
      price,
      description,
      image,
      time_turns,
      professionals, // Deberían ser ObjectId válidos
    });

    await service.save();

    return res.status(201).json({
      ok: true,
      service,
      message: "El servicio fue creado exitosamente",
    });

  } catch (err) {
    console.error(err);
    return res.status(500).json({
      ok: false,
      message: "Error interno, por favor contacte al administrador",
      error: err.message,
    });
  }
};

const createProfessional = async (req, res) => {
  try {
    const { name, description, image, working_days, holidays } = req.body;

    // Validar datos
    console.log(req.body);
    if (!name || !description || !Array.isArray(working_days)) {
      return res.status(400).json({
        ok: false,
        message: "Faltan datos obligatorios o el formato de los días de trabajo es incorrecto",
      });
    }

    // Crear profesional
    const professional = new Professional({
      name,
      description,
      image,
      working_days,
      holidays
    });

    await professional.save();

    res.status(201).json({
      ok: true,
      professional,
      message: "El profesional fue creado exitosamente",
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({
      ok: false,
      message: "Error interno, contacte al administrador",
      error: err.message,
    });
  }
};

const getServicesWithProfessionals = async (req, res) => {
  try {
    console.log("llamo a getServicios");
    console.log(req.query);
    const services = await Service.find().populate("professionals"); // Relaciona los profesionales
    console.log(services);
    res.status(200).json({
      ok: true,
      services
    });

  } catch (err) {
    res.status(500).json({
      ok: false,
      message: "Error al obtener los servicios",
      error: err.message
    });
  }
};

const deleteService = async (req, res) => {
  try {
    const { id } = req.params; // Obtiene el ID del servicio desde la URL

    // Busca y elimina el servicio
    const deletedService = await Service.findByIdAndDelete(id);

    if (!deletedService) {
      return res.status(404).json({
        ok: false,
        message: "Servicio no encontrado",
      });
    }

    res.status(200).json({
      ok: true,
      message: "Servicio eliminado correctamente",
      deletedService,
    });

  } catch (error) {
    res.status(500).json({
      ok: false,
      message: "Error al eliminar el servicio",
      error: error.message,
    });
  }
};

const deleteProfessional = async (req, res) => {
  try {
    const { id } = req.params; // Obtiene el ID del profesional desde la URL

    // Busca y elimina el profesional
    const deletedProfessional = await Professional.findByIdAndDelete(id);

    if (!deletedProfessional) {
      return res.status(404).json({
        ok: false,
        message: "Profesional no encontrado",
      });
    }

    // Opcional: También eliminar al profesional de los servicios donde esté asociado
    await Service.updateMany(
      { professionals: id },
      { $pull: { professionals: id } }
    );

    res.status(200).json({
      ok: true,
      message: "Profesional eliminado correctamente",
      deletedProfessional,
    });

  } catch (error) {
    res.status(500).json({
      ok: false,
      message: "Error al eliminar el profesional",
      error: error.message,
    });
  }
};


module.exports = {
  createService,
  createProfessional,
  getServicesWithProfessionals,
  deleteService,
  deleteProfessional
  // getServices,
  // getServicesByClientId,
  // updateService,
  // deleteService
};