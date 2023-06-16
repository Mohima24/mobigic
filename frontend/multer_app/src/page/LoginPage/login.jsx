

import React, { useContext, useState } from 'react';
import { FaUserCircle } from 'react-icons/fa';
import Input from "../../component/SignupCompo/Input";
import '../SignupPage/signup.css';
import SocialIcons from '../../component/SignupCompo/SocialIcons';
import UserContext from '../../context/UserContext/userContext';
import { Link } from 'react-router-dom';
import AlertCompo from '../../component/AlertCompo';


const obj = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
}

const inputArray = [
    {type:'email',placeholder:'Enter Email' ,name:"email"},
    {type:'password',placeholder:'Enter Password' ,name:"password"}
]

const icons = [
    {style:{width: "30px", cursor: 'pointer'},img:"https://www.freepnglogos.com/uploads/google-logo-png/google-logo-png-webinar-optimizing-for-success-google-business-webinar-13.png",lable:"Continue With Google"},
    {style:{ width: "27px", cursor: 'pointer' },img:"https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Facebook_Logo_%282019%29.png/640px-Facebook_Logo_%282019%29.png",lable:"Continue With Facebook"}
]

const SignupPage = () => {

    const [click,setClick] = useState(false)
    const [formData, setFormData] = useState(obj);
    const context = useContext(UserContext);
    const {loginUser, res ,err , setErr} = context;
    const handlChange = (e) => {
        setFormData({...formData,[e.target.name]:e.target.value})
    }
    const handleClick = (e) =>{

        e.preventDefault()
        loginUser(formData)
        setClick(true)
        setErr(false)
    }

    return (
        <>
        {click && (<AlertCompo status={err?"error":"success"} msg ={res.message}/>
        )}
    <div className='signup'>
        <h1>Login</h1>
        <div>
            <FaUserCircle style={{ fontSize: '3rem', color: '#696969', margin: '10px 0' }} />
        </div>
        <form>
            <div>
                {inputArray.map((el,i)=>{
                    return <Input key={i} type={el.type} placeholder={el.placeholder} name={el.name} handlefun={handlChange}/>
                })}
                <input type="submit" value="Continue" onClick={handleClick}/>
            </div>
        </form>
        <div className="SocialIcons">
            {icons.map((el,i)=>{
                return <SocialIcons key={i} style={el.style} lable={el.lable} imglink={el.img} />
            })}
        </div>
        <p>Don't have an account?<Link to="/signup">Sign up</Link></p>
    </div>
    </>)
}
export default SignupPage