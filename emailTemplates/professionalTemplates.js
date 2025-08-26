const translationsProf = {
  es: {
    noReply: "Este es un mensaje automático. Por favor, no respondas a este correo.",
    hello: "¡Hola",
    pendingTitle: "Nuevo turno pendiente",
    pendingMsg: "Se ha generado una nueva solicitud de turno pendiente de confirmación.",
    pendingDetails: "Detalles del turno:",
    clientData: "Datos del cliente:",
    depositMsg: "Este turno requiere una seña de",
    depositNote: "para confirmarse. Te recomendamos comunicarte con el cliente para coordinar el pago.",
    thankYou: "¡Gracias por usar nuestra plataforma!",
    confirmedTitle: "Nuevo turno confirmado",
    confirmedMsg: "Se ha confirmado un nuevo turno en tu agenda. A continuación, los detalles:",
    clientInfo: "Información del cliente:",
    meetLink: "Enlace para la sesión:",
    meetNote: "Te recomendamos conectarte unos minutos antes del horario acordado.",
    cancelTitle: "Turno cancelado",
    cancelMsg: "❌ Turno cancelado: Te informamos que uno de tus turnos ha sido cancelado.",
    cancelDetails: "Estos son los detalles del turno cancelado:",
    slotAvailable: "Este horario ahora vuelve a estar disponible en tu agenda.",
    thanks: "Gracias por usar nuestra plataforma.",
    date: "Fecha",
    time: "Hora",
    service: "Servicio",
    mode: "Modalidad",
    address: "Dirección",
    name: "Nombre",
    email: "Email",
    phone: "Teléfono",
    client: "Cliente",
  },
  en: {
    noReply: "This is an automated message. Please do not reply to this email.",
    hello: "Hello",
    pendingTitle: "New pending appointment",
    pendingMsg: "A new appointment request is pending confirmation.",
    pendingDetails: "Appointment details:",
    clientData: "Client details:",
    depositMsg: "This appointment requires a deposit of",
    depositNote: "to be confirmed. We recommend contacting the client to arrange payment.",
    thankYou: "Thank you for using our platform!",
    confirmedTitle: "New confirmed appointment",
    confirmedMsg: "A new appointment has been confirmed in your schedule. Details below:",
    clientInfo: "Client information:",
    meetLink: "Session link:",
    meetNote: "We recommend joining a few minutes before the scheduled time.",
    cancelTitle: "Appointment cancelled",
    cancelMsg: "❌ Appointment cancelled: One of your appointments has been cancelled.",
    cancelDetails: "Here are the details of the cancelled appointment:",
    slotAvailable: "This time slot is now available in your schedule.",
    thanks: "Thank you for using our platform.",
    date: "Date",
    time: "Time",
    service: "Service",
    mode: "Mode",
    address: "Address",
    name: "Name",
    email: "Email",
    phone: "Phone",
    client: "Client",
  }
};

const generateProfPendingApptTemplate = ({
  nombreCliente,
  emailCliente,
  phoneCliente,
  diaTurno,
  horaTurno,
  profesionalName,
  servicio,
  depositoInicial,
  serviceType,
  address,
  lang = 'en'
}) => {
  const t = translationsProf[lang];
  const modalidadIcon = serviceType === 'Virtual' ? '💻' : '🏢';
  const addressItem = address
    ? `<li>📍 <strong>${t.address}:</strong> ${address}</li>`
    : '';

  return `
  <!DOCTYPE html>
  <html lang="${lang}">
    <head><meta charset="UTF-8" /><title>${t.pendingTitle}</title></head>
    <body style="font-family: Arial, sans-serif; background: #f9f9f9; padding: 20px;">
      <div style="background: #fff; padding: 20px; border-radius: 8px;">
        <p style="color: #888; font-size: 14px;">${t.noReply}</p>
        <h2>${t.hello} ${profesionalName}!</h2>
        <p>${t.pendingMsg}</p>
        <p>${t.pendingDetails}</p>
        <ul style="list-style: none; padding-left: 0; font-size: 16px;">
          <li>📆 <strong>${t.date}:</strong> ${diaTurno}</li>
          <li>🕜 <strong>${t.time}:</strong> ${horaTurno} hs</li>
          <li>🛎 <strong>${t.service}:</strong> ${servicio}</li>
          <li>${modalidadIcon} <strong>${t.mode}:</strong> ${serviceType}</li>
          ${addressItem}
        </ul>
        <p><strong>${t.clientData}</strong></p>
        <ul style="list-style: none; padding-left: 0; font-size: 16px;">
          <li>👤 <strong>${t.name}:</strong> ${nombreCliente}</li>
          <li>📧 <strong>${t.email}:</strong> ${emailCliente}</li>
          <li>📞 <strong>${t.phone}:</strong> ${phoneCliente}</li>
        </ul>
        <p>${t.depositMsg} <strong>${depositoInicial}</strong> ${t.depositNote}</p>
        <p>${t.thankYou}</p>
      </div>
    </body>
  </html>`;
};

const generateProfApptTemplate = ({
  nombreCliente,
  emailCliente,
  phoneCliente,
  diaTurno,
  horaTurno,
  profesionalName,
  servicio,
  depositoInicial,
  serviceType,
  address,
  meetLink,
  lang = 'en'
}) => {
  const t = translationsProf[lang];
  const modalidadIcon = serviceType === 'Virtual' ? '💻' : '🏢';
  const addressItem = address
    ? `<li>📍 <strong>${t.address}:</strong> ${address}</li>`
    : '';
  const meetLinkItem = meetLink
    ? `<p>🔗 <strong>${t.meetLink}</strong><br />
         <a href="${meetLink}" target="_blank" style="color: #3367d6;">${meetLink}</a>
       </p>
       <p style="margin-top: 0;">${t.meetNote}</p>`
    : '';

  return `
  <!DOCTYPE html>
  <html lang="${lang}">
    <head>
      <meta charset="UTF-8" />
      <title>${t.confirmedTitle}</title>
    </head>
    <body style="font-family: Arial, sans-serif; background: #f9f9f9; padding: 20px;">
      <div style="background: #fff; padding: 20px; border-radius: 8px;">
        <p style="color: #888; font-size: 14px;">${t.noReply}</p>
        <h2>${t.hello} ${profesionalName}!</h2>
        <p>${t.confirmedMsg}</p>
        <ul style="list-style: none; padding-left: 0; font-size: 16px;">
          <li>📆 <strong>${t.date}:</strong> ${diaTurno}</li>
          <li>🕜 <strong>${t.time}:</strong> ${horaTurno} hs</li>
          <li>🛎 <strong>${t.service}:</strong> ${servicio}</li>
          <li>${modalidadIcon} <strong>${t.mode}:</strong> ${serviceType}</li>
          ${addressItem}
        </ul>
        <p><strong>${t.clientInfo}</strong></p>
        <ul style="list-style: none; padding-left: 0; font-size: 16px;">
          <li>👤 <strong>${t.name}:</strong> ${nombreCliente}</li>
          <li>📧 <strong>${t.email}:</strong> ${emailCliente}</li>
          <li>📞 <strong>${t.phone}:</strong> ${phoneCliente}</li>
        </ul>
        ${meetLinkItem}
        <p style="margin-top: 20px;">${t.thankYou}</p>
      </div>
    </body>
  </html>`;
};

const generateCancelAppointmentProfTemplate = ({
  nombreCliente,
  diaTurno,
  horaTurno,
  profesionalName,
  servicio,
  serviceType,
  emailCliente,
  phoneCliente,
  lang = 'en'
}) => {
  const t = translationsProf[lang];
  const modalidadIcon = serviceType === 'Virtual' ? '💻' : '🏢';

  return `
  <!DOCTYPE html>
  <html lang="${lang}">
    <head>
      <meta charset="UTF-8" />
      <title>${t.cancelTitle}</title>
    </head>
    <body style="font-family: Arial, sans-serif; background: #f9f9f9; padding: 20px;">
      <div style="background: #fff; padding: 20px; border-radius: 8px;">
        <p style="color: #888; font-size: 14px;">${t.noReply}</p>
        <h2>${t.hello} ${profesionalName}!</h2>
        <p><strong>${t.cancelMsg}</strong></p>
        <p>${t.cancelDetails}</p>
        <ul style="list-style: none; padding-left: 0; font-size: 16px;">
          <li>📆 <strong>${t.date}:</strong> ${diaTurno}</li>
          <li>🕜 <strong>${t.time}:</strong> ${horaTurno}</li>
          <li>🛎 <strong>${t.service}:</strong> ${servicio}</li>
          <li>${modalidadIcon} <strong>${t.mode}:</strong> ${serviceType}</li>
          <li>👤 <strong>${t.client}:</strong> ${nombreCliente}</li>
        </ul>
        <p><strong>${t.clientInfo}</strong></p>
        <ul style="list-style: none; padding-left: 0; font-size: 16px;">
          <li>👤 <strong>${t.name}:</strong> ${nombreCliente}</li>
          <li>📧 <strong>${t.email}:</strong> ${emailCliente}</li>
          <li>📞 <strong>${t.phone}:</strong> ${phoneCliente}</li>
        </ul>
        <p style="margin-top: 20px;">${t.slotAvailable}</p>
        <p>${t.thanks}</p>
      </div>
    </body>
  </html>`;
};

module.exports = {
  generateProfPendingApptTemplate,
  generateProfApptTemplate,
  generateCancelAppointmentProfTemplate
}