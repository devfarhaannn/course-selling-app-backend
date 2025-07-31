
const { Router } = require("express");
const { purchaseModel, courseModel } = require("./db");
const { userMiddleware } = require("../middleware/user")
const courseRouter = Router();

    courseRouter.post("/purchases",userMiddleware,async function(req,res){
        const userId = req.userId
        const courseId = req.body.courseId
        // you would expect that user to pay you money
        // should check that the user has actually paid yhe price
       await purchaseModel.create({
            userId,
            courseId
        })
        res.json({
            message:"you have successfully bought the course"
        })
    })
    courseRouter.get("/preview",async function(req,res){

        const courses = await courseModel.find({})
        res.json({
            courses
        })
    })


module.exports = {
    courseRouter:courseRouter
}