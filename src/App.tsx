import { FC, ReactNode, useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import NavigatorResposive from './components/common/navigator-resposive';
import { PATH_COURSES, PATH_LOGIN, routes } from './config/routes-config';
import CoursesContext, { initialCourses } from './store/context';
import { StoreType } from './models/course-store-type';
import _ from 'lodash';
import { authService, college } from './config/servicesConfig'
import Course from './models/course';
import { Subscription } from 'rxjs'
import { nonAuthorizedUser, UserData } from './models/common/user-data';
import { RouteType } from './models/common/route-type';

function getRelevantRoutes(userData: UserData): RouteType[] {
  return routes.filter(r => 
  (!!userData.userName && r.authenticated) || 
  (userData.isAdmin && r.adminOnly) ||
  (!userData.userName && !r.authenticated && !r.adminOnly));
}
const App: FC = () => {
  const [coursesState, setcoursesState] = useState<StoreType>(initialCourses);
  
  useEffect(() => {
    const subscriptionUserData = getUserData();
    return () => {
      subscriptionUserData.unsubscribe();
    }
  }, []);

  useEffect(() => {
    coursesState.addFn = (course) => college.addCourse(course);
    coursesState.removeFn = (id) => college.removeCourse(id);

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
    const userData: UserData = coursesState.userData;
    return getRelevantRoutes(userData)
      .map((e) => <Route key={e.path} path={e.path} element={e.element} />);
  }
  return <CoursesContext.Provider value={coursesState}>
    <BrowserRouter>
      <NavigatorResposive items={getRelevantRoutes(coursesState.userData)} />
      <Routes>{getRoutes()}
        <Route path='/' element={<Navigate to={!coursesState.userData.userName ? PATH_LOGIN : PATH_COURSES} />} />
      </Routes>
    </BrowserRouter>
  </CoursesContext.Provider>
}

export default App;




