require('dotenv').config({path: `config/.env.${process.env.NODE_ENV}`});
const express = require('express');
const cors = require('cors');
const connectDB = require('../connection/mongodb_connect');
const bodyParser = require('body-parser');
const logger = require('../logger');
const AuthRouter = require('../router/user');
const { notFound, errorHandler } = require('../until/errorhandler');
const port = process.env.SERVER_PORT || 3000;
const app = express();

app.use(cors());
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ limit: '20mb', extended: false }));
app.use('/api/v1', AuthRouter)

app.use(notFound)
app.use(errorHandler)
app.listen(port, async() =>{
    try {
        await connectDB()
        console.log(`started server ${port}`)
    } catch (err) {
        console.log(`Error : ${err.Error}`);
        logger.warn(`ERROR IN SERVER: ${err.Error}`)
    }
})
require('../until/cronJob')