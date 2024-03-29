const express = require('express');
const userRouter = express.Router();
const bcrypt = require('bcrypt');
const {userModel} = require('../db/Models');
const zod = require('zod');
const auth  = require('../middleware/auth')
const {createNewUser,findUser,generateToken,generateHash,updateUser} = require('./config')
const {signInSchema,signUpSchema,validateBody} = require('../validationSchema')


userRouter.get('/',(req,res)=>{
    res.json({"message":"usersPage"})
})

userRouter.post('/signUp',async (req,res)=>{
    const body = req.body;
    const {success} = signUpSchema.safeParse(body); //data validation using zod
    if(success){

    const hashedPass = await generateHash(body.password)
    body.password = hashedPass;

    const userExist = await userModel.find({
        username : body.username
    })
    console.log(`user already exists ${userExist}`)
    if(userExist.length != 0){
        console.log(`user already exists ${userExist}`)
        res.json({"Error":"user already exists"})
    }
    else{
    const newUser = await createNewUser(body);
    console.log(newUser);

    const forToken = {
        userid:newUser._id,
        username:body.username,
        password:body.password
    };
    const token = await generateToken(forToken)
    // const jwtSecret = process.env.SECRET
    // const token = jwt.sign(forToken,jwtSecret);
    res.json({
        "message":"Account created successfully",
        "token":`${token}`
    })
    }
    }
    else{es.json({"Error":"invalid input"})}

})

userRouter.post('/signIn',async(req,res)=>{
    const body = req.body;
    const {success} = signInSchema.safeParse(body);
    console.log(success)
    if(success){
    const user = await findUser(body);
    const userPass = user.password
    const forToken = {
        userid:user._id,
        username:user.username,
        password:body.password
    }

    const token = await generateToken(forToken)

    
    if(await bcrypt.compare(body.password,userPass)){
        res.json({
            "Message":`Welcome ${user.username}`,
            "Token":`${token}`
        })
    }
    else{
        res.json({"Error":"incorrect credentials"})
    }
    }
    else{
        res.json({
            "Error":"Invalid/incomplete input fields"
        })
    }
})

userRouter.put('/updateInfo',auth, async (req,res)=>{
    const body = req.body;
    // const {isTrue} = await updateInfoSchema.safeParse(req.body);
    // console.log(`validation is ${isTrue}`);
    // if(!isTrue){
    //     res.json({"Message":"invalid input/credentials"});
    // }
    // else{
    // res.json({"message":"Still working on this"});
    // }
    const updatedUser = await updateUser(body,req.userid);
    console.log(`updated user is ${updatedUser}`)
    res.json({"Success":"User updated successfully",
    "Updated info":`${updatedUser}`})
})

userRouter.get('/getAll',auth,async (req,res)=>{
    const filter = req.query.filter || 'empty';
    const foundUsers = await userModel.find({
        $or:[
            {firstName:{
                    "$regex":filter
                }
            },{
                lastName:{
                    "$regex":filter
                }
            }
        ]
    })
    if(!foundUsers){
        res.json({
            "Message":"No users found"
        })
    }
    else {
        res.json(foundUsers);
    }
})
module.exports = userRouter;