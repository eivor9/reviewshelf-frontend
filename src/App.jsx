// DEPENDENCIES
import "./styles/App.css";
import bg_img from "./assets/bg_img.jpg"
import React, { useState } from 'react';
import { Routes, Route } from "react-router-dom";

// PAGES
import Users from "./Pages/Users";
import Home from "./Pages/Home";
import Reviews from "./Pages/Reviews";
import FourOFour from "./Pages/FourOFour";

function App() {

  return(
    <div className="App">
      <img src={bg_img} alt="background image" className="bg-img"/>
      <div className="main">
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/users" element={<Users/>}/>
          <Route path="/reviews/:user" element={<Reviews/>} />
          <Route path="*" element={<FourOFour/>} />
        </Routes>
      </div> 
    </div>
  )
}

export default App
