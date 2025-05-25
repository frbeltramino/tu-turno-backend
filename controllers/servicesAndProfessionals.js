const { response } = require('express');
const Service = require('../models/Service');
const Professional = require('../models/Professional');

const createService = async (req, res = response) => {
  try {
    const { 
      name, 
      price, 
      description, 
      image, 
      time_turns, 
      professionals, 
      requires_deposit, 
      is_virtual,
      deposit_amount,
      address 
    } = req.body;

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
      professionals,
      requires_deposit,
      is_virtual,
      deposit_amount,
      address
    });
    console.log(service);
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

const updateService = async (req, res = response) => {
  try {
    const { id } = req.params;
    const { 
      name, 
      price, 
      description, 
      image, 
      time_turns, 
      professionals, 
      requires_deposit = false, 
      is_virtual = false,
      deposit_amount = 0,
      address
    } = req.body;

    // Verificar si el servicio existe
    const existingService = await Service.findById(id);
    if (!existingService) {
      return res.status(404).json({
        ok: false,
        message: "Servicio no encontrado",
      });
    }

    // Validar campos requeridos
    if (!name || !description || !time_turns || !Array.isArray(professionals)) {
      return res.status(400).json({
        ok: false,
        message: "Faltan datos obligatorios o el formato de los profesionales es incorrecto",
      });
    }

    // Verificar si los profesionales existen en la BD
    const existingProfessionals = await Professional.find({ _id: { $in: professionals } });

    if (existingProfessionals.length !== professionals.length) {
      return res.status(400).json({
        ok: false,
        message: "Uno o más profesionales no existen en la base de datos",
      });
    }

    // Actualizar el servicio
    existingService.name = name;
    existingService.price = price;
    existingService.description = description;
    existingService.image = image;
    existingService.time_turns = time_turns;
    existingService.professionals = professionals;
    existingService.requires_deposit = requires_deposit;
    existingService.is_virtual = is_virtual;
    existingService.deposit_amount = deposit_amount;
    existingService.address = address;

    await existingService.save();

    return res.status(200).json({
      ok: true,
      service: existingService,
      message: "Servicio actualizado exitosamente",
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
    const { name, description, image, working_days, holidays, phone, email, bank_account_cbu, bank_account_alias, bank_account_titular } = req.body;

    // Validar datos
    console.log(req.body);
    if (!name || !description || !Array.isArray(working_days)) {
      return res.status(400).json({
        ok: false,
        message: "Faltan datos obligatorios o el formato de los días de trabajo es incorrecto",
      });
    }

    if (!email) {
      return res.status(400).json({
        ok: false,
        message: "Falta el email del profesional",
      });
    }

    // Crear profesional
    const professional = new Professional({
      name,
      description,
      image,
      working_days,
      holidays,
      phone,
      email,
      bank_account_cbu,
      bank_account_alias,
      bank_account_titular
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

const updateProfessional = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, image, working_days, holidays, phone, email, bank_account_cbu, bank_account_alias, bank_account_titular } = req.body;

    // Validar datos requeridos
    if (!name || !description || !Array.isArray(working_days)) {
      return res.status(400).json({
        ok: false,
        message: "Faltan datos obligatorios o el formato de los días de trabajo es incorrecto",
      });
    }

    // Buscar el profesional existente
    const professional = await Professional.findById(id);

    if (!professional) {
      return res.status(404).json({
        ok: false,
        message: "Profesional no encontrado",
      });
    }

    // Actualizar campos
    professional.name = name;
    professional.description = description;
    professional.image = image;
    professional.working_days = working_days;
    professional.holidays = holidays;
    if (phone !== undefined) professional.phone = phone;
    if (email !== undefined) professional.email = email;
    if (bank_account_cbu !== undefined) professional.bank_account_cbu = bank_account_cbu;
    if (bank_account_alias !== undefined) professional.bank_account_alias = bank_account_alias;
    if (bank_account_titular !== undefined) professional.bank_account_titular = bank_account_titular;


    await professional.save();

    return res.status(200).json({
      ok: true,
      professional,
      message: "El profesional fue actualizado exitosamente",
    });

  } catch (err) {
    console.error(err);
    return res.status(500).json({
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
  deleteProfessional,
  updateService,
  updateProfessional
  // getServices,
  // getServicesByClientId,
  // updateService,
  // deleteService
};