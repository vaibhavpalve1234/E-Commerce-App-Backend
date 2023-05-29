'use strict'
const logger = require("../logger")
const UserModel = require("../model/User.Model")
const { notFound } = require("../until/errorhandler")
const {validatePassword, getHashPassword} = require("../until/jwtToken")


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
                    logger.warn("issue in code")
                }
                res.status(200).json(newUser)
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
    login: async(req, res)=>{
        try {
            const { email, password} = req.body
            let user = await UserModel.find({email})
            if(!user){
                return notFound("user not found")
            }
            if(await validatePassword(password,user[0].password)){
                return res.send("user login succefully.")
            }
            return res.send("user password and email id wrong.")
        } catch (error) {
            logger.warn(error)
            return res.send(error)
        }
    }
}