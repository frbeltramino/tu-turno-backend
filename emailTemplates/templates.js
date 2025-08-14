
const translations = {
  es: {
    title: "Confirmación de Turno",
    noReply: "Por favor, no respondas a este correo. Es automático.",
    hello: "¡Hola",
    details: "Estos son los detalles de tu turno:",
    date: "Fecha",
    time: "Hora",
    professional: "Profesional",
    service: "Servicio",
    mode: "Modalidad",
    address: "Dirección",
    joinLink: "Enlace para unirse",
    joinRecommendation: "Te recomendamos conectarte 5 minutos antes del horario pactado. ¡Nos vemos pronto!"
  },
  en: {
    title: "Appointment Confirmation",
    noReply: "Please do not reply to this email. It is automatic.",
    hello: "Hello",
    details: "Here are the details of your appointment:",
    date: "Date",
    time: "Time",
    professional: "Professional",
    service: "Service",
    mode: "Mode",
    address: "Address",
    joinLink: "Join link",
    joinRecommendation: "We recommend connecting 5 minutes before the scheduled time. See you soon!"
  }
};

const generateApptTemplate = ({
  nombreCliente,
  diaTurno,
  horaTurno,
  profesionalName,
  servicio,
  serviceType,
  address,
  meetLink,
  lang = 'en' // idioma por defecto
}) => {
  const t = translations[lang];
  const modalidadIcon = serviceType === 'Virtual' ? '💻' : '🏢';
  
  const addressItem = address
    ? `<li>📍 <strong>${t.address}:</strong> ${address}</li>`
    : '';

  const meetLinkItem = meetLink
    ? `<p>🔗 <strong>${t.joinLink}:</strong><br />
       <a href="${meetLink}" target="_blank" style="color: #3367d6;">${meetLink}</a></p>
       <p>${t.joinRecommendation}</p>`
    : '';

  return `
  <!DOCTYPE html>
  <html lang="${lang}">
    <head><meta charset="UTF-8" /><title>${t.title}</title></head>
    <body style="font-family: Arial, sans-serif; background: #f9f9f9; padding: 20px;">
      <div style="background: #fff; padding: 20px; border-radius: 8px;">
        <p style="color: #888; font-size: 14px;">${t.noReply}</p>
        <h2>${t.hello} ${nombreCliente}!</h2>
        <p>${t.details}</p>
        <ul style="list-style: none; padding-left: 0; font-size: 16px;">
          <li>📆 <strong>${t.date}:</strong> ${diaTurno}</li>
          <li>🕜 <strong>${t.time}:</strong> ${horaTurno}</li>
          <li>🎓 <strong>${t.professional}:</strong> ${profesionalName}</li>
          <li>🛎 <strong>${t.service}:</strong> ${servicio}</li>
          <li>${modalidadIcon} <strong>${t.mode}:</strong> ${serviceType}</li>
          ${addressItem}
        </ul>
        ${meetLinkItem}
      </div>
    </body>
  </html>`;
};


const translationsPending = {
  es: {
    title: "Solicitud de Turno",
    noReply: "Este es un mensaje automático. Por favor, no respondas a este correo.",
    hello: "¡Hola",
    received: "Hemos recibido tu solicitud de turno. Para confirmarlo, es necesario abonar una seña inicial de",
    details: "A continuación te compartimos los detalles de tu reserva:",
    date: "Fecha",
    time: "Hora",
    professional: "Profesional",
    service: "Servicio",
    mode: "Modalidad",
    address: "Dirección",
    payment: "Para realizar el pago de la seña y confirmar tu turno, por favor contactate con tu profesional al siguiente número:",
    thanks: "¡Gracias por elegirnos!"
  },
  en: {
    title: "Pending Appointment Request",
    noReply: "This is an automated message. Please do not reply to this email.",
    hello: "Hello",
    received: "We have received your appointment request. To confirm it, you need to pay an initial deposit of",
    details: "Here are the details of your booking:",
    date: "Date",
    time: "Time",
    professional: "Professional",
    service: "Service",
    mode: "Mode",
    address: "Address",
    payment: "To make the deposit and confirm your appointment, please contact your professional at the following number:",
    thanks: "Thank you for choosing us!"
  }
};

const generatePendingApptTemplate = ({
  nombreCliente,
  diaTurno,
  horaTurno,
  profesionalName,
  servicio,
  depositoInicial,
  profesionalPhone,
  serviceType,
  address,
  lang = 'en'
}) => {
  const t = translationsPending[lang];
  const modalidadIcon = serviceType === 'Virtual' ? '💻' : '🏢';
  
  const addressItem = address
    ? `<li>📍 <strong>${t.address}:</strong> ${address}</li>`
    : '';

  return `
  <!DOCTYPE html>
  <html lang="${lang}">
    <head><meta charset="UTF-8" /><title>${t.title}</title></head>
    <body style="font-family: Arial, sans-serif; background: #f9f9f9; padding: 20px;">
      <div style="background: #fff; padding: 20px; border-radius: 8px;">
        <p style="color: #888; font-size: 14px;">${t.noReply}</p>
        <h2>${t.hello} ${nombreCliente}!</h2>
        <p>${t.received} <strong>${depositoInicial}</strong>.</p>
        <p>${t.details}</p>
        <ul style="list-style: none; padding-left: 0; font-size: 16px;">
          <li>📆 <strong>${t.date}:</strong> ${diaTurno}</li>
          <li>🕜 <strong>${t.time}:</strong> ${horaTurno}</li>
          <li>🎓 <strong>${t.professional}:</strong> ${profesionalName}</li>
          <li>🛎 <strong>${t.service}:</strong> ${servicio}</li>
          <li>${modalidadIcon} <strong>${t.mode}:</strong> ${serviceType}</li>
          ${addressItem}
        </ul>
        <p>${t.payment}</p>
        <p><strong>${profesionalPhone}</strong></p>
        <p>${t.thanks}</p>
      </div>
    </body>
  </html>`;
};

const translationsAccept = {
  es: {
    title: "Confirmación de Turno",
    noReply: "Por favor, no respondas a este correo. Es automático.",
    hello: "¡Hola",
    details: "Estos son los detalles de tu turno:",
    date: "Fecha",
    time: "Hora",
    professional: "Profesional",
    service: "Servicio",
    mode: "Modalidad",
    inPerson: "Presencial"
  },
  en: {
    title: "Appointment Confirmation",
    noReply: "Please do not reply to this email. It is automatic.",
    hello: "Hello",
    details: "Here are the details of your appointment:",
    date: "Date",
    time: "Time",
    professional: "Professional",
    service: "Service",
    mode: "Mode",
    inPerson: "In person"
  }
};

const generateAcceptApptTemplate = ({
  nombreCliente,
  diaTurno,
  horaTurno,
  profesionalName,
  servicio,
  lang = 'en'
}) => {
  const t = translationsAccept[lang];

  return `
<!DOCTYPE html>
<html lang="${lang}">
  <head><meta charset="UTF-8" /><title>${t.title}</title></head>
  <body style="font-family: Arial, sans-serif; background: #f9f9f9; padding: 20px;">
    <div style="background: #fff; padding: 20px; border-radius: 8px;">
      <p style="color: #888; font-size: 14px;">${t.noReply}</p>
      <h2>${t.hello} ${nombreCliente}!</h2>
      <p>${t.details}</p>
      <ul style="list-style: none; padding-left: 0; font-size: 16px;">
        <li>📆 <strong>${t.date}:</strong> ${diaTurno}</li>
        <li>🕜 <strong>${t.time}:</strong> ${horaTurno}</li>
        <li>🎓 <strong>${t.professional}:</strong> ${profesionalName}</li>
        <li>🛎 <strong>${t.service}:</strong> ${servicio}</li>
        <li>💻 <strong>${t.mode}:</strong> ${t.inPerson}</li>
      </ul>
    </div>
  </body>
</html>`;
};

const translationsCancel = {
  es: {
    title: "Cancelación de Turno",
    noReply: "Por favor, no respondas a este correo. Es automático.",
    hello: "¡Hola",
    cancelled: "❌ Tu turno ha sido cancelado.",
    date: "Fecha",
    time: "Hora",
    professional: "Profesional",
    service: "Servicio",
    mode: "Modalidad"
  },
  en: {
    title: "Appointment Cancellation",
    noReply: "Please do not reply to this email. It is automatic.",
    hello: "Hello",
    cancelled: "❌ Your appointment has been cancelled.",
    date: "Date",
    time: "Time",
    professional: "Professional",
    service: "Service",
    mode: "Mode"
  }
};

const generateCancelAppointmentTemplate = ({
  nombreCliente,
  diaTurno,
  horaTurno,
  profesionalName,
  servicio,
  serviceType,
  lang = 'en'
}) => {
  const t = translationsCancel[lang];

  return `
<!DOCTYPE html>
<html lang="${lang}">
  <head><meta charset="UTF-8" /><title>${t.title}</title></head>
  <body style="font-family: Arial, sans-serif; background: #f9f9f9; padding: 20px;">
    <div style="background: #fff; padding: 20px; border-radius: 8px;">
      <p style="color: #888; font-size: 14px;">${t.noReply}</p>
      <h2>${t.hello} ${nombreCliente}!</h2>
      <p>${t.cancelled}</p>
      <ul style="list-style: none; padding-left: 0; font-size: 16px;">
        <li>📆 <strong>${t.date}:</strong> ${diaTurno}</li>
        <li>🕜 <strong>${t.time}:</strong> ${horaTurno}</li>
        <li>🎓 <strong>${t.professional}:</strong> ${profesionalName}</li>
        <li>🛎 <strong>${t.service}:</strong> ${servicio}</li>
        <li>💻 <strong>${t.mode}:</strong> ${serviceType}</li>
      </ul>
    </div>
  </body>
</html>`;
};

module.exports = {
  generatePendingApptTemplate,
  generateAcceptApptTemplate,
  generateCancelAppointmentTemplate,
  generateApptTemplate
}