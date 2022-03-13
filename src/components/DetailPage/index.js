import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import Rating from '@mui/material/Rating';
import NumberChooser from '../NumberChooser'
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import Button from '@mui/material/Button';
import DetailBook from '../DetailBook';

import {useParams} from 'react-router-dom'

import BookService from '../../service/BookService'


export default function DetailPage(){
    const {id} = useParams()
    const [book, setBook] = React.useState({})
    
    React.useEffect(() => {
        window.scrollTo(0, 0)
        BookService.getOneByIdDTO(id).then((res) => {
            setBook(res.data)
        })
    }, [id])

    return(
        <div className={"row p-4 "}>
            <DetailBook book={book}/>
        </div>
    )
}