import axios from 'axios'
import Constants from '../common/Constant'

const GENRE_REST_API_URL = Constants.API_URL + 'genre/'

class GenrekService{
    getAll(offset, limit){
        let api = GENRE_REST_API_URL + 'getAllDTO/' + offset + '/' + limit + '?'
        return axios.get(api)
    }
}

export default new GenrekService()