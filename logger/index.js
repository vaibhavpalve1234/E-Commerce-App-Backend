const winston =  require('winston');
const { localDateString } = require('../until/dateFormate');
const apiLogger = require("./apiLoggers");

let logger;

if (process.env.NODE_ENV !== 'production') {
    logger = apiLogger()
    if (logger) {
        const logs = () => {
            try {
                return `application_${localDateString()}.log`
            } catch (error) {
                console.warn(error)
            }
        }
        logs()
    }
}

module.exports = logger