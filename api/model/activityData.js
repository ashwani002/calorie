const mongoose=require('mongoose');
const metData=mongoose.Schema({
    ACTIVITY:String,
    SpecificMotion:String,
    METs:String
})
module.exports=mongoose.model('ActivityData',metData)