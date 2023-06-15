
import React, { useState } from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Otp from './page/OtpVarify/Otp';
import SignupPage from './page/SignupPage/signupPage';
import { CSSReset } from '@chakra-ui/react';
import Login from './page/LoginPage/login';
import Index from './page/IndexPage';
import About from './page/AboutPage/about';

function App() {

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Index/>}/>
        <Route path="/about" element={<About/>}/>
        <Route path="/signup" element={<SignupPage />}/> 
        <Route path="/verifyOTP" element={<Otp/>}/>
        <Route path='/login' element={<Login/>}/>
      </Routes>
    </div>

  );
}

export default App;
