const express = require('express');
const userRouter = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {userModel} = require('../db/Models');
const zod = require('zod');
const {createNewUser} = require('./config')
const {signInSchema,signUpSchema,updateInfoSchema} = require('../validationSchema')


userRouter.get('/',(req,res)=>{
    res.json({"message":"usersPage"})
})

userRouter.post('/signUp',async (req,res)=>{
    const body = req.body;

    const data = JSON.stringify(body);
    console.log(`request body is ${data}`)
    const {success} = signUpSchema.safeParse(body); //data validation using zod
    if(success){

    const saltRounds = 10;
    const hashedPass = await bcrypt.hash(body.password,saltRounds);
    body.password = hashedPass;

    const userExist = await userModel.find({username:body.username,firstName:body.firstName,lastName:body.lastName});
    console.log(userExist);
    if(userExist){
        res.json({"Error":"user already exists"})
    }
    else{
    console.log(body)
    const newUser = await createNewUser(body);
    console.log(newUser)

    const forToken = {
        username:body.username,
        password:body.password
    }
    const jwtSecret = process.env.SECRET
    const token = jwt.sign(forToken,jwtSecret);
    res.json({
        "message":"Account created successfully",
        "token":token
    })
    }
    }
    else{es.json({"Error":"invalid input"})}

})

userRouter.post('/signIn',async(req,res)=>{
    const body = req.body;
    console.log(`request body is ${body}`);
    const {success} = signInSchema.safeParse(body);
    if(success){
    const user = await findUser(body);
    const pass = user.password;
    if(bcrypt.compare(body.password,pass)){
        res.send(`welcome ${body.username}`)
    }
    else{
        res.json({"message":"incorrect password"})
    }
    }
})
module.exports = userRouter;