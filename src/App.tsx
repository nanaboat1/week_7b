import React from "react";
import CrewHome, { CrewProps } from "./components/CrewHome";



const  App = ( ) => {


  const initialData : CrewProps =  {
    name : '', 
    age : 0, 
    home : '', 
    address : '',
    id : 0,
    created_at : '' 


  }

  return( 
    <div>
      <CrewHome  />
    </div>


  );


}; 


export default App; 