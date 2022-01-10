import { createTheme, ThemeProvider } from '@mui/material/styles';
import { FC, ReactNode, useContext, useState } from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import NavigatorResposive from './components/common/navigator-resposive';

import { PATH_ADD_COURSE, PATH_COURSES, PATH_LOGIN, PATH_LOGOUT, PATH_STATISTICS_COST, PATH_STATISTICS_HOURS, routes } from './config/routes-config';
import { StoreType } from './models/store-type';
import CoursesContext, { defaultValue } from './store/context';

const theme = createTheme();
// theme.typography.body1 = {
//   fontSize: '1.2rem',
//   '@media (min-width:568px)': {
//     fontSize: '2rem'
//   },
//   [theme.breakpoints.up('md')]: {
//     fontSize: '3rem'
//   }
// }
const App: FC = () => {
  
  const [storeValueState, setstoreValueState] = useState<StoreType>(defaultValue);
  storeValueState.increase = increseCount;
  storeValueState.decrease = decreseCount;
  function increseCount(){
    storeValueState.count++;
    setstoreValueState({...storeValueState});
  }
  function decreseCount(){
    storeValueState.count--;
    setstoreValueState({...storeValueState});
  }
  function getRoutes(): ReactNode[] {
    return routes.map((e) => <Route key={e.path} path={e.path} element={e.element} />);
  }
  return <CoursesContext.Provider value={storeValueState}>
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <NavigatorResposive items={routes} />
        <Routes>{getRoutes()}
          <Route path='/' element={<Navigate to={PATH_COURSES} />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  </CoursesContext.Provider>
}

export default App;
