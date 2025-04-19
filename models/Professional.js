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
  working_hours: { type: WorkingHoursSchema, required: true }
}, { _id: false });

const ProfessionalSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String },
  working_days: [WorkingDaySchema],
  holidays: [{ type: String }]  // Fechas en formato 'YYYY-MM-DD'
});

module.exports = mongoose.model('Professional', ProfessionalSchema);