const mongoose = require('mongoose');

const RecordSchema = mongoose.Schema({
  fio: {
    type: String,
    required: true,
  },
  tel: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
});

const Records = mongoose.model('Record', RecordSchema);

module.exports = Records;
