import React from "react";

import { App } from "./App";
import { ToastContainer } from 'react-toastify';
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import ReactDOM from "react-dom";
import { BiconomyProvider } from "./components/Hooks/Connection";
import { UseAlchemy } from "./components/Hooks/Connection";
import { Transition } from '@headlessui/react';
ReactDOM.render(
    <React.StrictMode>
  
      <BrowserRouter>
      
        <Routes>
        
          <Route path="*" element={ <App /> }>
          
          </Route>
        </Routes>

       
      </BrowserRouter>
      
      <ToastContainer/>
      <Transition show={true}/>
    </React.StrictMode>,
    document.getElementById('root')
  );
  