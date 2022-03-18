import axios from 'axios'
import Constants from '../common/Constant'

const CART_REST_API_URL = Constants.API_URL + 'cart/'

class CartService{
    getOneById(id){
        let api = CART_REST_API_URL + 'getOneById/' + id
        return axios.get(api)
    }

    add(cart){
        let api = CART_REST_API_URL + 'add'
        return axios.post(api, cart)
    }

    update(cart){
        let api = CART_REST_API_URL + 'update'
        return axios.post(api, cart)
    }

    getCartByCustomerId(customerId){
        let api = CART_REST_API_URL + 'getCartByCustomerId?customerId=' + customerId
        return axios.get(api)
    }
}

export default new CartService()