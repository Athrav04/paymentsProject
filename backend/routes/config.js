const mongoose = require('mongoose');


const express = require('express');
const {userModel,accountModel} = require('../db/Models');

async function createNewUser(userBody) {
    console.log(userBody)
    const username = userBody.username;
    const firstName = userBody.firstName;
    const lastname = userBody.firstName;
    const password = userBody.password;
    const balance = Math.floor(Math.random()*10000);
const newUser = await new userModel({
    username:username,
    firstName:firstName,
    lastName:lastname,
    password:password,
    balance:balance
});
const account = await new accountModel({
    username:newUser.username,
    userid:newUser._id,
    balance:balance
})
await newUser.save()
await account.save()
return newUser
}

async function findUser(body){
    const username = body.username;
    const user = await userModel.find({username:username});
    return user
}
module.exports = {
    createNewUser,
}