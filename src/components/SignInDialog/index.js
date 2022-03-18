import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import PropTypes from 'prop-types';
// import SwipeableViews from 'react-swipeable-views';
import { useTheme } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

import SignInForm from '../SignInForm'
import SignUpForm from '../SignUpForm'

function TabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`full-width-tabpanel-${index}`}
        aria-labelledby={`full-width-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 3 }}>
            {children}
          </Box>
        )}
      </div>
    );
}
  
TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};
  
function a11yProps(index) {
    return {
      id: `full-width-tab-${index}`,
      'aria-controls': `full-width-tabpanel-${index}`,
    };
}

export default function SignInDialog(props) {
    // const [open, setOpen] = React.useState(props.open);
  
    // const handleClickOpen = () => {
    //   setOpen(true);
    // };
  
    // const handleClose = () => {
    //   setOpen(false);
    // };

    const theme = useTheme();
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleChangeIndex = (index) => {
        setValue(index);
    };
  
    return (
      <div>
        {/* <Button variant="outlined" onClick={handleClickOpen}>
          Open form dialog
        </Button> */}
        <Dialog open={props.open} onClose={props.handleClose}>
            <AppBar position="static">
                <Tabs
                value={value}
                onChange={handleChange}
                indicatorColor="secondary"
                textColor="inherit"
                variant="fullWidth"
                aria-label="full width tabs example"
                >
                <Tab label="Đăng nhập" {...a11yProps(0)} />
                <Tab label="Đăng ký" {...a11yProps(1)} />
                </Tabs>
            </AppBar>
            <DialogContent>
                <TabPanel value={value} index={0} dir={theme.direction}>
                    <SignInForm onClose={props.handleClose}/>
                </TabPanel>
                <TabPanel value={value} index={1} dir={theme.direction}>
                    <SignUpForm onClose={props.handleClose}/>
                </TabPanel>
            </DialogContent>
          {/* <DialogTitle>Subscribe</DialogTitle> */}
          {/* <DialogContent>
            <DialogContentText>
              To subscribe to this website, please enter your email address here. We
              will send updates occasionally.
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Email Address"
              type="email"
              fullWidth
              variant="standard"
            />
          </DialogContent> */}
          {/* <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={handleClose}>Subscribe</Button>
          </DialogActions> */}
        </Dialog>
      </div>
    );
  }