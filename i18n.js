const i18n = require('i18n');
const path = require('path');
const moment = require('moment');

// importar locales que vayas a usar
require('moment/locale/es');
require('moment/locale/en-gb');

i18n.configure({
  locales: ['en', 'es'],
  directory: path.join(__dirname, 'locales'),
  defaultLocale: 'es',
  queryParameter: 'lang',
  objectNotation: false,
  autoReload: true,
  updateFiles: false
});

// función para sincronizar moment con i18n
i18n.setLocaleAndMoment = (locale) => {
  i18n.setLocale(locale);
  moment.locale(locale);
};

// exportamos **tanto i18n como moment**
module.exports = { i18n, moment };