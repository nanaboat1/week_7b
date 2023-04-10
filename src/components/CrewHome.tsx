import './CrewHome.css';
import { useState, useEffect} from "react";
import React from "react";
import { addCrew, readTeam, deleteCrew, updateCrew } from "../actions"; 
import { 
        Box, Button, TextField, Typography, 
        Card, CardContent, Collapse, Avatar, CardActionArea, 
        CardActions

} from "@mui/material";
import { Dialog } from '@mui/material'
import { Height } from '@mui/icons-material';

export interface CrewProps { 
    id : undefined | number ; 
    created_at : undefined | any; 
    home : string; 
    name : string; 
    age : number; 
    address : string; 
}; 

//
const CrewHome : React.FC = ( ) => {

    // state variables. 
    const [form, setForm] = useState({ 
        name : "",
        home : "", 
        address : "", 
        age : 50,
    });
    const [ open, setOpen ] = useState(false);
    const [dbRecords, setdbRecords ] = useState<any[]>([ ])

    const openDialog = () => setOpen(true) 
    const closeDialog = () => setOpen(false); 


    useEffect( () => { 
        readDatabase()


    }, [form,])

    
    // form submission update
    const handleName = ( event : any)=>{
        console.log(event.target.value )
        setForm(constVals => ({
                ...constVals,
                name : event.target!.value,
        }));

    } 

    const handleHome = ( event : any)=>{

        console.log(event.target.value )
        setForm(constVals => ({
                ...constVals,
                home : event.target!.value,
        }));
    }

    const handleAddr = ( event : any)=>{

        console.log(event.target.value )
        setForm(constVals => ({
                ...constVals,
                address : event.target!.value,
        }));

    }

    const handleAge = ( event : any)=>{

        console.log(event.target.value )
        setForm(constVals => ({
                ...constVals,
                age : event.target!.value,
        }));

    }


    // card tile for a Crew.
    const Crew : React.FC<CrewProps> = ( {id, created_at, name, home, address, age} : CrewProps) =>{ 

        //console.log ( id)
        return ( 
            <Card sx={{ maxWidth : 500 }}>
                <CardActionArea>
                    <CardContent>
                        <Typography gutterBottom variant='h6' component={'div'}>
                            {name}
                        </Typography>
                        <Typography gutterBottom variant='h6' component={'div'}>
                            {address}
                        </Typography>
                        <Typography gutterBottom variant='h6' component={'div'}>
                            {home}
                        </Typography>
                        <Typography gutterBottom variant='h6' component={'div'}>
                            {age}
                        </Typography>
                        
                    </CardContent>
                </CardActionArea>
                <CardActions>
                    <Button size='small' variant='contained' > 
                        Delete
                    </Button>
                    <Button size='small' variant='contained' onClick={() => { updateData(id)}}> 
                        Edit
                    </Button>

                </CardActions>

            </Card>

        ); 

    }


    // add data to supabase.
    const addCrewForm = () => {

        return (
            <Dialog open={open} onClose={closeDialog} > 
            <Box
                component={"form"}
                sx={{
                    '& .MuiTexField-root' : { m: 1, width: '25ch'}
                }}
                height={350}
                width={300}
                whiteSpace={'break-spaces'}
                noValidate
                autoComplete="off"
                
            >
                <div className="crew-home">
                    <TextField 
                        required
                        id="outlined-required"
                        label="Name"
                        value = {form.name}
                        onChange={handleName}
                        
                    />
                    <TextField 
                        required
                        id="outlined-required"
                        label="Hometown"
                        value={form.home}
                        onChange={handleHome}
                    />
                    <TextField 
                        required
                        id="outlined-required"
                        label="Address"
                        value={form.address}
                        onChange={handleAddr}
                    />
                    <TextField 
                        required
                        type='number'
                        id="outlined-required"
                        label="Age"
                        value={form.age}
                        onChange={handleAge}
                    /> 

                </div>
                <Button variant='contained' onClick={sendData}> Submit </Button>
            </Box>
            </Dialog>

        ); 


    }; 
    const a: any = [1,2,3,4,5]

    const sendData  = () => {

        // get current form data
        const toForm : CrewProps = {
            name : form.name,
            address : form.address, 
            age : form.age, 
            home : form.home, 
            id : -1, 
            created_at : 'unknown'
        }
        addCrew ( toForm ); 
    }

    const updateData = (id : number | undefined) => {

        // lets read data first.

        openDialog(); 
        // get current form data
        // get id of current obj then populate in form. using setState
        const toForm : CrewProps = {
            name : dbRecords[id!-1].name,
            address : dbRecords[id!-1].address, 
            age : dbRecords[id!-1].age, 
            home: dbRecords[id!-1].home, 
            id : dbRecords[id!-1].id, 
            created_at : dbRecords[id!-1].created_at
        }
        setForm( toForm);

        updateCrew( toForm );



    }

    const readDatabase = () => {

       // new way of working with promise.
       const data   = readTeam().then ( (res : any) => {
        setdbRecords (res)
       }
       );

       console.log ( dbRecords)

       
    }
    


    const toForm : CrewProps = {
        name : form.name,
        address : form.address, 
        age : form.age, 
        home : form.home, 
        id : -1, 
        created_at : 'unknown'

    }



    return ( 

        <div >
            <Button onClick={openDialog} variant='contained'> Dialog </Button>
            {addCrewForm()}
            {}
            
            <div className='crew-home' > 
             <Crew />
             { dbRecords.map(( field : CrewProps) => <Crew {...field}/> )}
            </div>
            

        </div>
    )
}; 

export default CrewHome; 