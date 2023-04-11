import './CrewHome.css';
import { useState, useEffect} from "react";
import React from "react";
import { addCrew, readTeam, deleteCrew, updateCrew } from "../actions"; 
import { 
        Box, Button, TextField, Typography, 
        Card, CardContent, Collapse, Avatar, CardActionArea, 
        CardActions,
        Skeleton,
        CardHeader,
        Divider,
        AvatarGroup,
        Link, 

} from "@mui/material";
import { Dialog } from '@mui/material'
import { Height } from '@mui/icons-material';
import { Assignment, Boy, Face, Face2, Face4, Face5 } from '@mui/icons-material';
import { green, red, blue, blueGrey, lightBlue, lightGreen } from '@mui/material/colors';

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
    const [rFlg, setrFlg] = useState(1);
    const [loading, setloading] = useState(false); 

    const openDialog = () => setOpen(true) 
    const closeDialog = () => setOpen(false); 
    const openUpdt = () => setUpdt(true);
    const closeUpdt = () => setUpdt(false); 


    useEffect( () => { 
        readDatabase();
        const timer = setTimeout(() =>{
            setloading(true);
        }, 5000)

        setloading(true);

        return () => clearTimeout(timer);

    }, [form, rFlg,loading])



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
            <Card sx={{ width : 320 }}>
                <CardHeader
                    avatar={
                        <Avatar sx={{ bgcolor: green[500]}} variant='rounded'>
                            <Assignment/>
                        </Avatar>
                    }
                    // call specific detail.
                > 
                    
                </CardHeader>
                <CardActionArea onClick={() => {
                    
                    
                }}>

                    <CardContent onClick={ () => {
                        

                    }} >
                    <Button href={`http://localhost:5173/CrewProfile/${id}`}> More</Button>
                    <AvatarGroup max={4}> 
                            <Avatar sx={{ bgcolor: red[300]}} variant='rounded'>
                                <Face/>
                            </Avatar>
                            <Avatar sx={{ bgcolor: lightBlue[500]}} variant='rounded'>
                                <Face2/>
                            </Avatar>
                            <Avatar sx={{ bgcolor: blueGrey[500]}} variant='rounded'>
                                <Face4/>
                            </Avatar>
                            <Avatar sx={{ bgcolor: lightGreen[500]}} variant='rounded'>
                                <Face4/>
                            </Avatar>
                            <Avatar sx={{ bgcolor: green[400]}} variant='rounded'>
                                <Face5/>
                            </Avatar>
                            </AvatarGroup>
                        <Typography gutterBottom variant='h4' sx={{ mt : 3, fontSize : 'md'}} textAlign={'center'} fontFamily={'-apple-system'}>
                            👔
                        </Typography>
                        <Typography gutterBottom variant='h6' sx={{ mt : 2, fontSize : 'md'}} textAlign={'center'} border={1} borderColor={'lightBlue'}>
                            {name}
                        </Typography>
                        <Typography gutterBottom variant='h6' sx={{ mt : 2, fontSize : 'md'}} textAlign={'center'} border={1}>
                            📮 : {address}
                        </Typography>
                        <Typography gutterBottom variant='h6' sx={{ mt : 2, fontSize : 'md'}} textAlign={'center'} border={1}>
                            🏡 : {home}
                        </Typography>
                        <Typography gutterBottom variant='h6'  sx={{ mt : 0.5, fontSize : 'md'}} textAlign={'center'} border={1}>
                            👧 : {age}
                        </Typography>
                        
                    </CardContent>
                </CardActionArea>
                <Divider />
                <CardActions >
                    <Button size='small' variant='contained' onClick={() => { rmvData(id)}}> 
                        Delete
                    </Button>
                    <Button size='small' variant='contained' onClick={() => { updateData(id)}}> 
                        Edit { id }
                    </Button>

                </CardActions>

            </Card>

        ); 

    }

    const rmvData = (id : number ) => {

        deleteCrew(id); 
        readDatabase();
        setrFlg(rFlg + 3);

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
        setrFlg(2);
        closeDialog();
        readDatabase()
    
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
        setrFlg(rFlg+ 4);
        readDatabase()

    }

    const readDatabase = () => {
       // new way of working with promise.
       const data   = readTeam().then ( (res : any) => {
        setdbRecords (res)
       }
       );

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
            <h1> Team Lounge</h1>
            <Button onClick={openDialog} variant='contained'> Add Crewmember </Button>
            {addCrewForm()}
            {updtCrewForm()}
            
            <div className='crew-home' > 
             { dbRecords.map(( field : CrewProps) => loading ? (<Crew { ...field}/> ) : <Skeleton variant='rectangular' width={200} height={60} />) }
            </div>
            

        </div>
    )
}; 

export default CrewHome; 