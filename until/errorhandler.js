const logger = require("../logger")


const notFound = (req, res, next) => {
    const error = new Error(`Not Found - ${req.originalUrl}`)
    logger.warn(`Not Found - ${req.originalUrl}`)
    res.status(404)
    next(error)
  }
  
  const errorHandler = (err, req, res, next) => {
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode
    logger.warn(`errorHandler Founder - ${err.message}`)
    res.status(statusCode).json({
      message: err.message,
      stack: process.env.NODE_ENV === 'production' ? null : err.stack,
    })
  }

module.exports = {notFound, errorHandler}