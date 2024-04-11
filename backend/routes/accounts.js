const express = require('express')
const accoutnRouter = express.Router();
const auth = require('../middleware/auth')
const {addTransaction} = require('./config')
const mongoose = require('mongoose');
const {accountModel, userModel} = require("../db/Models");
const {add} = require("nodemon/lib/rules");

accoutnRouter.get('/balance',auth,async(req,res)=>{
    try {
         const user = await accountModel.findOne({userid:req.userid});
        if(!user ){
            res.json({"Message":"An unexpected eccor occured"})
        }
        else if(req.userid != user.userid){
            res.json({"Error":"unauthorized access"})
        }
        else
        {
            const balance = user.balance;
            res.json({Balance:`${balance}`})
        }
    }
    catch(err){
        console.log(err);
    }

})

accoutnRouter.post('/transfer',auth,async(req,res)=>{
    const toSend = req.query.transferTo;
        try {
            const session = await mongoose.startSession();
            session.startTransaction();
            if(!toSend){
                res.json({
                    "Message":"invalid input"
                })
            }
            const {amount, note} = req.body;
            const fromUser = await userModel.findOne({_id: req.userid}).session(session);
            console.log(`fromUser is ${JSON.stringify(fromUser)}`)
            const fromAccount = await accountModel.findOne({userid:req.userid}).session(session)
            const toUser = await userModel.findOne({username:toSend});
            const toAccount = await accountModel.findOne({userid: toUser._id}).session(session);
            if (!fromUser || fromUser.balance < amount) {
                session.abortTransaction();
                res.json({"Error": "Insufficient balance"});
            } else if (!toUser) {
                session.abortTransaction();
                res.json({"error": "Invalid user"});
            } else {

                await accountModel.updateOne({userid: req.userid}, {$inc: {balance: -amount}}).session(session);
                await accountModel.updateOne({userid: toUser._id}, {$inc: {balance: +amount}}).session(session);

               const transaction = {
                   from:fromUser.username,
                   to:toUser.username,
                   note:note,
                   TimeStamp:Date.now()
               }

               await addTransaction(req.userid,transaction);
               await addTransaction(toUser._id,transaction);
                await session.commitTransaction();
                session.endSession();

                console.log(`sender balance : ${fromAccount.balance}`);
                console.log(`reciever balance : ${toAccount.balance} `);

                res.json({
                    Message: "Transaction successful",
                    updatedBalances: {
                        sender: `${fromAccount.balance}`,
                        reciever: `${toAccount.balance},`
                    }
                })
            }
        }
        catch(err){
            console.log(err);
        }



})
//transfer api endpoint

module.exports =
    accoutnRouter
