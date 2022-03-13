import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import WhatshotIcon from '@mui/icons-material/Whatshot';

export default function ButtonAppBar(props) {
  return (
    <Box sx={{ flexGrow: 1 , padding: 0}}>
      <AppBar position="static" sx={{backgroundColor: props.backgroundColor}}>
        <Toolbar>
            <IconButton
                size="large"
                edge="start"
                color="error"
                aria-label="menu"
                sx={{ mr: 2 }}
            >
                {props.icon}
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 , color: "#333"}}>
                {props.title}
            </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
}