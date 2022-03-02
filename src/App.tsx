import { FC, Fragment, ReactNode, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import NavigatorResposive from './components/common/navigator-resposive';
import { developmentRoutes, PATH_LOGOUT, routes } from './config/routes-config';
import CoursesContext, { initialCourses } from './store/context';
import { StoreType } from './models/course-store-type';
import _ from 'lodash';
import { authService, college } from './config/servicesConfig'
import Course from './models/Course';
import { Subscription } from 'rxjs'
import { UserData, DISPLAY_NAME_ERROR } from './models/common/user-data';
import { RouteType } from './models/common/route-type';
import { Alert, AlertTitle, Box, LinearProgress } from '@mui/material';
import BreadcrumbsCastom from './components/common/breadcrumbs';
import ErrorCode from './models/common/error-code';
import { useDispatch, useSelector } from 'react-redux';
import { errorCodeSelector, userDataSelector } from './redux/store';
import { getAllCoursesAction, setCourses, setErrorCode, setUserData } from './redux/actions';


function getRelevantRoutes(userData: UserData): RouteType[] {
  let resRoutes = routes;
  if (!!userData.social) {
    const index = _.findIndex(resRoutes, (e) => !!e.isSocialAuth);
    if (index >= 0) {
      resRoutes[index].social = userData.social;
    }
  }
  if (process.env.NODE_ENV === 'development') {
    resRoutes = resRoutes.concat(developmentRoutes);
  }
  return resRoutes.filter(r =>
    (!!userData.userName && r.authenticated) ||
    (userData.isAdmin && r.adminOnly) ||
    (!userData.userName && !r.authenticated && !r.adminOnly));
}

const App: FC = () => {

  const userData: UserData = useSelector(userDataSelector);
  const dispatch = useDispatch();
  const code: ErrorCode = useSelector(errorCodeSelector);

  const [errServer, setErrServer] = useState(false);
  const handleErrorCallBack = useCallback(handleError, [code]);

  function handleError() {
    if (code === ErrorCode.NO_ERROR) {
      setErrServer(false);
    } else if (code === ErrorCode.AUTH_ERROR) {
      if (!!userData.userName) {
        authService.logout();
      }
      setErrServer(false)
    } else {
      setErrServer(true);
    }
  }

  const [relevantRoutes, setRelevantRoutes] = useState<RouteType[]>(routes);

  useEffect(() => {
    setRelevantRoutes(getRelevantRoutes(userData));
  }, [userData])

  useEffect(() => {
    function getUserData(): Subscription {
      return authService.getUserData().subscribe({
        next(ud: UserData) {
          if (ud.displayName == DISPLAY_NAME_ERROR) {
            dispatch(setErrorCode(ErrorCode.SERVER_UNAVAILABLE));
          } else {
            dispatch(setErrorCode(ErrorCode.NO_ERROR));
            dispatch(setUserData(ud));
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
          dispatch(setErrorCode(ErrorCode.NO_ERROR));
          dispatch(setCourses(arr));
        },
        error(err: any): void {
          dispatch(setErrorCode(err));
          setTimeout(() => {
            subscription = getData();
          }, 1000);
        }
      });
    }
    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => handleErrorCallBack(), [handleErrorCallBack])


  function getRoutes(): ReactNode[] {
    return relevantRoutes
      .map((e) => <Route key={e.path} path={e.path} element={e.element} />);
  }
  return (<Fragment>
    <Box sx={{ display: "flex", flexDirection: "column", alignItems: { sx: "left", md: "center" }, justifyContent: "space-between", width: "100vw", height: "100vh" }
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
        // <CoursesContext.Provider value={initialCourses}>
        <BrowserRouter >
          <NavigatorResposive items={relevantRoutes} />
          <Routes>{getRoutes()}
            <Route path='*' element={<Navigate to={relevantRoutes[0].path} />}></Route>
          </Routes>
          <BreadcrumbsCastom items={relevantRoutes} />

        </BrowserRouter>

        // </CoursesContext.Provider>

      }
    </Box>
  </Fragment>
  );


}

export default App;


