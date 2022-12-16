const express=require('express');
const app=express();
const mongoose=require('mongoose')
const apirouter=require('./router/api')
mongoose.set('strictQuery', true);
mongoose.connect('mongodb://127.0.0.1:27017/calAPI',()=>{console.log('connected to database')})
app.use(express.json());

app.use('/api',apirouter);
app.listen(5000,()=>{console.log("server is connected to port number 5000");})