import React from 'react';
import BookCard from '../BookCard'
import HeaderGroup from '../HeaderGroup'
import FooterGroup from '../FooterGroup';
import WhatshotIcon from '@mui/icons-material/Whatshot';

import BookList from '../BookList'

export default function TrendingGroup(props) {
    return (
        <>
            <HeaderGroup icon={<WhatshotIcon/>} backgroundColor="#FCDDEF" title="Xu hướng mua sắm"/>
            <BookList books={[]}/>
            {/* <div className="col-lg-2 col-md-4 col-sm-6 col-xs-12 p-2" style={{backgroundColor:"white"}}>
                <BookCard image="/img/toan3.webp"/>
            </div>
            <div className="col-lg-2 col-md-4 col-sm-6 col-xs-12 p-2" style={{backgroundColor:"white"}}>
                <BookCard image="/img/toan3.webp"/>
            </div>
            <div className="col-lg-2 col-md-4 col-sm-6 col-xs-12 p-2" style={{backgroundColor:"white"}}>
                <BookCard image="/img/toan3.webp"/>
            </div>
            <div className="col-lg-2 col-md-4 col-sm-6 col-xs-12 p-2" style={{backgroundColor:"white"}}>
                <BookCard image="/img/toan3.webp"/>
            </div>
            <div className="col-lg-2 col-md-4 col-sm-6 col-xs-12 p-2" style={{backgroundColor:"white"}}>
                <BookCard image="/img/toan3.webp"/>
            </div>
            <div className="col-lg-2 col-md-4 col-sm-6 col-xs-12 p-2" style={{backgroundColor:"white"}}>
                <BookCard image="/img/toan3.webp"/>
            </div>
            <div className="col-lg-2 col-md-4 col-sm-6 col-xs-12 p-2" style={{backgroundColor:"white"}}>
                <BookCard image="/img/toan3.webp"/>
            </div>
            <div className="col-lg-2 col-md-4 col-sm-6 col-xs-12 p-2" style={{backgroundColor:"white"}}>
                <BookCard image="/img/toan3.webp"/>
            </div>
            <div className="col-lg-2 col-md-4 col-sm-6 col-xs-12 p-2" style={{backgroundColor:"white"}}>
                <BookCard image="/img/toan3.webp"/>
            </div>
            <div className="col-lg-2 col-md-4 col-sm-6 col-xs-12 p-2" style={{backgroundColor:"white"}}>
                <BookCard image="/img/toan3.webp"/>
            </div>
            <div className="col-lg-2 col-md-4 col-sm-6 col-xs-12 p-2" style={{backgroundColor:"white"}}>
                <BookCard image="/img/toan3.webp"/>
            </div>
            <div className="col-lg-2 col-md-4 col-sm-6 col-xs-12 p-2" style={{backgroundColor:"white"}}>
                <BookCard image="/img/toan3.webp"/>
            </div> */}
            <FooterGroup/>
        </>
    )
}