import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import Base from "./base";
import { ToastContainer } from 'react-toastify';

import { BiconomyProvider } from "./Hooks/Connection";
import { UseAlchemy } from "./Hooks/Connection";


import Nav from "./nav";
const Layout = () => {
  const {ownerAddress,accountAddress,provider, handleLogin,userInfo,loading,Logout} = UseAlchemy();


  useEffect(() => {
    {
      const checkLog = localStorage.getItem("CheckLogin") ;
      // const check = userInfo;

      console.log(checkLog);

      if(checkLog == "Yes"){
        handleLogin();
      }
    }
  }, []);

  
  
  return (
    
    <div>
      <Nav/>
      <ToastContainer/>
      <Outlet />
    </div>  
    
  );
};

export default Layout;