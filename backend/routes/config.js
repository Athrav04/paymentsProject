const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');


const express = require('express');
const {userModel,accountModel} = require('../db/Models');

const secret = process.env.SECRET;

async function createNewUser(userBody) {
    const username = userBody.username;
    const firstName = userBody.firstName;
    const lastname = userBody.firstName;
    const email = userBody.email;
    const password = userBody.password;
    const balance = Math.floor(Math.random()*10000);
const newUser = await new userModel({
    username:username,
    firstName:firstName,
    lastName:lastname,
    email:email,
    password:password,
});
const userid = newUser._id;
console.log(`new userid is ${userid}`);
const account = await new accountModel({
    username:newUser.username,
    userid:userid,
    balance:balance
})
await newUser.save()
await account.save()
return newUser
}



async function updateUser(body,userid){
    const userId = userid;

    const updatedUser = await userModel.findOneAndUpdate({_id:userId},{
        username:body.username,
        firstName:body.firstName,
        lsatName:body.lastName
    })
    return updatedUser
}

async function generateToken(tokenBody){
    const token = jwt.sign(tokenBody,secret);
    return token
}

async function generateHash(pass){
    const saltRounds = 10;
    const hashedPassword = bcrypt.hash(pass,saltRounds);
    return hashedPassword;
}

async function addTransaction(userId,transaction){
    try {
        const newTransaction = await userModel.findOneAndUpdate({_id: userId}, {$push: {transactions: transaction}})
        const transactions = newTransaction.transactions;
      const id =  transactions.map((transact)=>{
        console.log(transact);
        return transact.TimeStamp == transaction.TimeStamp})
        console.log(`transaction id is ${id}`);
        console.log(`transaction is ${newTransaction}`);
    }
    catch(err){
        console.log(`error while updating transaction ${err}`);
    }
}

async function addContact(userId,contact){
    try{
        console.log('adding contact ');
        console.log(`userId is ${userId}`)
        await userModel.findOneAndUpdate({_id:userId},{$push:{contacts:contact}}).select('-transactions');
        console.log('contact added successfully');
    }catch(err){
        console.log(`Error occured ${err}`);
    }
}
module.exports = {
    createNewUser,
    addTransaction,
    generateToken,
    generateHash,
    updateUser,
    addContact
}