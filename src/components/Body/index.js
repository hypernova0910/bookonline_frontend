import React from 'react';
import BookCard from '../BookCard'
import HeaderGroup from '../HeaderGroup'
import styles from './Body.module.css';
import FooterGroup from '../FooterGroup';
import TrendingGroup from '../TrendingGroup'
import SalesGroup from '../SalesGroup'

export default function Body(){
    return (
        <>
            <div className={"row p-4 " + styles.group}>
                <TrendingGroup/>
            </div>
            <div className={"row p-4 " + styles.group}>
                <SalesGroup/>
            </div>
        </>
        
    )
}