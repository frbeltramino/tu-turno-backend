const i18n = require('i18n');
const path = require('path');

i18n.configure({
  locales: ['en', 'es'],
  directory: path.join(__dirname, 'locales'), // Carpeta donde están tus JSON de traducciones
  defaultLocale: 'es',
  queryParameter: 'lang', // Permite cambiar idioma con ?lang=es
  objectNotation: false,   // Permite usar claves anidadas con puntos
  autoReload: true,       // Recarga si cambias los JSON
  updateFiles: false      // No crea traducciones vacías automáticamente
});

module.exports = i18n;