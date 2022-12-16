import logo from '../assets/img/logo.png'
import { useEffect, useState } from 'react';
import {Link} from 'react-router-dom'
function Userlist() {
    const [user,setUser]=useState([]);
    const [date,setDate]=useState('');
    const [foodName,setfoodName]=useState('');
    const [mealType,setMealtype]=useState('');
    const [foodGroup,setFoodgroup]=useState('');
    const [serving,setserving]=useState('');
    const [error,setError]=useState(false);
    const [ids,setIds]=useState()
    const [insertedMess,setinsertedMess]=useState('');
    // Activity userstates
    const [activityName,setActivityName]=useState('');
    const [activityDesc,setActivityDesc]=useState('');
    const [activityMetvalue,setMetvalue]=useState('');
    const [activityDuration,setDuration]=useState('');
    const[foodData,setfoodData]=useState([]);
    const[activityData,setactivityData]=useState([]);
    useEffect(()=>{
        fetch('/api/userdetails').then((res)=>{return res.json()})
        .then((data)=>{
            setUser(data)
        });
   },[])
   
   function handleAge(dob){
    let date=new Date();
    let dat=new Date(dob).toISOString().split('T')[0];
    const fdate=date.toISOString().split('T')[0];
    let userDate=new Date(dat);
    let currDate=new Date(fdate);
    let c=currDate-userDate;
    const curAge = new Date(c);
    const d=Math.floor(curAge / 31536000000)
    return d;
   }
       function handleId(e,id){
           e.preventDefault();
            setinsertedMess('');
           setIds(id)
       }

   function handleForm(e){
    e.preventDefault();
    setinsertedMess('');
    if(date.length===0||foodName.length===0||foodName==='Select Food Name'||mealType.length===0||mealType==='Select Meal type'||foodGroup.length===0||foodGroup==='Select food group'||serving.length===0){
        setError(true);
        setinsertedMess('');
        return false;
       }
    let bodydata={date,foodNamee,foodGroup,mealType,serving,ids,calaroies};
    fetch('/api/addfood',{
        method:'POST',
        headers:{"Content-Type": "application/json"},
        body:JSON.stringify(bodydata)
    }).then((res)=>{return res.json()}).then((data)=>{setinsertedMess(data.message)
        if(data.message==='data inserted successfully'){
            setDate('');
            setfoodName('');
            setMealtype('');
            setFoodgroup('');
            setserving('');
            setActivityDesc('')
        setMetvalue('')
        setDuration('')
        setfoodName('');
        }
    })};
    function handleAct(e){
        e.preventDefault();
        setDate('');
        setActivityDesc('')
        setMetvalue('')
        setDuration('')
        setfoodName('');
            setMealtype('');
            setFoodgroup('');
            setserving('');
        setinsertedMess('');
        if(date.length===0||activityName.length===0||activityName==='Select Activity'||activityDesc.length===0||activityMetvalue.length===0||activityDuration.length===0){
            setError(true)
            return false
        }
    let activitydata={date,ACT,activityDesc,activityMetvalue,activityDuration,ids};
    fetch('/api/activity',{
        method:'POST',
        headers:{"Content-Type": "application/json"},
        body:JSON.stringify(activitydata),
    }).then((res)=>{return res.json()}).then((data)=>{setinsertedMess(data.mess)
    if(data.mess==='data inserted successfully'){
        setDate('');
        setActivityDesc('')
        setMetvalue('')
        setDuration('')
    }})
   }

   useEffect(()=>{
       fetch('/api/food').then((res)=>{return res.json()}).then((data)=>{setfoodData(data)});
       fetch('/api/activity').then((res)=>{return res.json()}).then((data)=>{setactivityData(data)})
    },[])
    function FoodNameFun(e){
        const foodnameid=e.target.value
        setfoodName(foodnameid)
    }
    const [calaroies,setCalaroies]=useState('');
    const [foodNamee,setfoodNamee]=useState('');
    useEffect(()=>{
       fetch(`/api/foodgroup/${foodName}`).then((res)=>{return res.json()}).then((data)=>{setFoodgroup(data.foodgroup);setserving(data.serveingdesc);setCalaroies(data.calaroies);setfoodNamee(data.foodname) }) 
    },[foodName])
    function activityNamefun(e){
        const foodnameid=e.target.value;
        setActivityName(foodnameid) 
    }
    const [ACT,setACT]=useState('')
    useEffect(()=>{
        fetch(`/api/metvalue/${activityName}`).then((res)=>{return res.json()}).then((data)=>{setMetvalue(data.METs);setACT(data.ACTIVITY)});
    },[activityName])
    function clear(){
        setinsertedMess('');
        setError(false)
    }
    const [deleteMess,setdeleteMess]=useState('');
    function handleDelete(deleteId){
        let tru=window.confirm('are you sure you want to delete');
        if(tru){
        fetch(`/api/deleteUser/${deleteId}`,{
            method:'POST',
            headers:{"Content-Type": "application/json"},
            body:JSON.stringify({deleteId})
        }).then((res)=>{return res.json()}).then((data)=>{setdeleteMess(data.message);
            fetch('/api/userdetails').then((res)=>{return res.json()})
        .then((data)=>{
            setUser(data)
        });});}
    }
    return ( 
    <>
        <div>
        <header className="header">
            <div className="container">
            <div className="row">
            <div className="col-md-3">
                <div className="logo">
                    <Link to="/"><img src={logo} alt="logo"/></Link>
                </div>
            </div>
            <div className="col-md-9">
                   <Link to="/signup"><button className='me-auto btn btn-primary float-right'>Register</button></Link>
            </div>
            </div>
            </div>

        </header>
        <div className="mid-container">
            <div className="container">
                <div className="title-row">
                    <h1 className="title">User List</h1>
                </div>
                {deleteMess}
                <div className="user-list">
                    <table className="dcf-table dcf-table-responsive dcf-table-bordered dcf-table-striped dcf-w-100%">
                        <thead>
                            <tr>
                                <th scope="col" className="name">Name</th>
                                <th scope="col" className="weight">Weight</th>
                                <th scope="col" className="height">Height</th>
                                <th scope="col" className="gender">Gender</th>
                                <th scope="col" className="age">Age</th>
                                <th scope="col" className="bmr">BMR</th>
                                <th scope="col" className="action">Action</th>
                            </tr>
                        </thead>
                        <tbody>
    {user.length!==0?<>
                        {user.map((res)=>(
                            <tr key={res._id}>
                                <th scope="row">{res.name}</th>
                                <td data-label="Weight">{res.weight}</td>
                                <td data-label="Height">{res.height}</td>
                                <td data-label="Gender">{res.gender}</td>
                                <td data-label="Age">{handleAge(res.dob)}</td>
                                <th scope="col">{parseFloat(res.bmr).toFixed(2)}</th>
                                <td data-label="Action">
                                    <div className="btn-set">
                                        <Link className="btn-secondary" to={`/view/${res._id}`}>View</Link>
                                        <button className="btn-primary add-data-btn" data-bs-toggle="modal" data-bs-target="#addDataModal" onClick={(e)=>{handleId(e,res._id)}}>Add
                                            Data</button>
                                            <button onClick={(e)=>{handleDelete(res._id)}} className="btn btn-danger">Delete</button>
                                    </div>
                                </td>
                            </tr>
                            ))}     
                            </>
    :<><tr><td className='text-center' colSpan={8}><h1>No records found</h1></td></tr></>}
    </tbody>
                    </table>
                </div>
            </div>
        </div>
        <footer className="footer">
            <div className="container">
                <p>2022 LMD Consulting, LLC , All Rights Reserved</p>
            </div>
        </footer>
    </div>
    <div className="modal fade" id="addDataModal" tabIndex="-1" aria-labelledby="addDataModalLabel" aria-hidden="true">
        <div className="modal-dialog">
            <div className="modal-content add-data-modal">
                <div className="modal-header">
                    <ul className="nav nav-tabs" id="myTab" role="tablist">
                        <li className="nav-item" role="presentation">
                            <Link className="nav-link active" id="food-tab" data-bs-toggle="tab" to="#food" role="tab"
                                aria-controls="food" aria-selected="true" onClick={clear}>Add Food</Link>
                        </li>
                        <li className="nav-item" role="presentation">
                            <Link className="nav-link" id="activity-tab" data-bs-toggle="tab" to="#activity" role="tab"
                                aria-controls="activity" aria-selected="false" onClick={clear}>Add Activity</Link>
                        </li>
                    </ul>
                </div>
                <div className="modal-body">
                    <div className="tab-content" id="myTabContent">
                        <div className="tab-pane fade show active" id="food" role="tabpanel" aria-labelledby="food-tab">
                        <form onSubmit={(e)=>{handleForm(e)}}>
                            <div className="input-field">
                                <label>Select Date</label>
                                <input type="date" placeholder="Age" value={date} onChange={(e)=>{setDate(e.target.value)}}/>
                                {error&&date.length<=0?<p className='text-danger'>Enter date</p>:""}
                            </div>
                            <div className="input-field">
                                <label>Select Food Name</label>
                                <select className="selectbox" value={foodName} onChange={(e)=>{FoodNameFun(e)}}>
                                <option>Select food name</option>
                                    {foodData.map((res)=>(
                                        <option key={res._id} value={res._id}>{res.name}</option>
                                    ))}
                                </select>
                                {error&&foodName.length<=0?<p className='text-danger'>Select food name</p>:""}
                            </div>
                            <div className="input-field">
                                <label>Select Meal Type</label>
                                <select className="selectbox" value={mealType} onChange={(e)=>{setMealtype(e.target.value)}}>
                                    <option>Select Meal type</option>
                                    <option>Breakfast</option>
                                    <option>Lunch</option>
                                    <option>Dinner</option>
                                </select>
                                {error&&mealType.length<=0?<p className='text-danger'>Enter Meal Type</p>:""}
                            </div>

                            <div className="input-field">
                                <label>Select Food Group</label>
                                <select className="selectbox" value={foodGroup} onChange={(e)=>{setFoodgroup(e.target.value)}} disabled>
                                    <option>{foodGroup}</option>
                                </select>
                                {error&&foodGroup.length<=0?<p className='text-danger'>Select Food Group</p>:""}
                            </div>
                            <div className="input-field">
                                <label>Serving</label>
                                <input type="text" placeholder="Serving" value={serving} onChange={(e)=>{setserving(e.target.value)}} disabled/>
                                {error&&serving.length<=0?<p className='text-danger'>Enter serving</p>:""} 
                            </div>
                            <p className='text-center'>{insertedMess}</p>
                            <div className="input-field input-field-btn btn-set--center">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                                <button type="sumbit" className="btn btn-primary" data-dismiss="modal">Save</button>
                            </div>
                        </form>
                        </div>

                        <div className="tab-pane fade" id="activity" role="tabpanel" aria-labelledby="activity-tab">
                        <form onSubmit={(e)=>{handleAct(e)}}>
                            <div className="input-field">
                                <label>Select Date</label>
                                <input type="date" placeholder="Age" value={date} onChange={(e)=>{setDate(e.target.value)}}/>
                                {error&&date.length<=0?<p className='text-danger'>Enter date</p>:""}
                            </div>
                            <div className="input-field">
                                <label>Select Activity</label>
                                <select className="selectbox" value={activityName} onChange={(e)=>{activityNamefun(e)}}>
                                    <option>Select Activity</option>
                                    {activityData.map((res)=>(
                                        <option key={res._id} value={res._id} style={{width:'10px'}}>{res.ACTIVITY}{res.SpecificMotion}</option>
                                    ))}
                                    {error&&activityName.length<=0?<p className='text-danger'>Select Activity Name</p>:""}
                                </select>
                            </div>
                            <div className="input-field">
                                <label>Activity Description</label>
                                <textarea placeholder="Description" value={activityDesc} onChange={(e)=>{setActivityDesc(e.target.value)}}></textarea>
                                {error&&activityDesc.length<=0?<p className='text-danger'>Enter Activity Description</p>:''} 
                            </div>
                            <div className="input-field">
                                <label>MET Value</label>
                                <input type="text" placeholder="Value" value={activityMetvalue} onChange={(e)=>{setMetvalue(e.target.value)}} disabled/>
                                {error&&activityMetvalue.length<=0?<p className='text-danger'>Enter Met value</p>:''} 
                            </div>
                            <div className="input-field">
                                <label>Activity Duration</label>
                                <input type="number" placeholder="Time" value={activityDuration} onChange={(e)=>{setDuration(e.target.value)}}/>
                                <label>Enter duration in minutes</label>
                                {error&&activityDuration.length<=0?<p className='text-danger'>Enter Activity Duration</p>:''} 
                            </div>
                            {insertedMess}
                            <div className="input-field input-field-btn btn-set--center">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                                <button type="submit" className="btn btn-primary" data-dismiss="modal">Save</button>
                            </div>
                        </form>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    </div>
    </> );
}

export default Userlist;