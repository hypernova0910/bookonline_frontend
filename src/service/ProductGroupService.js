import axios from 'axios'
import Constants from '../common/Constant'

const PRODUCT_GROUP_REST_API_URL = Constants.API_URL + 'productGroup/'

class ProductGroupService{
    getAll(parent_id){
        let api = PRODUCT_GROUP_REST_API_URL + 'getAll'
        if(parent_id){
            api += '?parent_id=' + parent_id 
        }
        return axios.get(api)
    }
}

export default new ProductGroupService()