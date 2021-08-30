const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const Schema = mongoose.Schema

const SubGroupNumSchema = new Schema({
  subGroupNum: {
    type: Number,
    required: true,
    unique: true,
    trim: true
  }
}, {
  timestamps: true,
  collection: 'SubGroupNum'
})

SubGroupNumSchema.plugin(uniqueValidator)

module.exports = mongoose.model('SubGroupNum', SubGroupNumSchema)
