const router=require('express').Router()
const userColl=require('../model/usercoll');
const Foodlog=require('../model/userFood')
const userActivity=require('../model/userActivityData')
const foodData=require('../model/foodData')
const metData=require('../model/activityData');
router.get('/',(req,res)=>{
    res.json('hello from api')
})
router.post('/signup',async(req,res)=>{
   const {name,weight,height,gender,age} =req.body;
   let date=new Date();
   let dat=new Date(age).toISOString().split('T')[0];
   const fdate=date.toISOString().split('T')[0];
   let userDate=new Date(dat);
   let currDate=new Date(fdate);
   let c=currDate-userDate;
   const curAge = new Date(c);
   const totalage=Math.floor(curAge / 31536000000)
   let bmr=null;
   try{
   const a=await userColl.findOne({name:name})
       if(a==null){
    if(gender=='Male'){
        bmr=66.4730+(13.7517*weight)+(5.0033*height)-(6.7550*totalage)
    }else{
        bmr=655.0955+(9.5634*weight)+(18496*height)-(4.6756*totalage)
    }
   const usercol=new userColl({name:name,weight:weight,height:height,gender:gender,dob:age,bmr:bmr});
   usercol.save();
   res.status(200).json({message:'Data is been saved'});
}   
else{
    res.status(200).json({message:'Name is already taken'})
}

}
    catch(error){
        res.status(400).json({error:error.message})
    }
})
router.get('/userdetails',async(req,res)=>{
    try{
        const userdata=await userColl.find();
        res.status(200).json(userdata);
    }
    catch(error){
        res.status(400).json({error:error.message})
    }
})
router.post('/addfood',(req,res)=>{
    const {date,foodNamee,foodGroup,mealType,serving,ids,calaroies}=req.body
    try{
    const useractivit=new Foodlog({userId:ids,date:date,foodName:foodNamee,mealType:mealType,foodGroup:foodGroup,serving:serving,calaroies:calaroies});
    useractivit.save();
    res.status(200).json({message:'data inserted successfully'})
}catch(error){
    res.status(400).json({error:error.message})
}
})
router.post('/activity',(req,res)=>{
    const {date,ACT,activityDesc,activityMetvalue,activityDuration,ids}=req.body;
    const alog=new userActivity({date:date,name:ACT,desc:activityDesc,met:activityMetvalue,duration:activityDuration,userId:ids})
    alog.save();
    res.status(200).json({mess:'data inserted successfully'})
})
router.get('/food',async(req,res)=>{
    try{
   const fooddata=await foodData.find();
   res.status(200).json(fooddata)}
   catch(error){
    res.status(400).json({error:error.message})
   }
})
router.get('/foodgroup/:id',async(req,res)=>{
    try{
    const id=req.params.id;
    const foodGroup=await foodData.findById(id)
    res.status(200).json({foodgroup:foodGroup.FoodGroup,serveingdesc:foodGroup.ServingDescription1g,calaroies:foodGroup.Calories,foodname:foodGroup.name})}
    catch(error){
        res.status(400).json({error:error.message})
    }
})
router.get('/metvalue/:id',async(req,res)=>{
    const id=req.params.id;
    try{
    const metvalue=await metData.findById(id)
    res.status(200).json(metvalue)}
    catch(error){
        res.status(400).json({error:error.message})
    }
})
router.get('/activity',async(req,res)=>{
    try{
    const activity=await metData.find()
    res.status(200).json(activity)}
    catch(error){
        res.status(400).json({error:error.message})
    }
})

router.get('/viewuserdata/:id',async(req,res)=>{
    let userId=req.params.id;
    try{
        const uname=await userColl.findById(userId)
    // console.log(uname.name)
    let food=await Foodlog.find({userId:userId})
    let calout=await userActivity.find({userId:userId})
    // console.log(calout)
    res.status(200).json({user:uname,food:food,calout:calout})}
    catch(error){
        res.status(400).json({error:error.message})
    }
})
router.post('/viewbydat/:id',async(req,res)=>{
    const userId=req.params.id;
    let {date}=req.body;
    try{
    const uname=await userColl.findById(userId)
    // console.log(uname.name)
    let food=await Foodlog.find({userId:userId,date:date})
    let calout=await userActivity.find({userId:userId,date:date})
    // console.log(calout)
    res.status(200).json({user:uname,food:food,calout:calout})}
    catch(error){
        res.status(400).json({error:error.message})
    }
})
router.post('/deleteUser/:id',async(req,res)=>{
    const id=req.params.id;
    try{
    await Foodlog.deleteMany({userId:id})
    await userActivity.deleteMany({userId:id})
    await userColl.findByIdAndDelete(id);
    res.status(200).json({message:'successfully deleted'});}
    catch(error){
        res.status(400).json({error:error.message})
    }
})
// router.get('/actname/:id',async(req,res)=>{
    //     let id=req.params.id;
    //     // console.log(id)
    //     const a=await userActivity.findById(id)
//     let activityname=a.name;
//     const activity=await metData.findById(a.name)
//     res.json({actname:activity.ACTIVITY});
// })


// router.get('/testss/:id',async(req,res)=>{
    //     const id =req.params.id;
    //     let ids=mongoose.Types.ObjectId(id)
//     console.log(ids)
//         let activity=await userColl.aggregate(
    //             [{
        //                 $match:
//                 {_id:ids}
//             },
//                 { $lookup:{
    //                     from:'activitydatas',
    //                     localField:'userId',
//                     foreignField:"id",
//                     as:"Foodlog"
//                 },
//             }])

//     res.json(activity);

// })

// router.get('/viewuserdata/:id',async(req,res)=>{
//     let userId =req.params.id;
//     const uname=await userColl.findById(userId)
//     let id=mongoose.Types.ObjectId(userId)
//     console.log(id);    
//     let food=await userColl.aggregate(
//         [{
//             $match:
//             {_id:id}
//         },
//             { $lookup:{
//                 from:'foodlogs',
//                 localField:'userId',
//                 foreignField:"_id",
//                 as:"userfoodlogs"
//             }}])
//             let activity=await userColl.aggregate(
//                 [{
//                     $match:
//                     {_id:id}
//                 },
//                     { $lookup:{
//                         from:'activitydatas',
//                         localField:'userId',
//                         foreignField:"_id",
//                         as:"Foodlog"
//                     }}])
//                     console.log(food)
//     res.json({uname:uname,food:food,activity:activity})
// })


module.exports=router;