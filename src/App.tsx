import { FC, ReactNode, useCallback, useEffect, useRef, useState } from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import NavigatorResposive from './components/common/navigator-resposive';
import { developmentRoutes, routes } from './config/routes-config';
import CoursesContext, { initialCourses } from './store/context';
import { StoreType } from './models/course-store-type';
import _ from 'lodash';
import { authService, college } from './config/servicesConfig'
import Course from './models/course';
import { Subscription } from 'rxjs'
import { UserData, DISPLAY_NAME_ERROR } from './models/common/user-data';
import { RouteType } from './models/common/route-type';
import { Alert, AlertTitle, Box, LinearProgress } from '@mui/material';
import BreadcrumbsCastom from './components/common/breadcrumbs';
import ErrorCode from './models/common/error-code';


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
  const [coursesState, setCoursesState] = useState<StoreType>(initialCourses);
  const [errServer, setErrServer] = useState(false);

  const functionsInit = useCallback(() => {
    initialCourses.addFn = course => college.addCourse(course).catch(err => handleError(err));
    initialCourses.removeFn = id => college.removeCourse(id).catch(err => handleError(err));
    initialCourses.updateFn = (id, newCourse) =>
      college.updateCourse(id, newCourse).catch(err => handleError(err));
  }, [])

  useEffect(() => {
    functionsInit();
  }, [functionsInit])

  function handleError(code: ErrorCode) {
    if (code === ErrorCode.NO_ERROR) {
      setErrServer(false);
    } else if (code === ErrorCode.AUTH_ERROR) {
      if(!!coursesState.userData.userName){
        authService.logout();
      }
      setErrServer(false)
    } else {
      setErrServer(true);
    }
  }

  const [relevantRoutes, setRelevantRoutes] = useState<RouteType[]>(routes);

  useEffect(() => {
    setRelevantRoutes(getRelevantRoutes(coursesState.userData));
  }, [coursesState.userData])

  useEffect(() => {
    function getUserData(): Subscription {
      return authService.getUserData().subscribe({
        next(ud: UserData) {
          if (ud.displayName == DISPLAY_NAME_ERROR) {
            handleError(ErrorCode.SERVER_UNAVAILABLE)
          } else {
            handleError(ErrorCode.NO_ERROR);
            coursesState.userData = ud;
            setCoursesState({ ...coursesState })
          }
        }
      });
    }
    const subscriptionUserData = getUserData();
    return () => subscriptionUserData.unsubscribe();
  }, []);

  useEffect(() => {
    let subscription: any;
    subscription = getData();
    function getData(): Subscription {
      subscription && subscription.unsubscribe();
      return college.getAllCourses().subscribe({
        next(arr: Course[]) {
          handleError(ErrorCode.NO_ERROR);
          coursesState.courses = arr;
          setCoursesState({ ...coursesState });
        },
        error(err: any): void {
          handleError(err);
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
  return (<Box sx={
    { display: "flex", flexDirection: "column", alignItems: { sx: "left", md: "center" }, justifyContent: "space-between", width: "100vw", height: "100vh" }
  }>
    {(errServer) ?
      <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", width: "100vw", height: "100vh" }}>
        <Alert sx={{ width: "200px" }} severity="error">
          <AlertTitle>Error</AlertTitle>
          <strong>server is not available!</strong>
          <LinearProgress />
        </Alert>
      </Box>
      :
      <CoursesContext.Provider value={coursesState}>
        <BrowserRouter >
          <NavigatorResposive items={relevantRoutes} />
          <Routes>{getRoutes()}
            <Route path='*' element={<Navigate to={relevantRoutes[0].path} />}></Route>
          </Routes>
          <BreadcrumbsCastom items={relevantRoutes} />

        </BrowserRouter>

      </CoursesContext.Provider>

    }
  </Box>
  );


}

export default App;


