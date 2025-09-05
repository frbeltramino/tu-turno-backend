const translationsOTP = { 
  es: {
    otpTile: "Código de verificación",
    noReply: "Este es un mensaje automático. Por favor, no respondas a este correo.",
    hello: "¡Hola",
    titleOTP: "Tu nuevo código de verificación",
    thankYou: "Gracias por usar nuestra aplicación."
  },
  en: {
    otpTile: "Verification code",
    noReply: "This is an automated message. Please do not reply to this email.",
    hello: "Hello",
    titleOTP: "Your new verification code",
    thankYou: "Thank you for using our app."
  }
};

const generateOTPTemplate = ({
  nombreCliente,
  OTP,
  lang = "en"
}) => {
  const t = translationsOTP[lang] || translationsOTP["en"];

  return `
  <!DOCTYPE html>
  <html lang="${lang}">
    <head>
      <meta charset="UTF-8" />
      <title>${t.titleOTP}</title>
    </head>
    <body style="font-family: Arial, sans-serif; background: #f4f4f4; padding: 20px;">
      <div style="background: #fff; padding: 20px; border-radius: 8px; max-width: 500px; margin: auto; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
        
        <h2 style="color: #333;">${t.hello} ${nombreCliente}!</h2>
        <p style="color: #555; font-size: 16px;">${t.titleOTP}</p>
        
        <div style="text-align: center; margin: 20px 0;">
          <span style="display: inline-block; font-size: 28px; font-weight: bold; letter-spacing: 4px; background: #f0f0f0; padding: 10px 20px; border-radius: 6px; color: #333;">
            ${OTP}
          </span>
        </div>
        
        <p style="color: #555; font-size: 16px;">${t.thankYou}</p>
        
        <hr style="margin: 20px 0; border: none; border-top: 1px solid #eee;" />
        
        <p style="color: #888; font-size: 14px;">${t.noReply}</p>
      </div>
    </body>
  </html>`;
};

const translationsRegisterOTP = { 
  es: {
    noReply: "Este es un mensaje automático. Por favor, no respondas a este correo.",
    hello: "¡Hola",
    titleOTP: "Tu código de verificación para registrarte",
    thankYou: "Gracias por registrarte en nuestra aplicación."
  },
  en: {
    noReply: "This is an automated message. Please do not reply to this email.",
    hello: "Hello",
    titleOTP: "Your registration verification code",
    thankYou: "Thank you for registering in our app."
  }
};

const generateRegisterOTPTemplate = ({
  nombreCliente,
  OTP,
  lang = "en"
}) => {
  const t = translationsRegisterOTP[lang] || translationsRegisterOTP["en"];

  return `
  <!DOCTYPE html>
  <html lang="${lang}">
    <head>
      <meta charset="UTF-8" />
      <title>${t.titleOTP}</title>
    </head>
    <body style="font-family: Arial, sans-serif; background: #f4f4f4; padding: 20px;">
      <div style="background: #fff; padding: 20px; border-radius: 8px; max-width: 500px; margin: auto; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
        
        <h2 style="color: #333;">${t.hello} ${nombreCliente}!</h2>
        <p style="color: #555; font-size: 16px;">${t.titleOTP}</p>
        
        <div style="text-align: center; margin: 20px 0;">
          <span style="display: inline-block; font-size: 28px; font-weight: bold; letter-spacing: 4px; background: #f0f0f0; padding: 10px 20px; border-radius: 6px; color: #333;">
            ${OTP}
          </span>
        </div>
        
        <p style="color: #555; font-size: 16px;">${t.thankYou}</p>
        
        <hr style="margin: 20px 0; border: none; border-top: 1px solid #eee;" />
        
        <p style="color: #888; font-size: 14px;">${t.noReply}</p>
      </div>
    </body>
  </html>`;
};

module.exports = {
  generateOTPTemplate,
  generateRegisterOTPTemplate
}