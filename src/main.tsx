import React from "react";
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import Layout from "./routes/Layout";
import CrewProfile from "./components/CrewProfile";



// react 18 api
const container = document.getElementById('root'); 
const root = createRoot( container! ); 

// rendering based on routes. 
root.render( 

  <BrowserRouter> 

    <Routes> 
      <Route path="/" element={<Layout />}>
        <Route index={true} path="/" element={<App />} />
      </Route>

      <Route index={true} path='/CrewProfile/:symbol' element={<CrewProfile />} />
    


    </Routes>
  
  
  
  </BrowserRouter>


); 

// add custome render there. 