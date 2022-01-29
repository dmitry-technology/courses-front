import { ReactNode } from "react";
import {Courses} from '../components/pages/courses'
import { StatisticsCost } from '../components/pages/statistics-cost';
import { StatisticsHours } from '../components/pages/statistics-hours';
import { Login } from '../components/pages/login';
import { Logout } from '../components/pages/logout';
import { AddCourse } from "../components/pages/add-course";
import { RouteType } from "../models/common/route-type";
import Generation from "../components/pages/generation";
import DashboardIcon from '@mui/icons-material/Dashboard';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import QueryBuilderIcon from '@mui/icons-material/QueryBuilder';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import AndroidIcon from '@mui/icons-material/Android';


export const PATH_COURSES = "/courses";
export const PATH_LOGIN = "/login";
export const PATH_LOGOUT = "/logout";
export const PATH_ADD_COURSE = "/courses/add";
export const PATH_STATISTICS_COST = "/courses/statistics/cost";
export const PATH_STATISTICS_HOURS = "/courses/statistics/hours";



export const routes: RouteType[] = [
    {path:PATH_COURSES, element:<Courses/> , label: `Courses`, authenticated: true, icon: <DashboardIcon/>},
    {path:PATH_ADD_COURSE, element:<AddCourse/>, label: `Add New Course`,adminOnly: true, icon: <AddCircleOutlineIcon/> },
    {path:PATH_LOGIN, element:<Login/>, label: `Sign In`, icon: <LoginIcon/>},
    {path:PATH_LOGOUT, element:<Logout/>, label: `Sign Out`, authenticated: true, icon: <LogoutIcon/>},
    {path:PATH_STATISTICS_COST, element:<StatisticsCost/>, label: `Cost Statistics`, authenticated: true, icon: <MonetizationOnIcon/>},
    {path:PATH_STATISTICS_HOURS, element:<StatisticsHours/>, label: `Hours Statistics`, authenticated: true, icon: <QueryBuilderIcon/>}
]

export const developmentRoutes: RouteType[] = [
    {path:"/courses/developmet/generattion", element:<Generation/>, label:'Courses Generation', adminOnly:true, icon: <AndroidIcon/>}
]
