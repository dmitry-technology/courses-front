import { createTheme, ThemeProvider } from '@mui/material/styles';
import React, { FC, ReactNode } from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import NavigatorMobile from './components/common/navigator-mobile';
import NavigatorWeb from './components/common/navigator-web';
import { PATH_ADD_COURSE, PATH_COURSES, PATH_LOGIN, PATH_LOGOUT, PATH_STATISTICS_COST, PATH_STATISTICS_HOURS, routes } from './config/routes-config';

const theme = createTheme();
theme.typography.body1 = {
  fontSize: '1.2rem',
  '@media (min-width:568px)': {
    fontSize: '2rem'
  },
  [theme.breakpoints.up('md')]: {
    fontSize: '3rem'
  }
}
const App: FC = () => {
  function getRoutes(): ReactNode[] {
    return routes.map((e) => <Route key={e.path} path={e.path} element={e.element} />);
  }
  return <ThemeProvider theme={theme}> 
  <BrowserRouter>
    {/* <NavigatorWeb items={routes} /> */}
    <NavigatorMobile items={routes} />
    <Routes>{getRoutes()}
    <Route path='/' element={<Navigate to={PATH_COURSES}/>} />
    </Routes>
  </BrowserRouter>
  </ThemeProvider>
}

export default App;
