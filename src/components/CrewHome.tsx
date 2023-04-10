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
    id : number ; 
    created_at : undefined | any; 
    home : string; 
    name : string; 
    age : number; 
    address : string; 
}; 

//
const CrewHome : React.FC = ( ) => {

    // state variables. 
    const [form, setForm] = useState<CrewProps>({ 
        name : "",
        home : "", 
        address : "", 
        age : 50,
        id : 0,
        created_at : ''
    });
    const [ open, setOpen ] = useState(false);
    const [dbRecords, setdbRecords ] = useState<any[]>([ ])
    const [dbFlag, setdbFlag] = useState(false)
    const [updt, setUpdt] = useState(false);

    const openDialog = () => setOpen(true) 
    const closeDialog = () => setOpen(false); 
    const openUpdt = () => setUpdt(true);
    const closeUpdt = () => setUpdt(false); 

    useEffect( () => { 
        readDatabase()

    }, [form, addCrew, deleteCrew])

    // form submission update
    const handleName = ( event : any)=>{
        setForm(constVals => ({
                ...constVals,
                name : event.target!.value,
        }));

    } 
    const handleHome = ( event : any)=>{
        setForm(constVals => ({
                ...constVals,
                home : event.target!.value,
        }));
    }
    const handleAddr = ( event : any)=>{
        setForm(constVals => ({
                ...constVals,
                address : event.target!.value,
        }));

    }
    const handleAge = ( event : any)=>{
        setForm(constVals => ({
                ...constVals,
                age : event.target!.value,
        }));

    }

    // card tile for a Crew.
    const Crew : React.FC<CrewProps> = ( {id, created_at, name, home, address, age} : CrewProps) =>{ 

        console.log ( id)
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
                    <Button size='small' variant='contained' onClick={() => { deleteCrew(id)}}> 
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
                <Button variant='contained' onClick={ () => {sendData(form.id)}}> Submit </Button>
            </Box>
            </Dialog>

        ); 


    }; 
    const sendData  = ( id : number ) => {

        // get current form data
        const toForm : CrewProps = {
            name : form.name,
            address : form.address, 
            age : form.age, 
            home : form.home, 
            id : id, 
            created_at : 'unknown'
        }
    
        addCrew ( toForm ); 
    
    } 

    const updtCrewForm = () => {
        return (
            <Dialog open={updt} onClose={closeUpdt} > 
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
                <Button variant='contained' onClick={ () => {updateData(form.id); closeUpdt()}}> Update </Button>
            </Box>
            </Dialog>
        ); 
    }

    const updateData = (id : number ) => {

        // lets read data first.
    
        // get current form data
        // get id of current obj then populate in form. using setState
      
        // filters to get specific id to update.
        const sendData = dbRecords.filter ((obj ) => obj.id === id )
     
        const toForm : CrewProps = {
            name : sendData[0].name,
            address : sendData[0].address, 
            age : sendData[0].age, 
            home: sendData[0].home, 
            id : sendData[0].id, 
            created_at : sendData[0].created_at
        }

        setForm( toForm );
   
        console.log (`id :${id}`)
        openUpdt(); 

        updateCrew( form );



    }

    const readDatabase = () => {
       // new way of working with promise.
       const data   = readTeam().then ( (res : any) => {
        setdbRecords (res)
       }
       );

       //console.log ( dbRecords )
    }
    


    const toForm : CrewProps = {
        name : form.name,
        address : form.address, 
        age : form.age, 
        home : form.home, 
        id : form.id, 
        created_at : 'unknown'
    }



    return ( 

        <div >
            <Button onClick={openDialog} variant='contained'> Add Crewmember </Button>
            {addCrewForm()}
            {updtCrewForm()}
            
            <div className='crew-home' > 
             { dbRecords.map(( field : CrewProps) => <Crew { ...field}/> )}
            </div>
            

        </div>
    )
}; 

export default CrewHome; 