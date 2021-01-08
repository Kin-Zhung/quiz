const express = require('express');
const cors = require('cors');


const mongoose = require('mongoose');

const authRoute = require('./routes/auth');
const quizRoute = require('./routes/quizs');
const scoreRoute = require('./routes/scores');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());


const uri = process.env.ATLAS_URI;
try{
    mongoose.connect(uri, {useNewUrlParser:true, useUnifiedTopology:true});
        const connection = mongoose.connection;
        connection.once('open', ()=>{
        console.log('mongodb connected');
    });
}catch(e){
    console.log('connection failed');
    throw(e);
}



app.use('/quiz',quizRoute);
app.use('/user',authRoute);

app.listen(port,()=>{
    console.log(`server is runiing on port: ${port}`)
});

