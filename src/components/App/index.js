import React from 'react';
import {Route, Routes} from 'react-router-dom';
import Header from '../HeaderMain'
import Body from '../Body'
import Footer from '../FooterMain'
import DetailPage from '../DetailPage'
import BodyProductGroup from '../BodyProductGroup'
import CartPage from '../CartPage'

import styles from './App.module.css'

import useMenu from '../../hooks/useMenu'

import CommonFunction from '../../common/CommonFunction';

export default function App(){
    const {nodes, getLink} = useMenu()
    const [routes, setRoutes] = React.useState(<></>)

    const getRoutes = (parent_id) => {
        // console.log(nodes)
        return Object.entries(CommonFunction.filterObj(nodes, node => node.parent_id == parent_id)).map(([key, value]) => 
            <React.Fragment key={key}>
                <Route path={getLink(key)} element={<BodyProductGroup groupId={key}/>}/>
                {getRoutes(key + '')}
            </React.Fragment>
        )
    }

    React.useEffect(() => {
        setRoutes(getRoutes(null))
    }, [nodes])

    return (
        <>
            <Header/>
            <div id="wrapper" className={styles.bgColor}>
                <div className={"container " + styles.container}>
                    <Routes>
                        {routes}
                        <Route path='/chi-tiet/:id' element={<DetailPage/>}/>
                        <Route path='/cart' element={<CartPage/>}/>
                        <Route exact path='/' element={<Body/>}/>
                        <Route path="*"/>
                    </Routes>
                </div>
            </div>
            
            
            <Footer/>
        </>
        
    )
}