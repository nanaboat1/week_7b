import '../App.css';
import { Outlet, Link } from 'react-router-dom';
import React from 'react';
import { Button, IconButton } from '@mui/material'; 
import { Home, } from '@mui/icons-material';
import HomeIcon from '@mui/icons-material/Home'


const Layout : React.FC = () => {

   return (

    <div>
        <nav>
            <Button variant='contained'>
                <HomeIcon /> 
                <Link to="/"> </Link>
            </Button>

        </nav>
        <Outlet />
    </div>


   ); 
};

export default Layout; 