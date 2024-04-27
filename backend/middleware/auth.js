const express = require('express');
require('dotenv').config
const jwt = require('jsonwebtoken');

const secret = process.env.SECRET;

async function authMiddleware(req,res,next) {
    try{
    const Authheader = req.headers.authorization;
    if(!Authheader || !Authheader.startsWith('Bearer ')){
        res.status(403).json({"Error":"No token detected"});
    }
    else{
        const headerArray = Authheader.split(' ');
        const token = headerArray[1];
    
        const decoded = await jwt.verify(token,secret);
	
        if(decoded.userid){
            req.userid = decoded.userid;
            next();
        }
    }
    
    }catch(err){
        console.log(`error occured ${err}`)
        res.status(403).send({Error:"Auth faliure"})
    }

}

module.exports = authMiddleware;
