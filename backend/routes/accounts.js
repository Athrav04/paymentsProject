const express = require('express')
const accoutnRouter = express.Router();
const auth = require('../middleware/auth')
const {findUser} = require('./config')

accoutnRouter.get('/balance',auth,async(req,res)=>{
    const body = req.body;
    const username = body.username;
    try {
        const user = await findUser(body);
        if(!user ){
            res.json({"Message":"An unexpected eccor occured"})
        }
        else if(req.userid != user._id){
            res.json({"Error":"unauthorized access"})
        }
        else
        {
            const balance = user.balance;
            res.json({"Balance":`${balance}`})
        }
    }
    catch(err){
        console.log(err);
    }

})

//transfer api endpoint

module.exports =
    accoutnRouter
