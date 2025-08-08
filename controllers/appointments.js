const { response } = require('express');
const Turno = require('../models/Turno');
const { parseISO } = require("date-fns");
const Service = require('../models/Service');
const Professional = require('../models/Professional');
const { createZoomMeeting } = require('../helpers/createZoomMeeting');
const { sendAppointmentEmail } = require('../helpers/sendEmail');
const { 
  generateAcceptApptTemplate,
  generateCancelAppointmentTemplate,
  generatePendingApptTemplate,
  generateApptTemplate
  } = require('../emailTemplates/templates');
const { formatDate } = require('../helpers/isDate');
const moment = require('moment');
const { formatAmount } = require('../helpers/utils');
const { generateProfPendingApptTemplate, generateProfApptTemplate, generateCancelAppointmentProfTemplate } = require('../emailTemplates/professionalTemplates');
require('moment/locale/es'); 
moment.locale('es');

const createAppointment = async (req, res = response) => {
  try {
    const {
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
      service_name,
      service_id
    } = req.body;

    const uid = req.uid;

    // Buscar el servicio por ID
    const service = await Service.findById(service_id);
    if (!service) {
      return res.status(404).json({
        ok: false,
        message: 'Servicio no encontrado'
      });
    }

    const profesional = await Professional.findById(professional_id);
    if (!profesional) {
      return res.status(404).json({
        ok: false,
        message: 'Profesional no encontrado'
      });
    }

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
      service_name,
      service_id,
      price: service.price || 0,
      requires_deposit: service.requires_deposit || false,
      is_virtual: service.is_virtual || false,
      is_confirmed: !service.requires_deposit, // si requiere deposito se crea como pendiente
      deposit_amount: service.deposit_amount || 0,
      deposit_paid_amount: 0,
      profesional_email: profesional.email,
      profesional_phone: profesional.phone || undefined,
      address: service.address || undefined
    });

    const emailTitle = service.is_virtual ? 'Solicitud de turno virtual' : 'Solicitud de turno';
    const serviceType = service.is_virtual ? 'Virtual' : 'Presencial';

    let htmlContent;
    if (!service.requires_deposit) {
      if (turno.is_virtual){//si el servicio es virtual y no requiere seña genero el meet link
        const meet_link = await createZoomMeeting(turno.service_name, turno.start_hour, turno.duration);
        turno.meet_link = meet_link;
      }
    } 

    // Primero guardamos el turno
    await turno.save();
   
    res.status(201).json({
      ok: true,
      turno
    });

    if (service.requires_deposit) {
      callSendEmail(turno, emailTitle, 'createPendingAppt');
    } else {
      callSendEmail(turno, emailTitle, 'createAppt');
    }

  } catch (err) {
    console.error('Error al crear turno:', err);
    res.status(500).json({
      ok: false,
      message: 'Por favor hable con el administrador',
      err
    });
  }
};


const getAppointments = async (req, res = response) => {
  try {
    const turnos = await Turno.find().select('-meet_link -profesional_email -profesional_phone');
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
};

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
    // Pendientes / activos
    const activos = await Turno.find({
      client_id: id,
      is_cancelled: false,
      is_completed: false
    })
      .sort({ date: -1, start_hour: -1 })

    // Cancelados o completados
    const finalizados = await Turno.find({
      client_id: id,
      $or: [
        { is_cancelled: true },
        { is_completed: true }
      ]
    })
      .sort({ date: -1, start_hour: -1 })
      .limit(10);

    res.status(200).json({
      ok: true,
      turnos: [...activos, ...finalizados] // Primero activos, luego finalizados
    });
  } catch (err) {
    res.status(500).json({
      ok: false,
      message: 'Por favor hable con el administrador'
    });
  }
};

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
      is_completed,
      price,
      requires_deposit,
      is_confirmed,
      is_virtual,
      deposit_amount,
      deposit_paid_amount
    } = req.body;

    const existingTurno = await Turno.findById(id);

    if (!existingTurno) {
      return res.status(404).json({
        ok: false,
        message: 'Turno no encontrado'
      });
    }

    if (existingTurno.is_cancelled && is_completed) {
      return res.status(400).json({
        ok: false,
        message: 'No se puede completar un turno que ya fue cancelado.'
      });
    }

    if (existingTurno.is_completed && is_cancelled) {
      return res.status(400).json({
        ok: false,
        message: 'No se puede cancelar un turno que ya fue completado.'
      });
    }

    const updateData = {
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
    };

    if (price !== undefined) updateData.price = price;
    if (requires_deposit !== undefined) updateData.requires_deposit = requires_deposit;
    if (is_confirmed !== undefined) updateData.is_confirmed = is_confirmed;
    if (is_virtual !== undefined) updateData.is_virtual = is_virtual;
    if (deposit_amount !== undefined) updateData.deposit_amount = deposit_amount;
    if (deposit_paid_amount !== undefined) updateData.deposit_paid_amount = deposit_paid_amount;

    const updatedTurno = await Turno.findByIdAndUpdate(id, updateData, { new: true });

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

    if (turno.is_cancelled) {
      return res.status(400).json({
        ok: false,
        message: 'El turno ya está cancelado'
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
  const { deposit_amount } = req.body;

  try {
    const turno = await Turno.findById(id);

    if (!turno) {
      return res.status(404).json({
        ok: false,
        message: 'Turno no encontrado'
      });
    }

    if (turno.is_cancelled) {
      turno.is_cancelled = false;
    }

    if (deposit_amount >= 0) {
      turno.deposit_paid_amount = deposit_amount;
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

const acceptAppointment = async (req, res = response) => {
  const { id } = req.params;
  const { deposit_amount } = req.body;
  try {
    const turno = await Turno.findById(id);

    if (!turno) {
      return res.status(404).json({
        ok: false,
        message: 'Turno no encontrado'
      });
    }

    if (turno.is_cancelled) {
      turno.is_cancelled = false;
    }
    if (turno.is_completed) {
      turno.is_completed = false;
    }

    turno.is_confirmed = true;

  
    if (deposit_amount >= 0) {
      turno.deposit_paid_amount = deposit_amount;
    }

    // Si corresponde, se genera link de Zoom
    if (turno.is_virtual && turno.requires_deposit) {
      const meet_link = await createZoomMeeting(turno.service_name, turno.start_hour, turno.duration);
      turno.meet_link = meet_link;
    }

    await turno.save();

    res.status(200).json({
      ok: true,
      message: 'Turno marcado como aceptado',
      turno
    });
    const emailTitle = 'Turno aceptado';
    callSendEmail(turno, emailTitle, 'createAppt');

  } catch (err) {
    console.error(err);
    res.status(500).json({
      ok: false,
      message: 'Error al aceptar el turno'
    });
  }
};

const getAppointmentsFromToday = async (req, res = response) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const turnos = await Turno.find({
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

const getAppointmentsByDate = async (req, res = response) => {
  try {
    const { date } = req.params;

    if (!date) {
      return res.status(400).json({
        ok: false,
        message: 'Debe proporcionar una fecha en el parámetro "date" (YYYY-MM-DD)',
      });
    }

    const selectedDate = new Date(date);
    selectedDate.setHours(0, 0, 0, 0);

    const nextDay = new Date(selectedDate);
    nextDay.setDate(nextDay.getDate() + 1);
    nextDay.setHours(0, 0, 0, 0);

    const turnos = await Turno.find({
      date: {
        $gte: selectedDate,
        $lt: nextDay,
      }
    }).sort({ date: 1, start_hour: 1 });

    res.status(200).json({
      ok: true,
      turnos,
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({
      ok: false,
      message: 'Por favor hable con el administrador',
    });
  }
};

const cancelAppointmentByClient = async (req, res = response) => {
  const { id } = req.params;
  console.log(req.params);
  try {
    const turno = await Turno.findById(id);

    if (!turno) {
      return res.status(404).json({
        ok: false,
        message: 'Turno no encontrado'
      });
    }

    const turnoDate = turno.date;
    const turnoStart = turno.start_hour;

    const fechaCompleta = moment(turnoDate).format('YYYY-MM-DD') + 'T' + turnoStart + ':00';
    const turnoDateTime = moment(fechaCompleta);
    const ahora = moment();
    const diferenciaEnHoras = turnoDateTime.diff(ahora, 'hours');
    if (diferenciaEnHoras < process.env.HORAS_DE_CANCELACION) {
      return res.status(400).json({
        ok: false,
        message: 'El turno no se puede cancelar porque está dentro de las últimas ' + process.env.HORAS_DE_CANCELACION + ' horas.'
      });
    }

    if (turno.is_completed) {
      return res.status(400).json({
        ok: false,
        message: 'El turno ya fué completado.'
      });
    }

    if (turno.is_confirmed) {
      turno.is_confirmed = false;
    }

    turno.is_cancelled = true;
    await turno.save();

 
    const emailTitle = 'Cancelación de turno';
    callSendEmail(turno, emailTitle, 'cancelAppointment');


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

const callSendEmail = async (turno, emailTitle, action) => {
  try {
    const service = await Service.findById(turno.service_id);
    if (!service) {
      console.error('Servicio no encontrado');
      return;
    }

    const profesional = await Professional.findById(turno.professional_id);
    if (!profesional) {
      console.error('Profesional no encontrado');
      return;
    }

    const serviceType = service.is_virtual ? 'Virtual' : 'Presencial';

    const {
      client_name,
      client_email,
      client_phone,
      date,
      start_hour,
      professional_name,
      service_name,
      meet_link,
      address
    } = turno;

    let htmlContent;

    switch (action) {

      case 'createPendingAppt':
        htmlContent = generatePendingApptTemplate({
          nombreCliente: client_name,
          diaTurno: formatDate(date),
          horaTurno: start_hour,
          profesionalName: professional_name,
          servicio: service_name,
          depositoInicial: formatAmount(service.deposit_amount),
          profesionalPhone: profesional.phone,
          serviceType,
          address
        });
        break;

      case 'createAppt':
        htmlContent = generateApptTemplate({
          nombreCliente: client_name,
          diaTurno: formatDate(date),
          horaTurno: start_hour,
          profesionalName: professional_name,
          servicio: service_name,
          serviceType,
          meetLink: meet_link,
          address
        });
        break;

       case 'cancelAppointment':
        htmlContent = generateCancelAppointmentTemplate({
          nombreCliente: client_name,
          diaTurno: formatDate(date),
          horaTurno: start_hour,
          profesionalName: professional_name,
          servicio: service_name,
          serviceType
        });
        break;
    }

    // Enviar al cliente
    await sendAppointmentEmail(client_email, emailTitle, htmlContent);

    // Enviar al profesional si corresponde
    if (profesional.email) {
      let profHtml;
       switch (action) {
        case 'createPendingAppt':
          profHtml = generateProfPendingApptTemplate({
            nombreCliente: client_name,
            emailCliente: client_email,
            phoneCliente: client_phone,
            diaTurno: formatDate(date),
            horaTurno: start_hour,
            profesionalName: professional_name,
            servicio: service_name,
            depositoInicial: formatAmount(service.deposit_amount),
            profesionalPhone: profesional.phone,
            serviceType,
            address
          });
          break;
        case 'createAppt':
          profHtml = generateProfApptTemplate({
            nombreCliente: client_name,
            emailCliente: client_email,
            phoneCliente: client_phone,
            diaTurno: formatDate(date),
            horaTurno: start_hour,
            profesionalName: professional_name,
            servicio: service_name,
            depositoInicial: formatAmount(service.deposit_amount),
            profesionalPhone: profesional.phone,
            serviceType,
            meetLink: meet_link,
            address
          });
        break;
      case 'cancelAppointment':
        profHtml = generateCancelAppointmentProfTemplate({
          nombreCliente: client_name,
          emailCliente: client_email,
          phoneCliente: client_phone,
          nombreCliente: client_name,
          diaTurno: formatDate(date),
          horaTurno: start_hour,
          profesionalName: professional_name,
          servicio: service_name,
          serviceType
        });
      break;
        
    }

      await sendAppointmentEmail(profesional.email, emailTitle, profHtml);
    }
  } catch (err) {
    console.error('Error en callSendEmail:', err);
  }
};

module.exports = {
  getAppointments,
  createAppointment,
  updateAppointment,
  cancelAppointment,
  getAppointmentsByClientId,
  getActiveAppointments,
  completeAppointment,
  getAppointmentsFromToday,
  getAppointmentsByDate,
  acceptAppointment,
  cancelAppointmentByClient
};