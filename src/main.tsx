import React from "react";
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import Layout from "./routes/Layout";



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
    


    </Routes>
  
  
  
  </BrowserRouter>


); 

// add custome render there. 