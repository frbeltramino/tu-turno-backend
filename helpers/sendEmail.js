const sgMail = require("@sendgrid/mail");

// Configuro la API Key (guárdala en Railway como variable SENDGRID_API_KEY)
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendEmail = async (to, subject, html) => {
  try {
    const msg = {
      to,
      from: {
        email: process.env.EMAIL_NEGOCIO, 
        name: process.env.NOMBRE_NEGOCIO 
      },
      subject,
      html,
    };

    await sgMail.send(msg);
    console.log("📧 Email enviado correctamente");
  } catch (error) {
    console.error("❌ Error al enviar email:", error.response?.body || error);
    throw new Error("No se pudo enviar el correo");
  }
};

// Enviar correo para turno
const sendAppointmentEmail = async (to, subject, htmlContent) => {
  await sendEmail(to, subject, htmlContent);
};

// Enviar correo para OTP
const sendOTPEmail = async (to, subject, htmlContent) => {
  await sendEmail(to, subject, htmlContent);
};

module.exports = {
  sendAppointmentEmail,
  sendOTPEmail
};