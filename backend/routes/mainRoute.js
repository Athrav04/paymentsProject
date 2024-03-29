const express = require('express');
const mainRouter = express.Router();
const userRouter = require('./users');
const accountsRouter = require('./accounts');


mainRouter.use('/user',userRouter);
mainRouter.use('/account',accountsRouter)

mainRouter.get('/',(req,res)=>{
    res.json({"message":"main backend page"});
})

module.exports = 
    mainRouter;

