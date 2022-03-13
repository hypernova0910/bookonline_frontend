import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import Rating from '@mui/material/Rating';
import Box from '@mui/material/Box';

import Constant from '../../common/Constant'
import CommonFunction from '../../common/CommonFunction'

import styles from './BookCard.module.css'

import {useNavigate} from 'react-router-dom'

export default function ActionAreaCard({book}) {
  const navigate = useNavigate();

  return (
    <Card sx={{ maxWidth: 345 }} onClick={e => {navigate('/chi-tiet/' + book.id)}}>
      
      <CardActionArea>
        <Box className={styles.salesLabel}>
            <span className={styles.salesText}>
              {book.discount_percent + '%'}
            </span>
        </Box>
        <CardMedia
          component="img"
          image={book.thumb_nail ? (Constant.IMAGE_URL + book.thumb_nail) : ''}
          alt={book.name}
        />
        <CardContent>
          <Typography gutterBottom className={styles.bookName} component="h6">
            {book.name}
          </Typography>
          <Typography variant="body1" sx={{color: '#F7941E', fontSize: '1.2rem'}}>
            {CommonFunction.numberWithCommas(book.sell_price * (100 -book.discount_percent) /100) + 'đ'}
          </Typography>
          <del style={{display: book.discount_percent ? '' : 'none'}}>
            {CommonFunction.numberWithCommas(book.sell_price) + 'đ'}
          </del>
          {/* <Rating name="half-rating-read" defaultValue={2.5} precision={0.5} readOnly /> */}
        </CardContent>
      </CardActionArea>
    </Card>
  );
}