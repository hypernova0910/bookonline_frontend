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

export default function SignInForm(props) {
    const [phoneOrEmail, setPhoneOrEmail] = React.useState('')
    const [password, setPassword] = React.useState('')
    // const [emailOrPhoneError, setEmailOrPhoneError] = React.useState(false)
    // const [passwordError, setPasswordError] = React.useState(false)
    const [error, setError] = React.useState(false)
    const [wrong, setWrong] = React.useState(false)

    // const {loginAsCustomer} = useAuth()

    const [ state, dispatch ] = React.useContext(AuthContext);

    const {toast} = useSnackbar()

    React.useEffect(() => {
        let invalid = false
        // console.log(Constant.EMAIL_REGEX.test(phoneOrEmail))
        // console.log(Constant.PHONE_REGEX.test(phoneOrEmail))
        if(!Constant.EMAIL_REGEX.test(phoneOrEmail) && !Constant.PHONE_REGEX.test(phoneOrEmail)){
            // setError(false)
            invalid = true
        }
        // else{
            
        //     // setError(true)
        //     //console.log('invalid email')
        // }
        if(password.trim() != ''){
            // setError(false)
        }
        else{
            invalid = true
            //console.log('invalid pass')
            // setError(true)
        }
        // console.log(invalid)
        setError(invalid)
    }, [phoneOrEmail, password])

    const handleLogIn = function(){
        // let valid = true
        // if(Constant.EMAIL_REGEX.test(emailOrPhone) || Constant.PHONE_REGEX.test(emailOrPhone)){
        //     setError(false)
        // }
        // else{
        //     valid = false
        //     setError(true)
        // }
        // if(password.trim() != ''){
        //     setError(false)
        // }
        // else{
        //     valid = false
        //     setError(true)
        // }
        // Constant.EMAIL_REGEX.test(emailOrPhone)
        // Constant.PHONE_REGEX.test(emailOrPhone)
        // console.log(error)
        // loginAsCustomer(phoneOrEmail, password)
        CustomerService.signIn(phoneOrEmail, password).then((res) => {
            console.log(res.data)
            if(res.data){
                dispatch({type: 'loggedId', id: res.data.id})
                setWrong(false)
                props.onClose()
                toast('success', 'Đăng nhập thành công')
            }
            else{
                setWrong(true)
            }
            
        }).catch((reason) => {
            console.error(reason)
        })
        
    }

    function handleEmailOrPhone(e){
        setPhoneOrEmail(e.target.value)
        // if(Constant.EMAIL_REGEX.test(e.target.value) || Constant.PHONE_REGEX.test(e.target.value)){
        
        //     setError(false)
        // }
        // else{
        //     // valid = false
        //     setError(true)
        // }
    }

    function handlePassword(e){
        setPassword(e.target.value)
        // if(e.target.value.trim() != ''){
        //     setError(false)
        // }
        // else{
        //     // valid = false
        //     setError(true)
        // }
    }

    return(
        <>
            <TextField
                // autoFocus
                // error={emailOrPhoneError}
                margin="normal"
                id="emailOrPhone"
                label="Số điện thoại/Email"
                // type="emailOrPhone"
                fullWidth
                variant="standard"
                value={phoneOrEmail}
                onChange={handleEmailOrPhone}
            />
            <TextField
                // autoFocus
                // error={passwordError}
                margin="normal"
                id="password"
                label="Mật khẩu"
                type="password"
                fullWidth
                variant="standard"
                value={password}
                onChange={handlePassword}
            />
            <Button style={{margin: '20px auto'}} onClick={handleLogIn} disabled={error}>Đăng nhập</Button>
            <Typography className={wrong ? '' : commonStyles.hidden} component="p" sx={{color: 'red', textAlign: 'center'}}>Số điện thoại/Email hoặc Mật khẩu sai!</Typography>
        </>
        
    )
}