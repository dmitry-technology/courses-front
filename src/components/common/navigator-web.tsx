import { Tabs, Tab, BottomNavigation, Box, Avatar, Typography } from '@mui/material'
import { FC, ReactNode, useEffect, useState } from 'react'
import { RouteType } from '../../models/common/route-type'
import { Link, useLocation } from 'react-router-dom'
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import _ from 'lodash';




const NavigatorWeb: FC<{ items: RouteType[] }> = (props) => {
    const location = useLocation();
    const [activeTabIndex, setActiveTab] = useState(getInitialActiveTabIndex(location.pathname, props.items));
    const indexRouteSocial = _.findIndex(props.items, (e) => !!e.social);
    const socialRout = props.items[indexRouteSocial];

    useEffect(() => {
        setActiveTab(getInitialActiveTabIndex(location.pathname, props.items));
    }, [props.items, location])

    function getElements(): ReactNode[] {
        return props.items.map(item => {
            if (!item.social) {
                return <BottomNavigationAction key={item.label} component={Link} to={item.path} label={item.label} icon={item.icon} />
            }
        });
    }

    function getSocialElement(): ReactNode {
        return <Box key={socialRout.label} component={Link} to={socialRout.path} sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', textDecoration: 'none', fontSize: '10px', color: 'black', marginRight: '30px' }}>
            <Avatar alt="Profile" src={socialRout.social!.photoURL ?? ""} />
            <Box ml={1} alignItems={'center'}>
                <Typography variant='subtitle2'>Sign out</Typography>
                <Typography variant='subtitle2'>{socialRout.social!.displayName ?? socialRout.social!.email}</Typography>
            </Box>
        </Box>
    }

    function onChangeHandler(event: any) {
        setActiveTab(event.target.value);
    }
    return (<Box sx={{ width: '100vw', display: 'flex', flexDirection: 'row' }}>
        <BottomNavigation
            showLabels
            value={activeTabIndex >= props.items.length ? 0 : activeTabIndex}
            onChange={onChangeHandler}
            sx={{ flexGrow: 1 }}
        >
            {getElements()}
        </BottomNavigation>
        {socialRout && getSocialElement()}
    </Box>
    )
}

function getInitialActiveTabIndex(path: string, items: RouteType[]): number {
    let res = items.findIndex(item => item.path === path);
    return res >= 0 ? res : 0;
}

export default NavigatorWeb
