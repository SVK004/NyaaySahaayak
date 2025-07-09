import React,{useState, props, useRef } from 'react';
import Style from './user.module.css'
import { useNavigate } from 'react-router-dom';


import { AiOutlineUser } from "react-icons/ai";
import { MdOutlineDarkMode } from "react-icons/md";
import { PiSignOutDuotone } from "react-icons/pi";



function User({changeMode, mode, username, email}) {

  const navigate = useNavigate();
  //   function for logging out.(Should call this function when the logoutButton is clicked in AccountDetails)
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    localStorage.removeItem('email');
    navigate('/');
    console.log('User logged out');
  };
  const changePassword = () => {
    console.log("change pass called")
    navigate('/pschange')
  }

  return (
    <div className={Style.userblock} style={{ backgroundColor: mode ? "#BFDBF7" : "" }}>
      <span className={Style.arrow}></span>
      <div className={Style.userinfo} style={{backgroundColor: mode ? "#022B3A" : "" }}>
        <div className={Style.info}>
          <div className={Style.box} style={{backgroundColor:mode ? "#BFDBF7" : ""}}></div>
          <div className={Style.info2}>
            <ul>
              <p title={username}><strong>{username.split('"').join('')}</strong></p>
              <p title={email}>{email.split('"').join('')}</p>
            </ul>
          </div>
        </div>
        <div style={{ fontSize: "20px" }} className={Style.step1}>
          <AiOutlineUser onClick={changePassword}/>
          <div onClick={changePassword}>
          <p title="profile isn't ready at !">Change Password</p>
          </div>
        </div>
        <div style={{ fontSize: "20px" }} className={Style.step2} onClick={changeMode}>
          <MdOutlineDarkMode />
          <p>Switch Mode</p>
        </div>
      </div>
      <div style={{ fontSize:'20px'}} onClick={handleLogout} className={Style.step3}>
        <PiSignOutDuotone />
        <p>Sign out</p>
      </div>
    </div>
  )
}

export default User