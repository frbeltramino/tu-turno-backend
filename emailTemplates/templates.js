
const generateApptTemplate = ({
  nombreCliente,
  diaTurno,
  horaTurno,
  profesionalName,
  servicio,
  serviceType,
  address,
  meetLink
  }) => {
    const modalidadIcon = serviceType === 'Virtual' ? '💻' : '🏢'; // ícono condicional
    const addressItem = address
      ? `<li>📍 <strong>Dirección:</strong> ${address}</li>`
      : '';
    const meetLinkItem = meetLink ? 
      ` <p>🔗 <strong>Enlace para unirse:</strong><br />
      <a href="${meetLink}" target="_blank" style="color: #3367d6;">${meetLink}</a></p>
      <p>Te recomendamos conectarte 5 minutos antes del horario pactado. ¡Nos vemos pronto!</p>` : '';

    return `
  <!DOCTYPE html>
  <html lang="es">
    <head><meta charset="UTF-8" /><title>Confirmación de Turno</title></head>
    <body style="font-family: Arial, sans-serif; background: #f9f9f9; padding: 20px;">
      <div style="background: #fff; padding: 20px; border-radius: 8px;">
        <p style="color: #888; font-size: 14px;">Por favor, no respondas a este correo. Es automático.</p>
        <h2>¡Hola ${nombreCliente}!</h2>
        <p>Estos son los detalles de tu turno:</p>
        <ul style="list-style: none; padding-left: 0; font-size: 16px;">
          <li>📆 <strong>Fecha:</strong> ${diaTurno}</li>
          <li>🕜 <strong>Hora:</strong> ${horaTurno} hs</li>
          <li>🎓 <strong>Profesional:</strong> ${profesionalName}</li>
          <li>🛎 <strong>Servicio:</strong> ${servicio}</li>
          <li>${modalidadIcon} <strong>Modalidad:</strong> ${serviceType}</li>
          ${addressItem}
        </ul>
        ${meetLinkItem}
      </div>
    </body>
  </html>`;
  };


const generatePendingApptTemplate = ({ nombreCliente, diaTurno, horaTurno, profesionalName, servicio, depositoInicial, profesionalPhone, serviceType, address }) => {
  const modalidadIcon = serviceType === 'Virtual' ? '💻' : '🏢'; // ícono condicional
  const addressItem = address
      ? `<li>📍 <strong>Dirección:</strong> ${address}</li>`
      : '';
  
  return `
  <!DOCTYPE html>
  <html lang="es">
    <head><meta charset="UTF-8" /><title>Solicitud de Turno</title></head>
    <body style="font-family: Arial, sans-serif; background: #f9f9f9; padding: 20px;">
      <div style="background: #fff; padding: 20px; border-radius: 8px;">
        <p style="color: #888; font-size: 14px;">Este es un mensaje automático. Por favor, no respondas a este correo.</p>
        <h2>¡Hola ${nombreCliente}!</h2>
        <p>Hemos recibido tu solicitud de turno. Para confirmarlo, es necesario abonar una seña inicial de <strong>${depositoInicial}</strong>.</p>
        <p>A continuación te compartimos los detalles de tu reserva:</p>
        <ul style="list-style: none; padding-left: 0; font-size: 16px;">
          <li>📆 <strong>Fecha:</strong> ${diaTurno}</li>
          <li>🕜 <strong>Hora:</strong> ${horaTurno} hs</li>
          <li>🎓 <strong>Profesional:</strong> ${profesionalName}</li>
          <li>🛎 <strong>Servicio:</strong> ${servicio}</li>
          <li>${modalidadIcon} <strong>Modalidad:</strong> ${serviceType}</li>
          ${addressItem}
        </ul>
        <p>Para realizar el pago de la seña y confirmar tu turno, por favor contactate con tu profesional al siguiente número:</p>
        <p><strong>${profesionalPhone}</strong></p>
        <p>¡Gracias por elegirnos!</p>
      </div>
    </body>
  </html>`
};

const generateAcceptApptTemplate = ({ nombreCliente, diaTurno, horaTurno, profesionalName, servicio }) => `
<!DOCTYPE html>
<html lang="es">
  <head><meta charset="UTF-8" /><title>Confirmación de Turno</title></head>
  <body style="font-family: Arial, sans-serif; background: #f9f9f9; padding: 20px;">
    <div style="background: #fff; padding: 20px; border-radius: 8px;">
      <p style="color: #888; font-size: 14px;">Por favor, no respondas a este correo. Es automático.</p>
      <h2>¡Hola ${nombreCliente}!</h2>
      <p>Estos son los detalles de tu turno:</p>
      <ul style="list-style: none; padding-left: 0; font-size: 16px;">
        <li>📆 <strong>Fecha:</strong> ${diaTurno}</li>
        <li>🕜 <strong>Hora:</strong> ${horaTurno}</li>
        <li>🎓 <strong>Profesional:</strong> ${profesionalName}</li>
        <li>🛎 <strong>Servicio:</strong> ${servicio}</li>
        <li>💻 <strong>Modalidad:</strong> Presencial</li>
      </ul>
    </div>
  </body>
</html>`;

const generateCancelAppointmentTemplate = ({ nombreCliente, diaTurno, horaTurno, profesionalName, servicio, serviceType }) => `
<!DOCTYPE html>
<html lang="es">
  <head><meta charset="UTF-8" /><title>Cancelación de Turno</title></head>
  <body style="font-family: Arial, sans-serif; background: #f9f9f9; padding: 20px;">
    <div style="background: #fff; padding: 20px; border-radius: 8px;">
      <p style="color: #888; font-size: 14px;">Por favor, no respondas a este correo. Es automático.</p>
      <h2>¡Hola ${nombreCliente}!</h2>
      <p>❌ Tu turno ha sido cancelado.</p>
      <ul style="list-style: none; padding-left: 0; font-size: 16px;">
        <li>📆 <strong>Fecha:</strong> ${diaTurno}</li>
        <li>🕜 <strong>Hora:</strong> ${horaTurno}</li>
        <li>🎓 <strong>Profesional:</strong> ${profesionalName}</li>
        <li>🛎 <strong>Servicio:</strong> ${servicio}</li>
        <li>💻 <strong>Modalidad:</strong> ${serviceType}</li>
      </ul>
    </div>
  </body>
</html>`;

module.exports = {
  generatePendingApptTemplate,
  generateAcceptApptTemplate,
  generateCancelAppointmentTemplate,
  generateApptTemplate
}