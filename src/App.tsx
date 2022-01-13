import { FC, ReactNode, useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import NavigatorResposive from './components/common/navigator-resposive';
import { PATH_COURSES, routes } from './config/routes-config';
import CoursesContext, { initialCourses } from './store/context';
import { Course } from './models/course';
import { StoreType } from './models/course-store-type';
import _ from 'lodash';
import { courseProvider } from './config/servicesConfig';
import College from './services/college';
// import colledge from './services/colledge';
const college: College = new College(courseProvider)
const App: FC = () => {
  const [coursesState, setcoursesState] = useState<StoreType>(initialCourses);

  useEffect(() => {
    coursesState.addFn = addCourse;
    coursesState.removeFn = removeCourse;
    poller();
    const interval = setInterval(poller, 500);
    return () => {
      clearInterval(interval);
    }
  }
  );

  function addCourse(course: Course) {
    college.addCourse(course);
  }
  function removeCourse(id: number) {
    college.removeCourse(id);
    poller();
  }

  async function poller() {
    const courses = await college.getAllCourses();
    coursesState.courses = courses;
    setcoursesState({ ...coursesState });
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




