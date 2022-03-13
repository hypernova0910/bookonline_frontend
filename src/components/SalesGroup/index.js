import React from 'react';
import BookCard from '../BookCard'
import HeaderGroup from '../HeaderGroup'
import FooterGroup from '../FooterGroup';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';

import BookList from '../BookList'

export default function SalesGroup(props) {
    return (
        <>
            <HeaderGroup icon={<TrendingDownIcon/>} backgroundColor="#FCDAB0" title="Giảm giá sốc"/>
            <BookList books={[]}/>
            {/* <div className="col-lg-2 p-2" style={{backgroundColor:"white"}}>
                <BookCard image="/img/toan3.webp"/>
            </div>
            <div className="col-lg-2 p-2" style={{backgroundColor:"white"}}>
                <BookCard image="/img/pokemon.jpg"/>
            </div>
            <div className="col-lg-2 p-2" style={{backgroundColor:"white"}}>
                <BookCard image="/img/toan3.webp"/>
            </div>
            <div className="col-lg-2 p-2" style={{backgroundColor:"white"}}>
                <BookCard image="/img/toan3.webp"/>
            </div>
            <div className="col-lg-2 p-2" style={{backgroundColor:"white"}}>
                <BookCard image="/img/toan3.webp"/>
            </div>
            <div className="col-lg-2 p-2" style={{backgroundColor:"white"}}>
                <BookCard image="/img/toan3.webp"/>
            </div>
            <div className="col-lg-2 p-2" style={{backgroundColor:"white"}}>
                <BookCard image="/img/toan3.webp"/>
            </div>
            <div className="col-lg-2 p-2" style={{backgroundColor:"white"}}>
                <BookCard image="/img/toan3.webp"/>
            </div>
            <div className="col-lg-2 p-2" style={{backgroundColor:"white"}}>
                <BookCard image="/img/toan3.webp"/>
            </div>
            <div className="col-lg-2 p-2" style={{backgroundColor:"white"}}>
                <BookCard image="/img/toan3.webp"/>
            </div>
            <div className="col-lg-2 p-2" style={{backgroundColor:"white"}}>
                <BookCard image="/img/toan3.webp"/>
            </div>
            <div className="col-lg-2 p-2" style={{backgroundColor:"white"}}>
                <BookCard image="/img/toan3.webp"/>
            </div> */}
            <FooterGroup/>
        </>
    )
}