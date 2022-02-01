let person = require('../models/person')

exports.getAll = (req, res, next) => {
  person
    .find({})
    .then((result) => res.json(result))
    .catch((err) => {
      return next(err)
    })
}

exports.get = (req, res, next) => {
  const id = req.params.id
  person
    .findById(id)
    .then((result) => res.json(result))
    .catch((err) => {
      return next(err)
    })
}

exports.delete = (req, res, next) => {
  const id = req.params.id

  person
    .findByIdAndRemove(id)
    .then((result) => {
      res.json(result)
    })
    .catch((err) => {
      console.log(err)
      return next(err)
    })
}

exports.post = (req, res, next) => {
  const { name, number } = req.body

  if (!name || !number) {
    const err = new Error('The name or number is missing')
    err.status = 404
    return next(err)
  }

  const newPerson = new person({
    name,
    number,
    nameSearch: name.toLowerCase(),
  })

  newPerson
    .save()
    .then((result) => {
      res.json(result)
    })
    .catch((err) => {
      if (err.code === 11000) {
        err.type = 'duplicate'
      }
      return next(err)
    })
}

exports.put = (req, res, next) => {
  const id = req.params.id
  const { name, number } = req.body

  if (!name || !number || !id) {
    const err = new Error('The name, number, or id is missing')
    err.status = 404
    return next(err)
  }

  person
    .findByIdAndUpdate(id, { name, number, nameSearch: name.toLowerCase() })
    .then((result) => {
      res.json(result)
    })
    .catch((err) => {
      return next(err)
    })
}
