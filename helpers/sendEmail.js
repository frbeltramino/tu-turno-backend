const nodemailer = require('nodemailer');

// Transporter con Gmail (puede cambiar según el proveedor)
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_NEGOCIO,
    pass: process.env.EMAIL_NEGOCIO_PASSWORD,
  },
});

// Función para enviar correo
const sendAppointmentEmail = async (to, subject, htmlContent) => {
  const nombreNegocio = `"${process.env.NOMBRE_NEGOCIO}" <${process.env.EMAIL_NEGOCIO}>`;
  const mailOptions = {
    from: nombreNegocio,
    to: to, // destinatario
    subject,
    html: htmlContent,
  };

  await transporter.sendMail(mailOptions);
};

module.exports = {
  sendAppointmentEmail,
};