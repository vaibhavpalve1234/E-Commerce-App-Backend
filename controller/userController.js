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
    },
    getUsers: async(req, res, next)=>{
        try {
            const result = await UserModel.find()
            return res.status(200).send(result)

        } catch (error) {
            next(error)
            return res.status(404).send({error})
        }
    },
    getOneUsers: async(req, res, next)=>{
        try {
            const id =  req.params.id
            if(!id){
                let result = notFound("user not found")
                return res.status(400).send(result)
            }
            const result = await UserModel.find({_id:id})
            if(result.length < 1){
                let result = notFound("user not found")
                return res.status(400).send(result)
            }
            return res.status(200).send(result)

        } catch (error) {
            next(error)
            return res.status(404).send({error})
        }
    }, 
    getAdminUsers: async(req, res, next)=>{
        try {
            const result = await UserModel.find({role:{$in:["admin"]}})
            if(result.length < 1){
                let result = notFound("Admin not found")
                return res.status(400).send(result)
            }
            return res.status(200).send(result)

        } catch (error) {
            next(error)
            return res.status(404).send({error})
        }
    }, 
    makeAdminUsers: async(req, res, next)=>{
        try {
            const email = req.query.email
            if(!email){
                let result = notFound("please provide email id ")
                return res.status(400).send(result)
            }
            const result = await UserModel.find({email})
            if(result.length < 1){
                let result = notFound("user not found")
                return res.status(400).send(result)
            }
            if(result[0].role != "admin"){
                const updatedAdminData = await UserModel.updateOne({email:email},{role:'admin'});
                console.log(updatedAdminData)
                return res.status(200).send(updatedAdminData)
            }
            res.status(201).json({msg:"user already admin"})
            
        } catch (error) {
            next(error)
            return res.status(404).send({error})
        }
    }, 
    removeUser: async(req, res, next)=>{
        try {
            const email = req.query.email
            if(!email){
                let result = notFound("please provide correct emailId ")
                return res.status(400).send(result)
            }
            const result = await UserModel.find({email})
            if(result.length < 1){
                let result = notFound("user not found in Database")
                return res.status(400).send(result)
            }
            if(result[0].role != "admin"){
                const removeUserData = await UserModel.deleteOne({email:email});
                return res.status(200).send(removeUserData)
            }
            res.status(201).json({msg:"already admin loggedin, We can not remove Admin from database"})
            
        } catch (error) {
            next(error)
            return res.status(404).send({error})
        }
    }, 
    removeAdmin: async(req, res, next)=>{
        try {
            const email = req.query.email
            if(!email){
                let result = notFound("please provide correct emailId ")
                return res.status(400).send(result)
            }
            const result = await UserModel.find({email})
            if(result.length < 1){
                let result = notFound("Admin not found in Database")
                return res.status(400).send(result)
            }
            if(result[0].role === "admin"){
                const removeUserData = await UserModel.deleteOne({email:email});
                return res.status(200).send(removeUserData)
            }
            res.status(201).json({msg:"already remove Admin from database"})
            
        } catch (error) {
            next(error)
            return res.status(404).send({error})
        }
    }, 
}