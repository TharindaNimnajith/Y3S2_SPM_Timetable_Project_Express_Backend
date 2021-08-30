const HttpError = require('../models/http-errors')
const Tags = require('../models/tags.model')

const createTags = async (req, res, next) => {
  const {name, tagToken} = req.body

  const TagsItem = new Tags({
    name,
    tagToken
  })

  try {
    await TagsItem.save()
  } catch (err) {
    const error = new HttpError('Adding failed, please try again.', 500)
    res.json({message: 'Adding failed, please try again.', added: 0})
    return next(error)
  }

  res.status(201).json({
    tagsItem: TagsItem.toObject({getters: true}),
    message: 'Added Successfully',
    added: 1
  })
}

const getTags = async (req, res, next) => {
  Tags.find({})
    .then((tags) =>
      res.json({tags: tags, message: 'got results'})
    )
    .catch((err) => res.status(400).json('Error: ' + err))
}

const editTags = async (req, res, next) => {
  const {tags, id} = req.body
  const query = {'_id': id}
  Tags.findOneAndUpdate(query, tags, {upsert: true}, (err, item) => {
    if (err) return res.send(500, {error: err})
    return res.json({tags: item, message: 'got results'})
  })
}

const deleteTags = async (req, res, next) => {
  const {id} = req.body
  Tags.findByIdAndDelete((id), {}, (err, item) => {
    if (err) return res.status(500).send(err)
  })
}

const getTag = async (req, res, next) => {
  let tag

  const {
    id
  } = req.params

  try {
    tag = await Tags.findById(id)
  } catch (error) {
    console.log(error)
    return next(new HttpError('Unexpected internal server error occurred, please try again later.', 500))
  }

  res.status(200).send(tag)
}

exports.createTags = createTags
exports.editTags = editTags
exports.getTags = getTags
exports.getTag = getTag
exports.deleteTags = deleteTags

