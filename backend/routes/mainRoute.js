const express = require('express');
const mainRouter = express.Router();
const userRouter = require('./users');

mainRouter.use('/user',userRouter);

mainRouter.get('/',(req,res)=>{
    res.json({"message":"main backend page"});
})

module.exports = 
    mainRouter;

