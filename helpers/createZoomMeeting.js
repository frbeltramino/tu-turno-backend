const axios = require("axios");
const qs = require('qs');

const client_id = process.env.ZOOM_CLIENT_ID;
const client_secret = process.env.ZOOM_CLIENT_SECRET;
const account_id = process.env.ZOOM_ACCOUNT_ID;


const getZoomAccessToken = async () => {
  const tokenUrl = 'https://zoom.us/oauth/token';
  const basicAuth = Buffer.from(`${client_id}:${client_secret}`).toString('base64');

  try {
    const response = await axios.post(
      `${tokenUrl}?grant_type=account_credentials&account_id=${account_id}`,
      qs.stringify({}),
      {
        headers: {
          Authorization: `Basic ${basicAuth}`,
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }
    );

    const { access_token } = response.data;
    console.log('✅ Token obtenido:', access_token);
    return access_token;

  } catch (err) {
    console.error('❌ Error al obtener token:', err.response?.data || err.message);
  }
};

const createZoomMeeting = async (tituloReunion, horaInicio, duracion) => {

  const token = await getZoomAccessToken();

  const response = await axios.post(
    "https://api.zoom.us/v2/users/me/meetings",
    {
      topic: tituloReunion || "Turno virtual",
      type: 2, // reunión programada
      start_time: horaInicio, // formato ISO8601
      duration: duracion, // minutos
      timezone: "America/Argentina/Buenos_Aires",
      settings: {
        join_before_host: false,
        approval_type: 0,
        registration_type: 1,
        enforce_login: false,
        waiting_room: true,
      },
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );

  const joinUrl = response.data.join_url;
  console.log("🔗 Zoom link:", joinUrl);
  return joinUrl;
};


module.exports = {
  createZoomMeeting
}