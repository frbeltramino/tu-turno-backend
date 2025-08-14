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
      message: res.__('i18n.holidays.003')
    });
  } catch (err) {
    res.status(500).json({
      ok: false,
      message: res.__('i18n.common.error.001'),
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
      message: res.__('i18n.common.error.001')
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
      message: res.__('i18n.common.error.001')
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
      message: res.__('i18n.common.error.001')
    });
  }
}

deleteHoliday = async (req, res = response) => {
  try {
    const { id } = req.params;
    const holiday = await Feriado.findByIdAndDelete(id);
    res.status(200).json({
      ok: true,
      message: res.__('i18n.holidays.004'),
    });
  } catch (err) {
    res.status(500).json({
      ok: false,
      message: res.__('i18n.common.error.001'),
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