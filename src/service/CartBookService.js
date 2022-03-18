import axios from 'axios'
import Constants from '../common/Constant'

const CART_BOOK_REST_API_URL = Constants.API_URL + 'cartBook/'

class CartBookService{
    delete(id){
        let api = CART_BOOK_REST_API_URL + 'delete'
        return axios.delete(api, {data: id})
    }
}

export default new CartBookService()