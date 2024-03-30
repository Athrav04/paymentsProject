const mongoose = require('mongoose');
require('dotenv').config()
const { string, number, object, date } = require('zod');

const p = process.env.PASS 
const pass = encodeURIComponent(p);

mongoose.connect(`mongodb+srv://helloiamak9077:${pass}@cluster0.on4llwm.mongodb.net/simplypayDB`)


const contacts = new mongoose.Schema({
    username:String,
    firstName:String,
    lastName:String
})

const transactions = new mongoose.Schema({
    from:String,
    to:String,
    amount:Number,
    note:String,
    TimeStamp:{type:Date,default:Date.now}
})

const userSchema = new mongoose.Schema({
    username:String,
    firstName:String,
    lastName:String,
    password:String,
    transactions:[transactions],
    contacts:[contacts]
})

const accountSchema = new mongoose.Schema({
    userid:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'userModel',
        required:true
    },
    balance:{
        type:Number,
        required:true
    }
})



const userModel = mongoose.model('userModel',userSchema);
const accountModel = mongoose.model('accountModel',accountSchema);

module.exports = {
    userModel,
    accountModel
}