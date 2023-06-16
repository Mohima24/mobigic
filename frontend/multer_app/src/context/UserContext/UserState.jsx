import React, { useEffect, useState } from "react";
import UserContext from "./userContext";
import { useNavigate } from "react-router-dom";

const UserState = ({ children }) => {
    const [res, setRes] = useState({})
    const [err, setErr] = useState(false)
    const navigate = useNavigate();
    
    const url = "https://vast-bass-polo-shirt.cyclic.app/users";
  
    const postUser = (obj) => {

      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(obj),
      };
      
      fetch(`${url}/signup`, requestOptions)
        .then((response) => response.json())
        .then((data) => {
          setRes(data)
          if(data.status=="PENDING"){

              setTimeout(()=>{
                navigate("/verifyOTP");
              },1000)
            
          } else {
            setErr(true);
          }
        })
        .catch((err) => {
          console.log(err)
          setErr(true)
        });
    };

    const otpFun = (obj) => {
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(obj),
      };
      fetch(`${url}/verifyotp`, requestOptions)
      .then((response) => response.json())
      .then((data) => {
          setRes(data)
          if(data.status=="VERIFIED"){
            setTimeout(()=>{
              navigate("/login")
            })
          }else{
            setErr(true)
          }
      })
      .catch((err) => {
        setErr(true)
      });
    }

    const loginUser = (obj) => {

      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(obj),
      };
      
      fetch(`${url}/login`, requestOptions)
        .then((response) => response.json())
        .then((data) => {
          setRes(data)
          localStorage.setItem('loginres',JSON.stringify(data))
          if(data.status=="OK"){
            setTimeout(()=>{
              navigate("/");
            },1000)
          }else{
            setErr(true)
          }
        })
        .catch((err) => {
          setErr(true)
        });
    };

    return (
      <UserContext.Provider
        value={{ postUser , loginUser, otpFun, res , err ,setErr}}
      >
        {children}
      </UserContext.Provider>
    );
  };
  
  export default UserState;
  