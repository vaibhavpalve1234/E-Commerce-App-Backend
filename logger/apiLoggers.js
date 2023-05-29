const winston =  require('winston');
const {printf, timestamp, label, combine} = winston.format;
require('winston-daily-rotate-file');

const myFormat = printf(({level, message, label, timestamp})=>{
    return `${timestamp} [${level}]: ${message}`
})

const timeZoned = ()=>{
    return new Date().toLocaleDateString('en-IN',{
        timeZone:'Asia/Kolkata'
    })
}

const transport = new winston.transports.DailyRotateFile({
    filename:'public/logger/application_%DATE%.log',
    datePattern:'YYYY_MM_DD',
    maxSize:'20m',
    maxFiles:'14d'
})
const apiLogger = () => {
    return winston.createLogger({
        level: 'info',
        format: combine(label({label:'Error'}), timestamp({format:timeZoned}), myFormat),
        //defaultMeta: { service: 'user-service' },
        transports: [transport],
    })
  };


module.exports = apiLogger