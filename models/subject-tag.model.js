const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const Schema = mongoose.Schema

const SubjectTagsSchema = new Schema({
  subjectRef: {
    type: String,
    required: true,
    unique: false,
    trim: true
  },
  tagRef: {
    type: String,
    required: true,
    unique: false,
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
  collection: 'SubjectTags'
})

SubjectTagsSchema.plugin(uniqueValidator)

module.exports = mongoose.model('SubjectTags', SubjectTagsSchema)
