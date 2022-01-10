import React, { FC, ReactNode, useState } from 'react'
import Drawer from '@mui/material/Drawer';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { Link, useLocation } from 'react-router-dom';
import { RouteType } from '../../models/common/route-type';
import AppBar from '@mui/material/AppBar';
import ListIcon from '@mui/icons-material/List';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';

const NavigatorMobile: FC<{ items: RouteType[] }> = (props) => {
    const [open, setOpen] = React.useState(false);
    const location = useLocation();
    const [activeTabIndex, setActiveTab] = useState(getInitialActivePageLabel(location.pathname, props.items));

    const handleDrawerOpen = () => {
        setOpen(true);
    };
    const handleDrawerClose = () => {
        setOpen(false);
    };

    function getInitialActivePageLabel(path: string, items: RouteType[]): string{
        let res = items.find(item => item.path === path);
        return res ? res.label : items[0].label;
}

    function getAppBar(): ReactNode {
        return (
            <AppBar position="static">
                <Toolbar variant="dense">
                    <IconButton onClick={handleDrawerOpen} edge="start" color="inherit" aria-label="menu" sx={{ mr: 2, ...(open && { display: 'none' }) }}>
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" color="inherit" component="div">
                        {activeTabIndex}
                    </Typography>
                </Toolbar>
            </AppBar>
        )
    }

    function getDrawer(): ReactNode {
        return (
            <Drawer variant="persistent" anchor="left" open={open}>
                <IconButton onClick={handleDrawerClose}>
                    <MenuOpenIcon />
                </IconButton>
                <List>
                    {getItemsList()}
                </List>
            </Drawer>
        )
    }

    function getItemsList(): ReactNode[] {
        return props.items.map((item) => (
            <ListItem button key={item.label} component={Link} to={item.path} onClick={() => {
                handleDrawerClose();
                setActiveTab(item.label);
                // setLabel(item.label);
            }
            }>
                <ListItemIcon>
                    <ListIcon />
                </ListItemIcon>
                <ListItemText primary={item.label} />
            </ListItem>
        ))
    }

    return (
        <div>
            {getAppBar()}
            {getDrawer()}
        </div>
    )
}

export default NavigatorMobile