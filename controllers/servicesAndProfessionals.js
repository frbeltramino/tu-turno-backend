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
        message: res.__('i18n.servicesAndProfessionals.001'),
      });
    }

    // Verificar si los profesionales existen en la BD antes de agregarlos
    const existingProfessionals = await Professional.find({ _id: { $in: professionals } });

    if (existingProfessionals.length !== professionals.length) {
      return res.status(400).json({
        ok: false,
        message: res.__('i18n.servicesAndProfessionals.002'),
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
      message: res.__('i18n.servicesAndProfessionals.003'),
    });

  } catch (err) {
    console.error(err);
    return res.status(500).json({
      ok: false,
      message: res.__('i18n.common.error.001'),
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
        message: res.__('i18n.servicesAndProfessionals.004'),
      });
    }

    // Validar campos requeridos
    if (!name || !description || !time_turns || !Array.isArray(professionals)) {
      return res.status(400).json({
        ok: false,
        message: res.__('i18n.servicesAndProfessionals.005'),
      });
    }

    // Verificar si los profesionales existen en la BD
    const existingProfessionals = await Professional.find({ _id: { $in: professionals } });

    if (existingProfessionals.length !== professionals.length) {
      return res.status(400).json({
        ok: false,
        message: res.__('i18n.servicesAndProfessionals.006'),
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
      message: res.__('i18n.servicesAndProfessionals.007'),
    });

  } catch (err) {
    console.error(err);
    return res.status(500).json({
      ok: false,
      message: res.__('i18n.common.error.001'),
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
        message: res.__('i18n.servicesAndProfessionals.008'),
      });
    }

    if (!email) {
      return res.status(400).json({
        ok: false,
        message: res.__('i18n.servicesAndProfessionals.009'),
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
      message: res.__('i18n.servicesAndProfessionals.010'),
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({
      ok: false,
      message: res.__('i18n.common.error.001'),
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
        message: res.__('i18n.servicesAndProfessionals.008'),
      });
    }

    // Buscar el profesional existente
    const professional = await Professional.findById(id);

    if (!professional) {
      return res.status(404).json({
        ok: false,
        message: res.__('i18n.servicesAndProfessionals.011'),
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
      message: res.__('i18n.servicesAndProfessionals.012'),
    });

  } catch (err) {
    console.error(err);
    return res.status(500).json({
      ok: false,
      message: res.__('i18n.common.error.001'),
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
      message: res.__('i18n.servicesAndProfessionals.013'),
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
        message: res.__('i18n.servicesAndProfessionals.014'),
      });
    }

    res.status(200).json({
      ok: true,
      message: res.__('i18n.servicesAndProfessionals.015'),
      deletedService,
    });

  } catch (error) {
    res.status(500).json({
      ok: false,
      message: res.__('i18n.servicesAndProfessionals.016'),
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
        message: res.__('i18n.servicesAndProfessionals.011'),
      });
    }

    // Opcional: También eliminar al profesional de los servicios donde esté asociado
    await Service.updateMany(
      { professionals: id },
      { $pull: { professionals: id } }
    );

    res.status(200).json({
      ok: true,
      message: res.__('i18n.servicesAndProfessionals.017'),
      deletedProfessional,
    });

  } catch (error) {
    res.status(500).json({
      ok: false,
      message: res.__('i18n.servicesAndProfessionals.018'),
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