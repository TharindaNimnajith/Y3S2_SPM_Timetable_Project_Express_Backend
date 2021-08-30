const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const Schema = mongoose.Schema

const CentersSchema = new Schema({
  centerName: {
    type: String,
    required: true,
    unique: true,
    trim: true
  }
}, {
  timestamps: true,
  collection: 'Centers'
})

CentersSchema.plugin(uniqueValidator)

module.exports = mongoose.model('Centers', CentersSchema)
