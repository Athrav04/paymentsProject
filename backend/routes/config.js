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
    const password = userBody.password;
    const balance = Math.floor(Math.random()*10000);
const newUser = await new userModel({
    username:username,
    firstName:firstName,
    lastName:lastname,
    password:password,
    balance:balance
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

async function findUser(body){
    const username = body.username;
    const user = await userModel.findOne({username:username});

    return user
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
module.exports = {
    createNewUser,
    findUser,
    generateToken,
    generateHash,
    updateUser
}