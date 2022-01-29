import { AppBar, BottomNavigation, Box, Container, Drawer, IconButton, Tab, Tabs, Toolbar, Typography } from '@mui/material';
import { FC, useEffect, useState, ReactNode } from 'react';

import { Link, useLocation } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import { RouteType } from '../../models/common/route-type';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';



function getActiveLabel(path: string, items: RouteType[]): string {
    if (path !== '/') {
        const res = items.filter(item => item.path === path);
        return res.length !== 0 ? res[0].label : 'Page does not exist';
    }
    return items.length > 0 ? items[0].label : 'Routes is empty';
}

function getInitialActiveTabIndex(path: string, items: RouteType[]): number {
    let res = items.findIndex(item => path === item.path);
    return res < 0 ? 0 : res;

}

const NavigatorDrawer: FC<{ items: RouteType[] }> = ({ items }) => {

    const path = useLocation().pathname;

    const [activeTabIndex, setActiveTab] = useState(getInitialActiveTabIndex(path, items));
    const [label, setLabel] = useState(getActiveLabel(path, items));

    useEffect(() => {
        setActiveTab(getInitialActiveTabIndex(path, items));
        setLabel(getActiveLabel(path, items));
    }, [items, path])

    document.title = label;

    const [displayDrawer, setStateDrawer] = useState(false);

    const showDrawer = () => {
        setStateDrawer(true);
    }

    const closeDrawer = () => {
        setStateDrawer(false);
    }

    function getElements(): ReactNode[] {
        return items.map(item =>
            <BottomNavigationAction key={item.label} component={Link} to={item.path} label={item.label} icon={item.icon} 
            sx={{display: 'flex', flexDirection: 'row', justifyContent: 'start' }}
            />)
    }

    function onChangeHandler(event: React.SyntheticEvent, newValue: number) {
        setActiveTab(newValue);
        setStateDrawer(false);
    }

    return (
        <Box>
            <Toolbar sx={{ display: 'flex', orientation: 'horizontal' }}
            >
                <IconButton
                    onClick={showDrawer}
                    edge="start"
                    color="inherit"
                    aria-label="menu"
                >
                    <MenuIcon sx={{ fontSize: 30 }} />
                </IconButton>
                <Typography variant="body1" component="h2">
                    {label}
                </Typography>
            </Toolbar>
            <Drawer
                anchor='left'
                open={displayDrawer}
                onClose={closeDrawer}
            >
                <BottomNavigation
                    sx={{ width: 250, display: 'flex', flexDirection: 'column', justifyContent: 'start' }}
                    onChange={onChangeHandler}
                    showLabels
                    value={activeTabIndex >= items.length ? 0 : activeTabIndex}
                >
                    {getElements()}
                </BottomNavigation>
            </Drawer>
        </Box>
    );
};

export default NavigatorDrawer;