const unknownRouteController = (req, res, next) => {
  const err = new Error('Unknown endpoint')
  err.status = 404
  next(err)
}

module.exports = unknownRouteController
