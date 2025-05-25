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
  address
}) => {
  const modalidadIcon = serviceType === 'Virtual' ? '💻' : '🏢';
  const addressItem = address
    ? `<li>📍 <strong>Dirección:</strong> ${address}</li>`
    : '';

  return `
  <!DOCTYPE html>
  <html lang="es">
    <head><meta charset="UTF-8" /><title>Nuevo turno pendiente</title></head>
    <body style="font-family: Arial, sans-serif; background: #f9f9f9; padding: 20px;">
      <div style="background: #fff; padding: 20px; border-radius: 8px;">
        <p style="color: #888; font-size: 14px;">Este es un mensaje automático. Por favor, no respondas a este correo.</p>
        <h2>¡Hola ${profesionalName}!</h2>
        <p>Se ha generado una nueva <strong>solicitud de turno pendiente de confirmación</strong>.</p>
        <p>Detalles del turno:</p>
        <ul style="list-style: none; padding-left: 0; font-size: 16px;">
          <li>📆 <strong>Fecha:</strong> ${diaTurno}</li>
          <li>🕜 <strong>Hora:</strong> ${horaTurno} hs</li>
          <li>🛎 <strong>Servicio:</strong> ${servicio}</li>
          <li>${modalidadIcon} <strong>Modalidad:</strong> ${serviceType}</li>
          ${addressItem}
        </ul>
        <p><strong>Datos del cliente:</strong></p>
        <ul style="list-style: none; padding-left: 0; font-size: 16px;">
          <li>👤 <strong>Nombre:</strong> ${nombreCliente}</li>
          <li>📧 <strong>Email:</strong> ${emailCliente}</li>
          <li>📞 <strong>Teléfono:</strong> ${phoneCliente}</li>
        </ul>
        <p>Este turno requiere una seña de <strong>${depositoInicial}</strong> para confirmarse. Te recomendamos comunicarte con el cliente para coordinar el pago.</p>
        <p>¡Gracias por usar nuestra plataforma!</p>
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
  meetLink
}) => {
  const modalidadIcon = serviceType === 'Virtual' ? '💻' : '🏢';
  const addressItem = address
    ? `<li>📍 <strong>Dirección:</strong> ${address}</li>`
    : '';
  const meetLinkItem = meetLink
    ? `<p>🔗 <strong>Enlace para la sesión:</strong><br />
         <a href="${meetLink}" target="_blank" style="color: #3367d6;">${meetLink}</a>
       </p>
       <p style="margin-top: 0;">Te recomendamos conectarte unos minutos antes del horario acordado.</p>`
    : '';

  return `
  <!DOCTYPE html>
  <html lang="es">
    <head>
      <meta charset="UTF-8" />
      <title>Nuevo turno confirmado</title>
    </head>
    <body style="font-family: Arial, sans-serif; background: #f9f9f9; padding: 20px;">
      <div style="background: #fff; padding: 20px; border-radius: 8px;">
        <p style="color: #888; font-size: 14px;">Este es un mensaje automático. Por favor, no respondas a este correo.</p>
        <h2>¡Hola ${profesionalName}!</h2>
        <p>Se ha confirmado un nuevo turno en tu agenda. A continuación, los detalles:</p>

        <ul style="list-style: none; padding-left: 0; font-size: 16px;">
          <li>📆 <strong>Fecha:</strong> ${diaTurno}</li>
          <li>🕜 <strong>Hora:</strong> ${horaTurno} hs</li>
          <li>🛎 <strong>Servicio:</strong> ${servicio}</li>
          <li>${modalidadIcon} <strong>Modalidad:</strong> ${serviceType}</li>
          ${addressItem}
        </ul>

        <p><strong>Información del cliente:</strong></p>
        <ul style="list-style: none; padding-left: 0; font-size: 16px;">
          <li>👤 <strong>Nombre:</strong> ${nombreCliente}</li>
          <li>📧 <strong>Email:</strong> ${emailCliente}</li>
          <li>📞 <strong>Teléfono:</strong> ${phoneCliente}</li>
        </ul>

        ${meetLinkItem}

        <p style="margin-top: 20px;">¡Gracias por formar parte de nuestra comunidad!</p>
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
  phoneCliente
}) => {
  const modalidadIcon = serviceType === 'Virtual' ? '💻' : '🏢';

  return `
  <!DOCTYPE html>
  <html lang="es">
    <head>
      <meta charset="UTF-8" />
      <title>Turno cancelado</title>
    </head>
    <body style="font-family: Arial, sans-serif; background: #f9f9f9; padding: 20px;">
      <div style="background: #fff; padding: 20px; border-radius: 8px;">
        <p style="color: #888; font-size: 14px;">Este es un mensaje automático. Por favor, no respondas a este correo.</p>
        <h2>¡Hola ${profesionalName}!</h2>
        <p><strong>❌ Turno cancelado:</strong> Te informamos que uno de tus turnos ha sido cancelado.</p>
        <p>Estos son los detalles del turno cancelado:</p>

        <ul style="list-style: none; padding-left: 0; font-size: 16px;">
          <li>📆 <strong>Fecha:</strong> ${diaTurno}</li>
          <li>🕜 <strong>Hora:</strong> ${horaTurno}</li>
          <li>🛎 <strong>Servicio:</strong> ${servicio}</li>
          <li>${modalidadIcon} <strong>Modalidad:</strong> ${serviceType}</li>
          <li>👤 <strong>Cliente:</strong> ${nombreCliente}</li>
        </ul>

         <p><strong>Información del cliente:</strong></p>
        <ul style="list-style: none; padding-left: 0; font-size: 16px;">
          <li>👤 <strong>Nombre:</strong> ${nombreCliente}</li>
          <li>📧 <strong>Email:</strong> ${emailCliente}</li>
          <li>📞 <strong>Teléfono:</strong> ${phoneCliente}</li>
        </ul>

        <p style="margin-top: 20px;">Este horario ahora vuelve a estar disponible en tu agenda.</p>
        <p>Gracias por usar nuestra plataforma.</p>
      </div>
    </body>
  </html>`;
};

module.exports = {
  generateProfPendingApptTemplate,
  generateProfApptTemplate,
  generateCancelAppointmentProfTemplate
}