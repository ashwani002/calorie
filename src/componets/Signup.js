import '../assets/css/Global.css'
import logo from '../assets/img/logo.png'
import {Link,useNavigate} from 'react-router-dom'
import { useState } from 'react';
function Signup() {
    const[name,setName] =useState('')
    const[weight,setWeight] =useState('')
    const[height,setHeight] =useState('')
    const[gender,setGender] =useState('')
    const[age,setAge] =useState('')
    const[error,setError]=useState(false)
    const [usertaken,setUsertaken]=useState('')
    let navigate=useNavigate();
    function handleSignup(e){
        let bodydata={name,weight,height,gender,age}
        e.preventDefault();
        if(name.length===0||name.length>=32||weight.length===0||height.length===0||gender==='Select your Gender'||gender===''||age.length===0){
            setError(true);
            return false;
        }
        fetch('/api/signup',{
            method:'POST',
            headers:{"Content-Type": "application/json"},
            body:JSON.stringify(bodydata)
        }).then((res)=>{return res.json()}).then((data)=>{if(data.message==='Data is been saved'){
            navigate('/')
        }else{
            setUsertaken(data.message);
        }})
    }
    return ( <>
         <div>
            <header className="header">
                <div className="container">
                    <div className="logo">
                        <Link to="/">
                            <img src={logo} alt="logoimg"/>
                        </Link>
                    </div>
                </div>
            </header>
            <div className="mid-container">
                <div className="signup-container">
                    <div className="white-card">
                        <h1>Sign Up</h1>
                        <div className="card-body">
                        <form onSubmit={(e)=>{handleSignup(e)}}>
                            <div className="input-field">
                                <label>Name</label>
                                <input type="text" placeholder="Name" value={name} onChange={(e)=>{setName(e.target.value)}}/>
                                {error&&name.length<=0?<p className='text-danger'>Name can't be empty</p>:""}
                                {error&&name.length>=23?<p className='text-danger'>Name can not excceds from 23 character</p>:""}
                            </div>
                            <div className="input-field">
                                <label>Weight</label>
                                <input type="number" placeholder="Weight" value={weight} onChange={(e)=>{setWeight(e.target.value)}}/>
                                <label htmlFor="">*Enter Weight in KG</label>
                                {error&&weight.length<=0?<p className='text-danger'>Wieght cant be empty</p>:""}
                            </div>  
                            <div className="input-field">
                                <label>Height</label>
                                <input type="number" placeholder="Height" value={height} onChange={(e)=>{setHeight(e.target.value)}}/>
                                <label>*Enter height in cm</label>
                                {error&&height.length<=0?<p className='text-danger'>Height cant be empty</p>:""}
                            </div>
                            <div className="input-field">
                                <label>Gender</label>
                                <select className="selectbox" value={gender} onChange={(e)=>{setGender(e.target.value)}}>
                                    <option>Select your Gender</option>
                                    <option>Male</option>
                                    <option>Female</option>
                                </select>
                                {error&&gender.length<=0?<p className='text-danger'>Please select your gender</p>:""}
                            </div>
                            <div className="input-field">
                                <label>Date Of Birth</label>
                                <input type="date" placeholder="Age" value={age} onChange={(e)=>{setAge(e.target.value)}}/>
                                {error&&age.length<=0?<p className='text-danger'>Enter date</p>:""}
                            </div>
                            {usertaken}
                            <div className="input-field btn-set--right">
                            </div>
                                <button className="btn-primary">Sign Up</button>
                        </form>
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

export default Signup;