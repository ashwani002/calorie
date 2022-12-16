const mongoose=require('mongoose');
const usercollection=mongoose.Schema({
    name:String,
    weight:String,
    height:String,
    gender:String,
    dob:Date,
    bmr:String
})
module.exports=mongoose.model('userCollection',usercollection)