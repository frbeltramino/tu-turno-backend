const mongoose = require('mongoose');

const TimeRangeSchema = new mongoose.Schema({
  start: { type: String }, // No se requiere si no trabaja en ese turno
  end: { type: String }
}, { _id: false });

const WorkingHoursSchema = new mongoose.Schema({
  am: { type: TimeRangeSchema, default: {} },
  pm: { type: TimeRangeSchema, default: {} }
}, { _id: false });

const WorkingDaySchema = new mongoose.Schema({
  day: { type: String, required: true },
  index_day: { type: Number, required: true },
  working_hours: { type: WorkingHoursSchema, required: true }
}, { _id: false });

const ProfessionalSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String },
  working_days: [WorkingDaySchema],
  holidays: [{ type: String }], // Fechas en formato 'YYYY-MM-DD'
  phone: { type: String },
  email: { type: String },
  bank_account_cbu: { type: String },
  bank_account_alias: { type: String },
  bank_account_titular: { type: String },
});

module.exports = mongoose.model('Professional', ProfessionalSchema);