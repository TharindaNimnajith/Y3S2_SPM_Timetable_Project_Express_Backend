const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const Schema = mongoose.Schema

const ProgramSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  programToken: {
    type: String,
    required: true,
    unique: true,
    trim: true
  }
}, {
  timestamps: true,
  collection: 'Programs'
})

ProgramSchema.plugin(uniqueValidator)

module.exports = mongoose.model('Programs', ProgramSchema)
