require('dotenv').config({path: `config/.env.${process.env.NODE_ENV}`});
const express = require('express');
const path = require('node:path');
const cors = require('cors');
const connectDB = require('../connection/mongodb_connect');
const { notFound, errorHandler } = require('../until/errorhandler');
const bodyParser = require('body-parser');
const logger = require('../logger');
const sendMail = require('../until/sendMail');
const port = process.env.SERVER_PORT || 3000;
const app = express();

app.use(cors());
app.use(notFound)
app.use(errorHandler)
app.use(bodyParser.json({}))
// app.use(bodyParser.urlencoded({ limit: '20mb', extended: false }));


app.listen(port, async() =>{
    try {
        await connectDB()
        logger.warn(`started server ${port}`);
        console.log(`started server ${port}`)
    } catch (err) {
        console.log(`Error : ${err.Error}`);
        logger.warn(`ERROR IN SERVER: ${err.Error}`)
    }
})
