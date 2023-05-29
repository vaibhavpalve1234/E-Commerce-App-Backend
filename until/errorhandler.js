const logger = require("../logger")


const notFound = (message) => {
    const error = new Error(`Not Found `)
    logger.warn(`Not Found${message}`)
    res.status(404).send({msg:message, error})
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