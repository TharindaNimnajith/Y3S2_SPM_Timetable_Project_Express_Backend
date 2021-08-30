const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const Schema = mongoose.Schema

const TagsSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  tagToken: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  possibleRooms: [{
    roomRef: {
      type: String,
      required: false,
      unique: false,
      trim: true
    }
  }]
}, {
  timestamps: true,
  collection: 'Tags'
})

TagsSchema.plugin(uniqueValidator)

module.exports = mongoose.model('Tags', TagsSchema)
