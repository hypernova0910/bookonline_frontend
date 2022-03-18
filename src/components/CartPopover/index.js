import * as React from 'react';
import Popover from '@mui/material/Popover';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

export default function CartPopover(props){
    return (
        <Popover 
        // sx={{
        //     pointerEvents: 'none',
        // }}
        open={props.open}
        anchorEl={props.anchorEl}
        anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
        }}
        transformOrigin={{
            vertical: 'top',
            horizontal: 'center',
        }}
        onClose={props.onClose}
        
        // disableRestoreFocus
        >
            <Box 
            // onMouseEnter={props.onOpen} 
            onMouseLeave={props.onClose}>
                <Typography sx={{ p: 2 }}>Giỏ hàng ở đây</Typography>
            </Box>
        
        </Popover>
    )
}