import { FC, ReactNode, useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import NavigatorResposive from './components/common/navigator-resposive';
import { PATH_COURSES, routes } from './config/routes-config';
import CoursesContext, { initialCourses } from './store/context';
import { StoreType } from './models/course-store-type';
import _ from 'lodash';
import { college } from './config/servicesConfig'
import Course from './models/course';
import { Subscription } from 'rxjs'

const App: FC = () => {
  const [coursesState, setcoursesState] = useState<StoreType>(initialCourses);

  useEffect(() => {
    coursesState.addFn = (course) => college.addCourse(course);
    coursesState.removeFn = (id) => college.removeCourse(id);
    const subscription = getData();
    return () => subscription.unsubscribe();
  }
  );

  function getData(): Subscription {
    return college.getAllCourses().subscribe({
      next(arr: Course[]) {
        coursesState.courses = arr;
        setcoursesState({ ...coursesState });
      },
      error(err: any) {
        console.log(err);
      }
    });
  }

  function getRoutes(): ReactNode[] {
    return routes.map((e) => <Route key={e.path} path={e.path} element={e.element} />);
  }
  return <CoursesContext.Provider value={coursesState}>
    <BrowserRouter>
      <NavigatorResposive items={routes} />
      <Routes>{getRoutes()}
        <Route path='/' element={<Navigate to={PATH_COURSES} />} />
      </Routes>
    </BrowserRouter>
  </CoursesContext.Provider>
}

export default App;




