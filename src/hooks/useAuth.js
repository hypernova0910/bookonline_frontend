import { useContext } from "react";

import CustomerService from "../service/CustomerService";
import {AuthContext} from '../context/AuthProvider'

export default function useAuth(){
    const [ state, dispatch ] = useContext(AuthContext);

    const loginAsCustomer = (phoneOrEmail, password) => {
        CustomerService.signIn(phoneOrEmail, password).then((res) => {
            dispatch({type: 'loggedId', data: res.data})
        }).catch((reason) => {
            console.log(reason)
        })
    }

    return {
        idCustomer: state,
        loginAsCustomer
    }
}