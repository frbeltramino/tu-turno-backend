const nodemailer = require('nodemailer');

// Transporter con Gmail (puede cambiar según el proveedor)
const transporter = nodemailer.createTransport({
  service: 'SendGrid', 
  auth: {
    user: 'apikey', 
    pass: process.env.SENDGRID_API_KEY,
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

// Función para enviar correo
const sendOTPEmail = async (to, subject, htmlContent) => {
  const nombreNegocio = `"${process.env.NOMBRE_NEGOCIO}" <${process.env.EMAIL_NEGOCIO}>`;
  const mailOptions = {
    from: nombreNegocio,
    to: to,
    subject,
    html: htmlContent,
  };

  await transporter.sendMail(mailOptions);
};

module.exports = {
  sendAppointmentEmail,
  sendOTPEmail
};