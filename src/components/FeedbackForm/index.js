import React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';

import styles from './FeedbackForm.module.css';

import {AuthContext} from '../../context/AuthProvider'

import CustomerService from '../../service/CustomerService'

export default function FeedbackForm(props){
    const [writer_name, setWriter_name] = React.useState('')
    const [content, setContent] = React.useState('')
    const [stars, setStars] = React.useState(5)
    const [customerId, dispatch] = React.useContext(AuthContext)

    React.useEffect(() => {
        if(customerId > 0){
            CustomerService.getOneById(customerId).then((res) => {
                let customer = res.data
                setWriter_name((customer.first_name ? customer.first_name : '') + ' ' + (customer.last_name ? customer.last_name : ''))
            })
        }
    }, [customerId])

    const onSaveFeedback = (e) => {
        let feedback = {
            writer_name, 
            content,
            stars,
            date_created: new Date(),
            book: {id: props.bookId},
            customer: {id: customerId}
        }
        props.onSaveFeedback(feedback)
    }

    return (
        <Dialog open={props.open} onClose={props.onClose} maxWidth='xl' 
        sx={{'& .MuiPaper-root' : {minWidth: window.innerWidth > 480 ? window.innerWidth / 2 : window.innerWidth}}}>
            <DialogTitle>Viết đánh giá sản phẩm</DialogTitle>
            <DialogContent>
                <Box
                
                component="form"
                sx={{
                    '& .MuiTextField-root': { width: '100%' },
                    // '& .MuiFormControlLabel-root': { m: 1, width: '30%' },
                }}
                noValidate
                autoComplete="off"
                >
                    <Rating 
                    className={styles.stars} 
                    value={stars} 
                    onChange={(e, value) => {setStars(value)}}
                    />
                    <TextField
                        value={writer_name}
                        onChange={(e) => {setWriter_name(e.target.value)}}
                        margin="dense"
                        id="writer_name"
                        label="Tên người viết"
                        fullWidth
                        variant="outlined"
                    />
                    <TextField
                        value={content}
                        onChange={(e) => {setContent(e.target.value)}}
                        margin="dense"
                        id="content"
                        label="Đánh giá"
                        fullWidth
                        variant="outlined"
                        multiline
                        rows={10}
                    />
                </Box>
            </DialogContent>
            <DialogContent>
                <DialogActions sx={{padding: 0}}>
                    <Button variant="outlined" onClick={props.onClose}>Hủy</Button>
                    <Button variant="contained" onClick={onSaveFeedback}>Gửi nhận xét</Button>
                </DialogActions>
            </DialogContent>
            
        </Dialog>
    )
}