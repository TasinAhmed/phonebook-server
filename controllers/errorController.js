/* eslint-disable */
const errorController = (error, req, res, next) => {
  // responding to client
  res.status(error.status || 500)
  res.json({
    error: {
      message: error.message,
      type: error.type,
    },
  })
}
/* eslint-enable */

module.exports = errorController
