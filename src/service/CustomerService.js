import axios from 'axios'
import Constants from '../common/Constant'

const CUSTOMER_REST_API_URL = Constants.API_URL + 'customer/'

class CustomerService{
    register(phone, password){
        let api = CUSTOMER_REST_API_URL + 'register'
        return axios.post(api, {phone, password}, {withCredentials: true})
    }

    signIn(phoneOrEmail, password){
        let api = CUSTOMER_REST_API_URL + 'signIn'
        return axios.post(api, {phoneOrEmail, password}, {withCredentials: true})
    }

    loggedId(){
        let api = CUSTOMER_REST_API_URL + 'loggedId'
        return axios.get(api, {withCredentials: true})
    }

    logOut(){
        let api = CUSTOMER_REST_API_URL + 'removeCookie'
        return axios.get(api, {withCredentials: true})
    }
}

export default new CustomerService()