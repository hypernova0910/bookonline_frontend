import * as React from 'react';
// import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import Button from '../Button'

import Constant from '../../common/Constant'
import commonStyles from '../../common/Common.module.css';

import CustomerService from "../../service/CustomerService";
import {AuthContext} from '../../context/AuthProvider'

import useSnackbar from '../../hooks/useSnackbar'

export default function SignUpForm(props) {
    const [phone, setPhone] = React.useState('')
    const [password, setPassword] = React.useState('')
    const [confirmPassword, setConfirmPassword] = React.useState('')
    // const [emailOrPhoneError, setEmailOrPhoneError] = React.useState(false)
    // const [passwordError, setPasswordError] = React.useState(false)
    const [error, setError] = React.useState(false)
    const [wrong, setWrong] = React.useState(false)

    // const {loginAsCustomer} = useAuth()

    const [ state, dispatch ] = React.useContext(AuthContext);

    const {toast} = useSnackbar()

    React.useEffect(() => {
        let invalid = false
        if(!Constant.PHONE_REGEX.test(phone)){
            invalid = true
        }
        if(password.trim() == ''){
            invalid = true
        }
        if(confirmPassword.trim() == ''){
            invalid = true
        }
        if(confirmPassword != password){
            invalid = true
        }
        setError(invalid)
    }, [phone, password, confirmPassword])

    const handleRegister = function(){
        CustomerService.register(phone, password).then((res) => {
            if(res.data > 0){
                dispatch({type: 'loggedId', id: res.data})
                setWrong(false)
                props.onClose()
                toast('success', 'Đăng ký thành công')
            }
            else{
                setWrong(true)
            }
        }).catch((reason) => {
            console.error(reason)
        })
        
    }

    function handleEmailOrPhone(e){
        setPhone(e.target.value)
    }

    function handlePassword(e){
        setPassword(e.target.value)
    }

    function handleConfirmPassword(e){
        setConfirmPassword(e.target.value)
    }

    return(
        <>
            <TextField
                // autoFocus
                // error={emailOrPhoneError}
                margin="normal"
                id="phone"
                label="Số điện thoại"
                // type="emailOrPhone"
                fullWidth
                variant="standard"
                value={phone}
                onChange={handleEmailOrPhone}
            />
            <TextField
                // autoFocus
                // error={passwordError}
                margin="normal"
                id="password_new"
                label="Mật khẩu"
                type="password"
                fullWidth
                variant="standard"
                value={password}
                onChange={handlePassword}
            />
            <TextField
                // autoFocus
                // error={passwordError}
                margin="normal"
                id="confirm_password"
                label="Xác nhận mật khẩu"
                type="password"
                fullWidth
                variant="standard"
                value={confirmPassword}
                onChange={handleConfirmPassword}
            />
            <Button style={{margin: '20px auto'}} onClick={handleRegister} disabled={error}>Đăng ký</Button>
            <Typography className={wrong ? '' : commonStyles.hidden} component="p" sx={{color: 'red', textAlign: 'center'}}>Số điện thoại đã tồn tại!</Typography>
        </>
        
    )
}