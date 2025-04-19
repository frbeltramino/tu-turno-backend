const { response } = require('express');
const Turno = require('../models/Turno');
const { parseISO } = require("date-fns");

const createAppointment = async ( req, res = response) => {
  try {
    const { day, start_hour, end_hour, date, isActive, client_name, client_phone, client_email, professional_id, duration, professional_name, client_id, service_name } = req.body;
    const uid  = req.uid;  
    console.log(professional_id);
    console.log(req.body);
    const turno = new Turno({
      day,
      start_hour,
      end_hour,
      date,
      isActive,
      client_name,
      client_phone,
      client_email,
      professional_id,
      duration,
      professional_name,
      client_id,
      service_name
    });
    console.log(JSON.stringify(turno));
    await turno.save();
    res.status(201).json({
      ok: true,
      turno
    });
  } catch (err) {
    res.status(500).json({
      ok: false,
      message: 'Por favor hable con el administrador',
      err: err
    });
  }
}


const getAppointments = async (req, res = response) => {
  try {
    const turnos = await Turno.find();
    res.status(200).json({
      ok: true,
      turnos
    });
  } catch (err) {
    res.status(500).json({
      ok: false,
      message: 'Por favor hable con el administrador'
    });
  }
}

const getActiveAppointments = async (req, res = response) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const turnos = await Turno.find({
      is_cancelled: false,
      is_completed: false,
      date: { $gte: today }
    }).sort({ date: 1, start_hour: 1 });

    res.status(200).json({
      ok: true,
      turnos
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({
      ok: false,
      message: 'Por favor hable con el administrador'
    });
  }
};

const getAppointmentsByClientId = async (req, res = response) => {
  const { id } = req.params;
  try {
    const turnos = await Turno.find({ client_id: id })
      .sort({ date: 1, start_hour: 1 }); // 1 para ascendente, -1 para descendente

    res.status(200).json({
      ok: true,
      turnos
    });
  } catch (err) {
    res.status(500).json({
      ok: false,
      message: 'Por favor hable con el administrador'
    });
  }
}

const updateAppointment = async (req, res = response) => {
  try {
    const { id } = req.params;

    const {
      day,
      start_hour,
      end_hour,
      date,
      client_name,
      client_phone,
      client_email,
      professional_id,
      duration,
      professional_name,
      client_id,
      service_name,
      is_cancelled,
      is_completed
    } = req.body;

    const existingTurno = await Turno.findById(id);

    if (!existingTurno) {
      return res.status(404).json({
        ok: false,
        message: 'Turno no encontrado'
      });
    }

    // Validación: no permitir marcar como completado un turno cancelado
    if (existingTurno.is_cancelled && is_completed) {
      return res.status(400).json({
        ok: false,
        message: 'No se puede completar un turno que ya fue cancelado.'
      });
    }

    // Validación: no permitir cancelar un turno completado
    if (existingTurno.is_completed && is_cancelled) {
      return res.status(400).json({
        ok: false,
        message: 'No se puede cancelar un turno que ya fue completado.'
      });
    }

    const updatedTurno = await Turno.findByIdAndUpdate(
      id,
      {
        day,
        start_hour,
        end_hour,
        date,
        client_name,
        client_phone,
        client_email,
        professional_id,
        duration,
        professional_name,
        client_id,
        service_name,
        is_cancelled,
        is_completed
      },
      { new: true } // Devuelve el turno actualizado
    );

    res.status(200).json({
      ok: true,
      turno: updatedTurno
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({
      ok: false,
      message: 'Por favor hable con el administrador'
    });
  }
};

const cancelAppointment = async (req, res = response) => {
  const { id } = req.params;

  try {
    const turno = await Turno.findById(id);

    if (!turno) {
      return res.status(404).json({
        ok: false,
        message: 'Turno no encontrado'
      });
    }

    turno.is_cancelled = true;
    await turno.save();

    res.status(200).json({
      ok: true,
      message: 'Turno cancelado correctamente',
      turno
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({
      ok: false,
      message: 'Error al cancelar el turno'
    });
  }
};

const completeAppointment = async (req, res = response) => {
  const { id } = req.params;

  try {
    const turno = await Turno.findById(id);

    if (!turno) {
      return res.status(404).json({
        ok: false,
        message: 'Turno no encontrado'
      });
    }

    // Podés evitar marcar como completado un turno cancelado
    if (turno.is_cancelled) {
      return res.status(400).json({
        ok: false,
        message: 'No se puede completar un turno cancelado'
      });
    }

    turno.is_completed = true;
    await turno.save();

    res.status(200).json({
      ok: true,
      message: 'Turno marcado como completado',
      turno
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({
      ok: false,
      message: 'Error al completar el turno'
    });
  }
};

module.exports = {
  getAppointments,
  createAppointment,
  updateAppointment,
  cancelAppointment,
  getAppointmentsByClientId,
  getActiveAppointments,
  completeAppointment
};