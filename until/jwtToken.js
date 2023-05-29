'use strict'
require('dotenv').config({ path: `config/.env.${process.env.NODE_ENV}` })
const jwt = require('jsonwebtoken');
const logger = require('../logger');
const bcrypt = require('bcrypt');
const salt = bcrypt.genSaltSync(10)
module.exports = {
    generateAccessToken: (password) => {
        return jwt.sign( {password: password}, process.env.TOKEN_SECRET, { expiresIn: 60 * 60});
    },

    authenticateToken: (req, res, next) => {
        const authHeader = req.headers['authorization']
        const token = authHeader && authHeader.split(' ')[1]
        if (token == null) return res.sendStatus(401)
        jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
            console.log(err)
            logger.warn(err)
            if (err) return res.sendStatus(403)
            req.user = user
            next()
        })
    },
    getHashPassword: async(password)=>{
        return await bcrypt.hash(password, salt)
    },
    validatePassword :async(reqPassword, storePassword)=>{
        return await bcrypt.compare(reqPassword, storePassword)
    }
}

