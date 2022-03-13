import axios from 'axios'
import Constants from '../common/Constant'

const BOOK_REST_API_URL = Constants.API_URL + 'book/'

class BookService{
    getAll(offset, limit, search){
        let api = BOOK_REST_API_URL + 'getAll/' + offset + '/' + limit + '?'
        if(search){
            if(search.productGroupId){
                api += ('productGroupId=' + search.productGroupId + '&')
            }
            
        }
        console.log(api)
        return axios.get(api)
    }

    getAllDataGrid(page, limit, search, orderBy){
        let api = BOOK_REST_API_URL + 'getAllDataGrid/' + page + '/' + limit + '?'
        if(search){
            if(search.productGroupId){
                api += ('productGroupId=' + search.productGroupId + '&')
            }
            if(search.minPrice){
                api += ('minPrice=' + search.minPrice + '&')
            }
            if(search.maxPrice){
                api += ('maxPrice=' + search.maxPrice + '&')
            }
            if(search.genres){
                api += ('genres=' + search.genres.join(',') + '&')
            }
            if(search.bookSetId){
                api += ('bookSetId=' + search.bookSetId + '&')
            }
        }
        if(orderBy){
            if(orderBy.orderBy){
                api += ('orderBy=' + orderBy.orderBy + '&')
            }
            if(orderBy.isAsc){
                api += ('isAsc=' + orderBy.isAsc + '&')
            }
        }
        //console.log(api)
        return axios.get(api)
    }

    getOneByIdDTO(id){
        let api = BOOK_REST_API_URL + 'getOneByIdDTO/' + id
        return axios.get(api)
    }
}

export default new BookService()