import logo from '../assets/img/logo.png'
import {Link, useParams} from 'react-router-dom'
import { useEffect, useState } from 'react';
function Userdata() {
    const {id}=useParams();
    const[uname,setUname] =useState('')
    const [food,setFood]=useState([]);
    const [bmr,setbmr]=useState('');
    const [weight,setWeight]=useState('')
    const [calOut,setcalOut]=useState('')
    const [date,setDate]=useState('');
    let calout=[]
    // let netcal=[]
    useEffect(()=>{
        fetch(`/api/viewuserdata/${id}`).then((res)=>{return res.json()}).then((data)=>{setUname(data.user.name);setWeight(data.user.weight);setFood(data.food);setbmr(parseFloat(data.user.bmr).toFixed(2));setcalOut(data.calout);})},[])
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
    function netcal(calaroies,bmr,keys){
        return parseFloat(calaroies-bmr-calout[keys]).toFixed(2)
    }
    function viewByDate(e,date){
        e.preventDefault();
        let datee={date};
        fetch(`/api/viewbydat/${id}`,
        {method:'POST',
        headers:{"Content-Type": "application/json"},
        body:JSON.stringify(datee)
    }).then((res)=>{return res.json()}).then((data)=>{
        setUname(data.user.name);setWeight(data.user.weight);setFood(data.food);setbmr(parseFloat(data.user.bmr).toFixed(2));setcalOut(data.calout);
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
            <div className="container user-all-date-data">
                <div className="title-row">
                    <h1 className="title">{uname}</h1>
                </div>
                <div className="date-input-card">
                <div className="date-input">
                <form onSubmit={(e)=>{viewByDate(e,date)}}>
                            <input type="date" placeholder="Age" value={date} onChange={(e)=>{setDate(e.target.value)}} />
                            <button type="submit" className='btn btn-primary my-2'>Search By Date</button>
                        </form>
                    </div>
                </div>
                
                <div className="user-list ">
                    <div className="white-card">
                        <h2>All Data</h2>
                        <table className="dcf-table dcf-table-responsive dcf-table-bordered dcf-table-striped dcf-w-100%">
                            <thead>
                                <tr>
                                    <th scope="col">Date</th>
                                    <th scope="col">BMR</th>
                                    <th scope="col">Calorie In</th>
                                    <th scope="col">Calorie Out</th>
                                    <th scope="col">Net Calorie</th>
                                    <th scope="col">Action</th>
                                </tr>
                            </thead>
                            {food.length===0?<tbody><tr><td colSpan={6}><h1 className='text-center'>No data Found</h1></td></tr></tbody>:<>
                            {food.map((res,keys)=>(
                                <tbody key={res._id}>
                                <tr>
                                    <th scope="row">{res.date}</th>
                                    <td data-label="BMR">{bmr}</td>
                                    <td data-label="Calorie In">{res.calaroies}</td>
                                    <td data-label="Calorie Out">{caloout(res.date)[keys]}</td>
                                    <td data-label="Net Calorie">{netcal(res.calaroies,bmr,keys)}</td>
                                    <td data-label="Action">
                                        <div className="btn-set">
                                          <Link className="btn-secondary" to={`/view/userdetails/${id}`}>View</Link>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                            ))}
                            </>
                            }
                               
                        </table>
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

export default Userdata;