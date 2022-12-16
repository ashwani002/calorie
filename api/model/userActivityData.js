const mongoose=require('mongoose');
const activityData=mongoose.Schema({
    date:String,
    name:String,
    desc:String,
    met:String,
    duration:String,
    userId:mongoose.Types.ObjectId
})
module.exports=mongoose.model('UserActivityData',activityData)