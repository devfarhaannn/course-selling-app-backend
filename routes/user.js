// const express = require("express")
// const Router = express.Router
const { Router } = require("express");
const jwt = require("jsonwebtoken")
const userRouter = Router();
const { userModel, purchaseModel, courseModel, } = require("./db")
const { userMiddleware } = require("../middleware/user")
const { JWT_USER_PASSWORD } = require("../config")

    userRouter.post("/signup",async function(req,res){
        const { email,password,firstName,lastName } = req.body;//TODO:add ZOD validation
        // TODO: hashed password

        // TODO: put inside try catch block
        await userModel.create({
            email:email,
            password:password,
            firstName:firstName,
            lastName:lastName
        })
        res.json({
            message:"signup succeeded"
        })
    })
    userRouter.post("/signin",async function(req,res){
        const { email,password } = req.body;
        
        //TODO: ideallly password should be hashed,hence you cant compare with user provided password and the database password
        const user = await userModel.findOne({
            email:email,
            password:password
        })
        if(user){
            const token = jwt.sign({
                id:user._id
            },JWT_USER_PASSWORD) ;

        // do cookie logic
            res.json({
                token:token
            })
        }
        else{
        res.status(403).json({
            message:"Incorrect Creditals "
        })
        }
    })
    userRouter.get("/purchases", userMiddleware ,async function(req,res){
        const userId = req.userId;

        const purchases = await purchaseModel.find({
             userId,
        })
        
        const courseData = await courseModel.find({
            _id : { $in: purchases.map(x => x.courseId) }
        })

        res.json({
            purchases
        })
    })


module.exports = {
    userRouter:userRouter
}