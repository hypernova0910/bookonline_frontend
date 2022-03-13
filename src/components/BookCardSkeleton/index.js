import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import Rating from '@mui/material/Rating';
import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';

import Constant from '../../common/Constant'
import CommonFunction from '../../common/CommonFunction'

import {useNavigate} from 'react-router-dom'

export default function BookCardSkeleton({book}) {
  const navigate = useNavigate();

  return (
    <Card sx={{ maxWidth: 345 }} onClick={e => {navigate('/chi-tiet/' + book.id)}}>
      
      <CardActionArea>
        {/* <CardMedia
          component="img"
        //   image={book.thumb_nail ? (Constant.IMAGE_URL + book.thumb_nail) : ''}
        //   alt={book.name}
        >
            
        </CardMedia> */}
        <Skeleton animation="wave" variant="rectangular" height={196}/>
        <CardContent>
          {/* <Typography gutterBottom className={styles.bookName} component="h6">
            {book.name}
          </Typography> */}
          <div style={{marginBottom: '0.35em'}}>
            <Skeleton animation="wave" height='1.5em' />
            <Skeleton animation="wave" height='1.5em' />
          </div>
          <Skeleton animation="wave" height='1.5em' width='45%' />
          {/* <Typography variant="body1" sx={{color: '#F7941E', fontSize: '1.2rem'}}>
            {CommonFunction.numberWithCommas(book.sell_price * (100 -book.discount_percent) /100) + 'đ'}
          </Typography>
          <del style={{display: book.discount_percent ? '' : 'none'}}>
            {CommonFunction.numberWithCommas(book.sell_price) + 'đ'}
          </del> */}
        </CardContent>
      </CardActionArea>
    </Card>
  );
}