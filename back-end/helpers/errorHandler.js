module.exports.defaultError = (req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
}
module.exports.customError = (error, req, res, next) => {
  res.status(error.status || 500)
  res.json({
    error: error.message ? error.message : error
  })
}