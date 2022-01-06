import React, { FC, ReactNode } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { PATH_ADD_COURSE, PATH_COURSES, PATH_LOGIN, PATH_LOGOUT, PATH_STATISTICS_COST, PATH_STATISTICS_HOURS, routes } from './config/routes-config';


const App: FC = () => {
  function getRoutes(): ReactNode[] {
    return routes.map((e) => <Route key={e.path} path={e.path} element={e.element} />);
  }
  return <BrowserRouter>
    <Routes>{getRoutes()}</Routes>
  </BrowserRouter>
}

export default App;
