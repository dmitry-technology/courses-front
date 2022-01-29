import { FC, ReactNode } from 'react';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import LinkMaterial from '@mui/material/Link';
import { Link } from 'react-router-dom';
import { RouteType } from '../../models/common/route-type';


const BreadcrumbsCastom: FC<{ items: RouteType[] }> = (props) => {

    function handleClick(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
        event.preventDefault();
    }
    function getElements():ReactNode[] {
        return props.items.map(item => 
            <LinkMaterial key={item.label} underline="hover" color="inherit" component={Link} to={item.path}>{item.label}</LinkMaterial>
            )
    }

    return (
        <div role="presentation" onClick={handleClick}>
            <Breadcrumbs aria-label="breadcrumb">
            {getElements()}
            </Breadcrumbs>
        </div>
    );

};


export default BreadcrumbsCastom;
