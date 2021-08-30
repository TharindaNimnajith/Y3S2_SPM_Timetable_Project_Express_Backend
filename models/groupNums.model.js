const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const Schema = mongoose.Schema

const GroupNumSchema = new Schema({
  groupNum: {
    type: Number,
    required: true,
    unique: true,
    trim: true
  }
}, {
  timestamps: true,
  collection: 'GroupNum'
})

GroupNumSchema.plugin(uniqueValidator)

module.exports = mongoose.model('GroupNum', GroupNumSchema)
