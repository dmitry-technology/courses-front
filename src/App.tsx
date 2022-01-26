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

function getRelevantRoutes(userData: UserData): RouteType[] {
  let resRoutes = routes;
  if(process.env.NODE_ENV === 'development') {
    resRoutes = resRoutes.concat(developmentRoutes);
  }
  return resRoutes.filter(r => 
  (!!userData.userName && r.authenticated) || 
  (userData.isAdmin && r.adminOnly) ||
  (!userData.userName && !r.authenticated && !r.adminOnly));
}
const App: FC = () => {
  const [coursesState, setcoursesState] = useState<StoreType>(initialCourses);
  
  const [relevantRoutes, setRelevantRoutes] = useState<RouteType[]>(routes);
  useEffect(() => {
    setRelevantRoutes(getRelevantRoutes(coursesState.userData));
    
  }, [coursesState.userData])
  useEffect(() => {
    const subscriptionUserData = getUserData();
    return () => {
      subscriptionUserData.unsubscribe();
    }
  }, []);

  useEffect(() => {
    const subscription = getData();
    return () => subscription.unsubscribe();
  }, []);




  function getUserData(): Subscription {
    return authService.getUserData().subscribe({
      next(ud: UserData) {
        coursesState.userData = ud;
        setcoursesState({ ...coursesState });
      },
      error(err: any): void {
        console.log(err);
      }
    });
  }

  function getData(): Subscription {
    return college.getAllCourses().subscribe({
      next(arr: Course[]) {
        coursesState.courses = arr;
        setcoursesState({ ...coursesState });
      },
      error(err: any): void {
        console.log(err);
      }
    });
  }

  function getRoutes(): ReactNode[] {
    return relevantRoutes
      .map((e) => <Route key={e.path} path={e.path} element={e.element} />);
  }
  return <CoursesContext.Provider value={coursesState}>
    <BrowserRouter>
      <NavigatorResposive items={relevantRoutes} />
      <Routes>{getRoutes()}
        <Route path='*' element={<Navigate to={relevantRoutes[0].path}/>}></Route>
      </Routes>
    </BrowserRouter>
  </CoursesContext.Provider>
}

export default App;




