import React from 'react'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import {Link} from "react-router-dom";
import { Avatar } from '@mui/material';
import { boxClasses } from '@mui/system';

export default function Navbar() {
    let userId = 1;
  return (
    <Box sx={{ flexGrow: 1 }}>
    <AppBar position="static" style={{backgroundColor:"black"}}>
      <Toolbar>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1}}>
          <Link style={{textDecoration:"none", boxShadow:"none" ,color:"white", textAlign:"left"}} to="/">Home</Link>
        </Typography>

        <Typography variant="h6" component="div" sx={{ }}>
          <Link style={{textDecoration:"none", boxShadow:"none" ,color:"white", textAlign:"right"}} to={`/users/${userId}`}> Profil</Link>
        </Typography>

      </Toolbar>
    </AppBar>
  </Box>
  )
}
