'use strict'
require('dotenv').config({ path: `config/.env.${process.env.NODE_ENV}` })
const jwt = require('jsonwebtoken');
const logger = require('../logger');
const bcrypt = require('bcrypt');
const salt = bcrypt.genSaltSync(10)
module.exports = {
    generateAccessToken: (data) => {
        return jwt.sign( data, process.env.TOKEN_SECRET, { expiresIn: '15d'});
    },

    authenticateToken: (req, res, next) => {
        const authHeader = req.headers['authorization']
        const token = authHeader && authHeader.split(' ')[1]
        if (token == null) return res.sendStatus(401)
        jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
            if (err) return res.status(403).send("token expired")
            req.user = user
            next()
        })
    },
    isAgent: (req, res, next) => {
        const authHeader = req.headers['x-api-key']
        if (authHeader == null) return res.sendStatus(401).send("provided ax-api-key is empty")
        if(authHeader === process.env.API_KEY){
            next()
        }
        else{
            return res.status(403).send("please provide api-key correct")
        }
    },
    getHashPassword: async(password)=>{
        return await bcrypt.hash(password, salt)
    },
    validatePassword :async(reqPassword, storePassword)=>{
        return await bcrypt.compare(reqPassword, storePassword)
    }
}

