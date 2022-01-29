import { AppBar, Box, Container, Drawer, IconButton, Tab, Tabs, Toolbar, Typography } from '@mui/material';
import { FC, useEffect, useState } from 'react';
import { RouteType } from '../../models/common/route-type';

import { Link, useLocation } from 'react-router-dom';

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


const CastomTabs: FC<{ items: RouteType[] }> = ({ items }) => {

    const orientation = 'horizontal'
    const path = useLocation().pathname;

    const [activeTabIndex, setActiveTab] = useState(getInitialActiveTabIndex(path, items));
    const [label, setLabel] = useState(getActiveLabel(path, items));

    useEffect(() => {
        setActiveTab(getInitialActiveTabIndex(path, items));
        setLabel(getActiveLabel(path, items));
    }, [items])

    document.title = label;

    function onChangeHandler(event: React.SyntheticEvent, newValue: number) {
        setActiveTab(newValue);
    }

  return <div>
      <Tabs
            orientation={orientation}
            variant="scrollable"
            value={activeTabIndex >= items.length ? 0 : activeTabIndex}
            onChange={onChangeHandler}
        >
            {items.map((item, index) => (
                <Tab
                    key={item.label}
                    component={Link}
                    to={item.path}
                    label={item.label}
                    onClick={() => setLabel(item.label)}
                />
            ))}
        </Tabs>
  </div>;
};

export default CastomTabs;
