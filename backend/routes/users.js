const express = require('express');
const userRouter = express.Router();
const bcrypt = require('bcrypt');
const {userModel} = require('../db/Models');
const zod = require('zod');
const auth  = require('../middleware/auth')
const {createNewUser,generateToken,generateHash,updateUser,addContact} = require('./config')
const {signInSchema,signUpSchema,validateBody} = require('../validationSchema')


userRouter.get('/',(req,res)=>{
    res.json({"message":"usersPage"})
})

userRouter.post('/signUp',async (req,res)=>{
    const body = req.body;
    console.log(`got request body ${JSON.stringify(body)}`)
    const {success} =  signUpSchema.safeParse(body); //data validation using zod
    console.log(success);
    if(success){

    const hashedPass = await generateHash(body.password)
    body.password = hashedPass;

    const userExist = await userModel.find({
        username : body.username
    })
    
    if(userExist.length != 0){
        
        res.status(409).json({"Error":"user already exists"})
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

    res.json({
        message:"Account created successfully",
        token:`${token}`
    })
    }
    }
    else{res.json({"Error":"invalid input"})}

})

userRouter.post('/signIn',async(req,res)=>{
    const body = req.body;
    const {success} = signInSchema.safeParse(body);
    if(success){
    const user = await userModel.findOne({username:body.username});
        console.log(user);
    const userPass = user.password

    
    if(await bcrypt.compare(body.password,userPass)){
        const forToken = {
            userid:user._id,
            username:user.username,
            password:body.password
        }
        const token = await generateToken(forToken)
        res.json({
            Message:`Welcome ${user.username}`,
            token:`${token}`
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

    const updatedUser = await updateUser(body,req.userid);
    console.log(`updated user is ${updatedUser}`)
    res.json({Success:"User updated successfully",
    "Updated info":`${updatedUser}`})
})

userRouter.get('/getAll',auth,async (req,res)=>{
    try{
        const filter = req.query.filter || '';
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
    }).select('-transactions -contacts')
    console.log(foundUsers.length);
    if(foundUsers.length == 0){
        res.json({Users:"0"});
    }
    else {
        console.log(foundUsers)
        res.send(foundUsers);
    }

    }
    catch(e){
        console.log(`internal server error ${e}`);
    }
})

userRouter.post('/addContact',auth,async(req,res)=>{
    const {userid,username} = req.body;
    const user_Id = req.userid;
    try {
        const addUser = await userModel.findOne({_id:userid});
        const newContact = {
            username: addUser.username,
            firstName: addUser.firstName,
            lastName: addUser.lastName
        }


        await addContact(user_Id, newContact);
        res.send("contact added")

    }
    catch(err){
        console.log(`error while adding contact ${err}`);
    }

})

userRouter.get('/me',auth,async(req,res)=>{
   try{
    const currentUser = await userModel.findOne({_id:req.userid});
    if(currentUser){
    
    res.send(
       currentUser
    )
}
else{
    res.send("user does not exist")
}
   }
   catch(err){
    console.log(`internal server error ${err}`);
   }
})

userRouter.get('/transactions',auth,async(req,res)=>{
    try{
        const user = await userModel.findOne({_id:req.userid});
        console.log(`user is ${user.transactions}`);
        res.json({Transactions:`${JSON.stringify(user.transactions)}`})
    }catch(err){
        console.log(`error while fetching transactions ${err}`)
    }
})
module.exports = userRouter;
