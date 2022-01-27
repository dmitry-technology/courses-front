import { FC, ReactNode, useCallback, useEffect, useRef, useState } from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import NavigatorResposive from './components/common/navigator-resposive';
import { developmentRoutes, PATH_COURSES, PATH_LOGIN, routes } from './config/routes-config';
import CoursesContext, { initialCourses } from './store/context';
import { StoreType } from './models/course-store-type';
import _ from 'lodash';
import { authService, college } from './config/servicesConfig'
import Course from './models/course';
import { Subscription } from 'rxjs'
import { UserData } from './models/common/user-data';
import { RouteType } from './models/common/route-type';
import { Alert, AlertTitle, Box, CircularProgress, LinearProgress } from '@mui/material';

function getRelevantRoutes(userData: UserData): RouteType[] {
  let resRoutes = routes;
  if (process.env.NODE_ENV === 'development') {
    resRoutes = resRoutes.concat(developmentRoutes);
  }
  return resRoutes.filter(r =>
    (!!userData.userName && r.authenticated) ||
    (userData.isAdmin && r.adminOnly) ||
    (!userData.userName && !r.authenticated && !r.adminOnly));
}

const App: FC = () => {
  const [coursesState, setcoursesState] = useState<StoreType>(initialCourses);
  const [availabilityServer, setAvailabilityServer] = useState(true);
  const [relevantRoutes, setRelevantRoutes] = useState<RouteType[]>(routes);
  const reset = useRef(false);
  useEffect(() => {
    setRelevantRoutes(getRelevantRoutes(coursesState.userData));
    console.log("set relevant routs");
    
  }, [coursesState.userData])


  useEffect(() => {
    const subscriptionUserData = getUserData();

    function getUserData(): Subscription {
      return authService.getUserData().subscribe({
        next(ud: UserData) {
          console.log(ud);
          if(!ud.userName){
            setAvailabilityServer(true);
          }
          coursesState.userData = ud;
          setcoursesState({ ...coursesState });
        },
        error(err: any): void {
          console.log("err get user data " + err);
        }
      });
    }
    return () => {
      subscriptionUserData.unsubscribe();
    }
  }, []);

  useEffect(() => {
    let subscription = getData();
    function getData(): Subscription {
      return college.getAllCourses().subscribe({
        next(arr: Course[]) {
          setAvailabilityServer(true);
          coursesState.courses = arr;
          setcoursesState({ ...coursesState });
        },
        error(err: any): void {
          
          setAvailabilityServer(false);
          coursesState.courses = []
          setcoursesState({ ...coursesState })
          setTimeout(() => {
            subscription = getData();
          }, 1000);
        }
      });
    }
    return () => subscription.unsubscribe();
  }, []);

  

  function getRoutes(): ReactNode[] {
    return relevantRoutes
      .map((e) => <Route key={e.path} path={e.path} element={e.element} />);
  }
  return (<Box>
    {(!availabilityServer) ?
      <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", width: "100vw", height: "100vh" }}>
        <CircularProgress />
        <Alert sx={{ width: "200px" }} severity="error">
          <AlertTitle>Error</AlertTitle>
          <strong>server is not available!</strong>
        </Alert>
      </Box>
      :
      <CoursesContext.Provider value={coursesState}>
        <BrowserRouter >
          <NavigatorResposive items={relevantRoutes} />
          <Routes>{getRoutes()}
            <Route path='*' element={<Navigate to={relevantRoutes[0].path} />}></Route>
          </Routes>
        </BrowserRouter>
      </CoursesContext.Provider>}
  </Box>
  );


}

export default App;


