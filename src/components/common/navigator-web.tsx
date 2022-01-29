import { Tabs, Tab, BottomNavigation, Box } from '@mui/material'
import { FC, ReactNode, useEffect, useState } from 'react'
import { RouteType } from '../../models/common/route-type'
import {Link, useLocation} from 'react-router-dom'
import BottomNavigationAction from '@mui/material/BottomNavigationAction';


const NavigatorWeb:FC<{items: RouteType[]}> = (props) => {
    const location = useLocation();
    const [activeTabIndex, setActiveTab] = useState(getInitialActiveTabIndex(location.pathname, props.items));
    
    useEffect(() => {
        setActiveTab(getInitialActiveTabIndex(location.pathname, props.items));
    }, [props.items, location])
    
    function getElements():ReactNode[] {
        return props.items.map(item => 
            <BottomNavigationAction  key={item.label} component={Link} to={item.path} label= {item.label} icon={item.icon} />)
    }
    function onChangeHandler(event:any){
        setActiveTab(event.target.value);
    }
    return (<Box sx={{ width: '100vw' }}>
        <BottomNavigation
          showLabels
          value={activeTabIndex >= props.items.length ? 0 : activeTabIndex}
          onChange={onChangeHandler}
        >  
           {getElements()}
        </BottomNavigation>
      </Box>
    )
}

function getInitialActiveTabIndex(path: string, items: RouteType[]): number{
        let res = items.findIndex(item => item.path === path);
        return res >= 0 ? res : 0;
}

export default NavigatorWeb
