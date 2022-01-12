import { FC, ReactNode, useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import NavigatorResposive from './components/common/navigator-resposive';
import { PATH_COURSES, routes } from './config/routes-config';
import CoursesContext, { initialCourses } from './store/context';
import { Course } from './models/course';
import { StoreType } from './models/course-store-type';
import _ from 'lodash';
import Colledge from './services/colledge';
import { courseProvider } from './config/servicesConfig';

const App: FC = () => {
  const colledge: Colledge = new Colledge(courseProvider)
  useEffect(() => {
    const interval = setInterval(poller, 500);
    return () => {
      clearInterval(interval);
    }
  }
  );

  const [coursesState, setcoursesState] = useState<StoreType>(initialCourses);
  coursesState.addFn = addCourse;
  coursesState.removeFn = removeCourse;

  function addCourse(course: Course) {
    colledge.addCourse(course);
  }
  function removeCourse(id: number) {
    colledge.removeCourse(id);
  }

  async function poller() {
    const courses = await colledge.getAllCourses();
    coursesState.courses = courses;
    setcoursesState({ ...coursesState});
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




