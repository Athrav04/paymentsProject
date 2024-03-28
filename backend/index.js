const express = require('express');
const app = express();
const mainRouter = require('./routes/mainRoute');
const cors = require('cors');

app.use(cors());
app.use(express.json());

app.use('/api/v1',mainRouter)

app.listen(3000,(req,res)=>{
    console.log("started server on 3000");
})