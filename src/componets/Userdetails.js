import { useEffect, useState } from 'react';
import { useParams,Link } from 'react-router-dom';
import logo from '../assets/img/logo.png'
function Userdetails() {
    const {id}=useParams();
    const [uname,setuname]=useState('')
    const [food,setfood]=useState([]);
    const [calOut,setcalOut]=useState([])
    const [bmr,setbmr]=useState('');
    const [weight,setWeight]=useState('')
    const [date,setDate]=useState('');
    let totalActivity=null;
    let totalFood=null;
    let calout=[]
    useEffect(()=>{
        fetch(`/api/viewuserdata/${id}`).then((res)=>{return res.json()}).then((data)=>{
            setfood(data.food);
            setuname(data.user.name);
            setbmr(parseFloat(data.user.bmr).toFixed(2))
            setcalOut(data.calout);
            setWeight(data.user.weight)
        })}
        ,[id])
        // function activityname(ids){
        //     fetch(`/api/actname/${ids}`).then((res)=>{return res.json()}).then((data)=>{
        //         act.push(data.actname)
        //     })
        //     return act
        // }
        function caloout(date){
            for(let a in calOut){
               let caldate=calOut[a].date
                let userid=calOut[a].userId
                let met=calOut[a].met
                let duration=calOut[a].duration/60
                if(caldate===date&&userid===id){
                   calout.push(parseFloat(met*weight*duration).toFixed(2));
                }
            }
            return calout
            
        }
        function viewByDate(e,date){
            e.preventDefault();
            let datee={date};
            fetch(`/api/viewbydat/${id}`,
            {method:'POST',
            headers:{"Content-Type": "application/json"},
            body:JSON.stringify(datee)
        }).then((res)=>{return res.json()}).then((data)=>{
            setfood(data.food);
            setuname(data.user.name);
            setbmr(parseFloat(data.user.bmr).toFixed(2))
            setcalOut(data.calout);
            setWeight(data.user.weight)
        })}
        

    return ( <>
         <div>
        <header className="header">
            <div className="container">
                <div className="logo">
                    <Link to='/'>
                        <img src={logo} alt="logo here"/>
                    </Link>
                </div>
            </div>
        </header>
        <div className="mid-container">
            <div className="container">
                <div className="title-row">
                    <h1 className="title">{uname}</h1>
                </div>
                
                <div className="view-calorie-data">
                <div className="view-calorie-data-date-input">
                        <div className="date-input">
                        <form onSubmit={(e)=>{viewByDate(e,date)}}>
                            <input type="date" placeholder="Age" value={date} onChange={(e)=>{setDate(e.target.value)}}  />
                            <button type="submit" className='btn btn-primary my-2'>Search By Date</button>
                        </form>
                        </div>
                        <div className="show-selected-date">
                            {date}
                        </div>
                    </div>
                    <div className="view-calorie-data-chart">
                        <div className="food-data white-card">
                            <h2>Food Data</h2>
                            <div className="food-data-table">
                                <table
                                    className="dcf-table dcf-table-responsive dcf-table-bordered dcf-table-striped dcf-w-100%">
                                    <thead>
                                        <tr>
                                            <th scope="col">Date</th>
                                            <th scope="col">Meal Type</th>
                                            <th scope="col">Food Group</th>
                                            <th scope="col">Serving</th>
                                            <th scope="col">Calorie In</th>
                                        </tr>
                                    </thead>
                                    {food.length===0?
                                        <tbody><tr>
                                        <td colSpan={5}><h1>No data Found</h1></td>
                                        </tr>
                                    </tbody>:
                                    <tbody>
                                        {food.map((res,keys)=>(
                                            <tr key={res._id}>
                                            <th scope="row">{res.date}</th>
                                            <td data-label="Meal Type">{res.mealType}</td>
                                            <td data-label="Food Group">{res.foodGroup}</td>
                                            <td data-label="Serving">{res.serving}</td>
                                            <td data-label="Calorie In">{res.calaroies}</td>
                                            {/* <td data-label="Calorie Out" hidden>{caloout(res.date,res.userId)[keys]}</td> */}
                                        </tr>
                                        ))}
                                    </tbody>
                                    }
                                </table>
                            </div>
                        </div>
                        <div className="activity-data white-card">
                            <h2>Activity Data</h2>
                            <div className="activity-data-table">
                                <table
                                    className="dcf-table dcf-table-responsive dcf-table-bordered dcf-table-striped dcf-w-100%">
                                    <thead>
                                        <tr>
                                            <th scope="col">Date</th>
                                            <th scope="col">Name</th>
                                            <th scope="col">Description</th>
                                            <th scope="col">MET Value</th>
                                            <th scope="col">Duration</th>
                                            <th scope="col">Calorie Out</th>
                                        </tr>
                                    </thead>
                                        {calOut.length===0?<tbody><tr><td colSpan={5}><h1>No record Found</h1></td></tr></tbody>:<>
                                        {calOut.map((res,keys)=>(
                                    <tbody key={res._id}>
                                            <tr>
                                            <th scope="row">{res.date}</th>
                                            <td data-label="Name" >{res.name}</td>
                                            <td data-label="Description">{res.desc}</td>
                                            <td data-label="MET Value">{res.met}</td>
                                            <td data-label="Duration">{res.duration}min.</td>
                                            <td data-label="Calorie Out">{caloout(res.date)[keys]}</td>
                                        </tr>
                                    </tbody>
                                        ))}
                                        </>
                                        }
                                </table>
                            </div>
                        </div>
                        <div className="net-calorie-data white-card">
                            <h2>Net Calorie</h2>
                            <div className="net-calorie-table">
                                <div className="net-calorie-row">
                                    <strong>BMR: </strong>
                                    <span>{bmr}</span>
                                </div>
                               
                                <div className="net-calorie-row">
                                    <strong>Food: </strong>
                                    {food.length===0?<><span>0</span></>:
                                    <span>
                                    {food.reduce((total,item)=>{
                                        totalFood=total+Number(item.calaroies)
                                        return total + Number(item.calaroies)
                                    },0)}
                                    </span>
                                    }
                                </div>
                                <div className="net-calorie-row">
                                    <strong>Activity: </strong>
                                    {calOut.length===0?<><span>0</span></>:
                                    <span>{calout.reduce((total,item)=>{
                                        totalActivity=total+Number(item)
                                        return total + Number(item)
                                    },0)}</span>
                                    }
                                </div>
                                <div className="net-calorie-row net-calorie-totl">
                                    <strong>Net Calorie:</strong>
                                    <span>{totalFood-bmr-totalActivity===(-Math.abs(bmr))?'0':totalFood-bmr-totalActivity}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <footer className="footer">
            <div className="container">
                <p>2022 LMD Consulting, LLC , All Rights Reserved</p>
            </div>
        </footer>
    </div>
    
    </> );
}

export default Userdetails;