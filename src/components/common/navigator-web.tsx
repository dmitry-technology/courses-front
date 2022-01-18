import { Tabs, Tab } from '@mui/material'
import React, { FC, ReactNode, useEffect, useState } from 'react'
import { RouteType } from '../../models/common/route-type'
import {Link, useLocation} from 'react-router-dom'

const NavigatorWeb:FC<{items: RouteType[]}> = (props) => {
    const location = useLocation();
    const [activeTabIndex, setActiveTab] = useState(getInitialActiveTabIndex(location.pathname, props.items));
    
    useEffect(() => {
        setActiveTab(getInitialActiveTabIndex(location.pathname, props.items));
    }, [props.items])
    
    function getTabs():ReactNode[]{
        return props.items.map(item => <Tab sx={{backgroundColor: 'black' , color: 'white'}} key={item.label} component={Link} to={item.path} label= {item.label}/>)
    }
    function onChangeHandler(event:any){
        setActiveTab(event.target.value);
    }
    return (
        <Tabs value={activeTabIndex >= props.items.length ? 0 : activeTabIndex} onChange={onChangeHandler} variant="fullWidth">
            {getTabs()}
        </Tabs>
    )
}

function getInitialActiveTabIndex(path: string, items: RouteType[]): number{
        let res = items.findIndex(item => item.path === path);
        return res >= 0 ? res : 0;
}

export default NavigatorWeb
