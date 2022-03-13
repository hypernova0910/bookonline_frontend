import React from 'react'
import BookCard from '../BookCard'
import BookCardSkeleton from '../BookCardSkeleton';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import commonStyles from '../../common/Common.module.css';
import styles from './BookList.module.css'

export default function BookList(props){
    if(props.books.length == 0){
        if(!props.loading){
            return (
                <div className={commonStyles.bodyBg}>
                    <Box>
                        <Typography variant="body1" className={styles.note}>
                            Không có sản phẩm phù hợp với tìm kiếm của bạn.
                        </Typography>
                    </Box>
                </div>
                
            )
        }
        else{
            return(
                <>
                    <div className={"col-lg-2 col-md-4 col-sm-6 col-xs-12 p-2 " + commonStyles.bodyBg}>
                        <BookCardSkeleton/>
                    </div>
                    <div className={"col-lg-2 col-md-4 col-sm-6 col-xs-12 p-2 " + commonStyles.bodyBg}>
                        <BookCardSkeleton/>
                    </div>
                    <div className={"col-lg-2 col-md-4 col-sm-6 col-xs-12 p-2 " + commonStyles.bodyBg}>
                        <BookCardSkeleton/>
                    </div>
                    <div className={"col-lg-2 col-md-4 col-sm-6 col-xs-12 p-2 " + commonStyles.bodyBg}>
                        <BookCardSkeleton/>
                    </div>
                    <div className={"col-lg-2 col-md-4 col-sm-6 col-xs-12 p-2 " + commonStyles.bodyBg}>
                        <BookCardSkeleton/>
                    </div>
                    <div className={"col-lg-2 col-md-4 col-sm-6 col-xs-12 p-2 " + commonStyles.bodyBg}>
                        <BookCardSkeleton/>
                    </div>
                </>
                
                
            )
        }
    }
    return (<>{
        props.books.map(book => 
            <div key={book.id} className={"col-lg-2 col-md-4 col-sm-6 col-xs-12 p-2 " + commonStyles.bodyBg}>
                <BookCard book={book}/>
            </div>
        )
    }</>)
}