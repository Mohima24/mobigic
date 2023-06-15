import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import "./navbar.css"
const data = JSON.parse(localStorage.getItem('loginres'))

const Navbar = () => {
  const [ auth, setAuth ] = useState(null);
  useEffect(() => {
    const storeData = JSON.parse(localStorage.getItem('loginres'));
    if (storeData) {
      setAuth(storeData);
    }
    return ()=>{

    }
  }, [])
  console.log(auth)
  const handleClick = () =>{
    setAuth(null)
    localStorage.setItem('loginres',null)
  }
  return (
    <nav>
      <ul>
        <li>
          <NavLink exact to="/" activeClassName="active" className="Navcolor">
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/about" activeClassName="active" className="Navcolor">
            About
          </NavLink>
        </li>
        <li>
          <NavLink to="/contact" activeClassName="active" className="Navcolor">
            Contact
          </NavLink>
        </li>
        <li>
          
          {auth?(<p>Welcome,{auth.findeuser.firstName}</p>):(<NavLink to="/login" activeClassName="active" className="Navcolor">
            Sign-In
          </NavLink>)}
        </li>
        <li>
          {auth && <button onClick={handleClick}>Log-out</button>}
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
