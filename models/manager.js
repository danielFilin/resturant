const mongoose = require('mongoose');
const uniqeuValidator = require('mongoose-unique-validator');

const Schema = mongoose.Schema;

const managerSchema = Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  }
});

managerSchema.plugin(uniqeuValidator);

module.exports = mongoose.model('Manager', managerSchema);
