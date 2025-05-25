const moment = require('moment');
require('moment/locale/es'); 
moment.locale('es');



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

const formatDate = (fechaISO) => {
  return moment(fechaISO).format('D [de] MMMM [de] YYYY');
};

module.exports = {
  isDate,
  formatDate
}
