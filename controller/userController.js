'use strict'
const logger = require("../logger")
const UserModel = require("../model/User.Model")
const { notFound } = require("../until/errorhandler")
const {validatePassword, getHashPassword, generateAccessToken} = require("../until/jwtToken")


module.exports = {
    signUp:async(req, res) =>{
        try {
            const email = req.body.email
            const password = req.body.password
            const firstname = req.body.firstname
            const lastname = req.body.lastname
            const findUser =  await UserModel.findOne({email})
            if(!findUser){
                //create user...
                let newPassword = await getHashPassword(password)
                const newUser = await UserModel.create({password: newPassword,email:email, firstname:firstname, lastname:lastname})
                if(!newUser){
                    logger.warn("isssue in user sign up router!!");
                    res.json({
                        msg:"some error in router",
                        success: false
                    })
                }
                res.status(200).json({newUser})
            }
            else{
                res.json({
                    msg:"user Already Exists",
                    success: false
                })
            }
        } catch (error) {
            logger.warn(error)
            res.send({error})
        }
        
    },
    login: async(req, res, next)=>{
        try {
            const { email, password} = req.body
            let user = await UserModel.find({email})
            if(user.length == 0){
                let result = notFound("user not found")
                return res.status(400).send(result)
            }
            if(await validatePassword(password,user[0].password)){
                let token = await generateAccessToken({password: user[0].password,email:email, firstname:user[0].firstname, lastname:user[0].lastname});
                return res.send({mesg:"user login succefully.", token})
            }
            
            return res.send("user password and email id wrong.")
        } catch (error) {
            next(error)
            return res.status(404).send({error})
        }
    }
}