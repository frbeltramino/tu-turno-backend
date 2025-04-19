const { response } = require('express');
const Feriado = require('../models/Feriado');


const createHoliday = async ( req, res = response) => {
  try {
    const { description, date } = req.body; 
    console.log(req.body);
    const holiday = new Feriado({
      description,
      date,
    });
    console.log(JSON.stringify(holiday));
    await holiday.save();
    res.status(201).json({
      ok: true,
      holiday,
      message: 'El feriado fué creado',
    });
  } catch (err) {
    res.status(500).json({
      ok: false,
      message: 'Por favor hable con el administrador',
      err: err
    });
  }
}

const getHolidays = async (req, res = response) => {
  try {
    const holidays = await Feriado.find();
    res.status(200).json({
      ok: true,
      holidays
    });
  } catch (err) {
    res.status(500).json({
      ok: false,
      message: 'Por favor hable con el administrador'
    });
  }
}

getHolidaysById = async (req, res = response) => {
  const { id } = req.params;
  try {
    const holiday = await Feriado.findById(id);
    res.status(200).json({
      ok: true,
      holiday
    });
  } catch (err) {
    res.status(500).json({
      ok: false,
      message: 'Por favor hable con el administrador'
    });
  }
}

updateHoliday = async (req, res = response) => {
  try {
    const { id } = req.params;
    console.log(req.body);
    console.log(id);
    const { description, date } = req.body;
    const holiday = await Feriado.findByIdAndUpdate(id, {
      description,
      date,
    });
    res.status(200).json({
      ok: true,
      holiday
    });
  } catch (err) {
    res.status(500).json({
      ok: false,
      message: 'Por favor hable con el administrador'
    });
  }
}

deleteHoliday = async (req, res = response) => {
  try {
    const { id } = req.params;
    const holiday = await Feriado.findByIdAndDelete(id);
    res.status(200).json({
      ok: true,
      message: 'El feriado fue borrado'
    });
  } catch (err) {
    res.status(500).json({
      ok: false,
      message: 'Por favor hable con el administrador'
    });
  }
} 

module.exports = {
  createHoliday,
  getHolidays,
  getHolidaysById,
  updateHoliday,
  deleteHoliday
};