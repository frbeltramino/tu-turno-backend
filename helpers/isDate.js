const moment = require('moment');
require('moment/locale/es');


const isDate = (value ) => {
  if (!value){
    return false;
  }
  const date = moment(value);
  if (!date.isValid()){
    return false;
  }else{
    return true;
  }
}

const formatDate = (fecha, lang = 'es') => {
  if (!fecha) return '--'; 

  moment.locale(lang);
  
  const format = lang === 'es'
    ? 'dddd D [de] MMMM [de] YYYY'
    : 'dddd, MMMM D, YYYY';

  return moment(fecha).format(format);
};

module.exports = {
  isDate,
  formatDate
}
