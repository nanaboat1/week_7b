import { supabase } from "./client";
import { CrewProps } from "./components/CrewHome";
import { useState } from "react";

export const addCrew = async (payload : CrewProps) => {

    //event.preventDefault(); 
    try {  

        await supabase
        .from('Posts')
        .insert({ home : payload.home, name : payload.name, age : payload.age, address : payload.address,  });

        console.log(payload)

    } catch (e : any) {
        console.log(e)
    }
  
}; 

// read database entries
export const readTeam = async () => {

    const { data }  = await supabase
    .from('Posts').select();

    //console.log ( data); 

    return data;

}; 

export const updateCrew = async (payload : CrewProps) => { 

    console.log ( payload.id )
    await supabase 
    .from('Posts')
    .update({ id : payload.id, home : payload.home, name : payload.name, age : payload.age, address : payload.address, created_at : payload.created_at })
    .eq('id', payload!.id)
};

export const deleteCrew = async (id : number) => {
    await supabase
    .from('Posts')
    .delete()
    .eq('id', id)
};