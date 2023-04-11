import React, { useState, useEffect, Component} from 'react'; 
import cx from 'clsx'; 
import { 
    CardContent, Avatar, 
    Divider, Card, 
    IconButton, Button, 
    Typography, CardHeader, 
    CardMedia, CardActions, 
    
} from '@mui/material';
import { lightBlue, red,  } from '@mui/material/colors';
import { BackHand, ExpandMoreRounded, Home, Face2TwoTone} from '@mui/icons-material';
import { useParams } from 'react-router-dom';
import { supabase } from '../client';
import { CrewProps } from './CrewHome';



const CrewProfile : React.FC = () => {

    const param = useParams(); 
    const [dbRecords, setdbRecords ] = useState<any>([ ])
    const [chk, setChk] = useState(true); 

    const [form, setForm] = useState<CrewProps | any>({ 
        name : "try",
        home : "ok", 
        address : "ok", 
        age : 50,
        id : 0,
        created_at : 'try'
    });

    const fetchMember = async () => {

        //console.log( param.symbol )
        const data= await supabase
            .from('Posts')
            .select()
            .eq('id', param.symbol).then ( res => setForm( res?.data[0] ) )

       // console.log( dbRecords )

        //setForm (dbRecords[0])

        console.log(form)
        setChk(true)
    }

    useEffect( () => {
        fetchMember();
    }, [chk,])

    

    return ( 

        <div> 

        <Card sx={{ width: 400, height:500, padding:10, backgroundColor:"transparent"}} content='center'>
        <CardContent>
            <CardHeader 
                avatar= { 
                    <Avatar sx={{ bgcolor: lightBlue[500]}} aria-aria-label='recipe'> 
                        <Face2TwoTone />
                    </Avatar>
                } 
            />
            <CardMedia 
                component='img'
                height='200'
                width='400'
                image = 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8dG9reW98ZW58MHx8MHx8&auto=format&fit=crop&w=700&q=60'
            
            />
            <Typography sx={{fontSize: 32, }} color="text.secondary" gutterBottom border={1} fontStyle={'Raleway'}>
                {form.name}
            </Typography>
            <Typography sx={{fontSize: 19}} color="black" gutterBottom border={1} fontStyle={'Raleway'}>
                🪪 : {form.id}
            </Typography>
            <Typography sx={{fontSize : 20 }} color="black" border={1}>
                📮 : {form.address}
            </Typography>
            <Typography sx={{fontSize : 23 }} color="black" border={1}>
                🏡 :{form.home}
            </Typography>
            <Typography sx={{fontSize : 23 }} color="black" border={1}>
                👧 :{form.age}
            </Typography>
            <Typography sx={{fontSize : 23 }} color="black" border={1}>
                📆:{new Date(form.created_at).toDateString()}
            </Typography>
        </CardContent>
        <CardActions>
            <IconButton aria-label="go back" href='http://localhost:5173' size='large'> <Home/> </IconButton>
        </CardActions>
    </Card>
    </div>

    ); 


}; 

export default CrewProfile; 