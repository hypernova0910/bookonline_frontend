import axios from 'axios'
import Constants from '../common/Constant'

const FEEDBACK_REST_API_URL = Constants.API_URL + 'feedback/'

class FeedbackService{
    getAllDataGrid(page, limit, bookId){
        let api = FEEDBACK_REST_API_URL + 'getAllDataGrid/' + page + '/' + limit + '?bookId=' + bookId
        return axios.get(api)
    }

    // getOneByIdDTO(id){
    //     let api = FEEDBACK_REST_API_URL + 'getOneByIdDTO/' + id
    //     return axios.get(api)
    // }

    add(feedback){
        let api = FEEDBACK_REST_API_URL + 'add'
        return axios.post(api, feedback)
    }

    statistic(bookId){
        let api = FEEDBACK_REST_API_URL + 'statistic?bookId=' + bookId
        return axios.get(api)
    }
}

export default new FeedbackService()