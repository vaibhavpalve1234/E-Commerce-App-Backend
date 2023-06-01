require('dotenv').config({path: `config/.env.${process.env.NODE_ENV}`});
const express = require('express');
const path =require('path')
const ejs = require('ejs')
const cors = require('cors');
const connectDB = require('../connection/mongodb_connect');
const bodyParser = require('body-parser');
const logger = require('../logger');
const AuthRouter = require('../router/user');
const PaymentRouter = require('../router/paytm');
const FeedbackRouter = require('../router/feedback')
const Razorpay = require('../router/razorpay');
const { notFound, errorHandler } = require('../utils/errorhandler');
const port = process.env.SERVER_PORT || 3000;

const app = express();
app.use(cors());
app.engine('html', require('ejs').renderFile)
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, '../controller/paytmController/views'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ limit: '20mb', extended: false }));

app.get("/", async(req, res) =>{
    try {
        console.log(req)
        res.send("server started you can check all apis 🍔❤️😁😁")
    } catch (err) {
        console.log(`Error : ${err.Error}`);
        logger.warn(`ERROR IN SERVER: ${err.Error}`)
    }
})

app.use('/api/v1', AuthRouter)
app.use('/api/v1', PaymentRouter)
app.use('/api/v1', Razorpay)
app.use('/api/v1', FeedbackRouter)

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
require('../utils/cronJob')