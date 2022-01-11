import { createTheme, ThemeProvider } from '@mui/material/styles';
import { FC, ReactNode, useState } from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import NavigatorResposive from './components/common/navigator-resposive';
import {PATH_COURSES, routes } from './config/routes-config';
import CoursesContext, { initialCourses } from './store/context';
import { CourseType } from './models/course';
import { StoreType } from './models/course-store-type';
import _ from 'lodash';

const theme = createTheme();

const App: FC = () => {
  const [coursesState, setcoursesState] = useState<StoreType>(initialCourses);
  coursesState.addFn = addCourse;
  coursesState.removeFn = removeCourse;
  function addCourse(course:CourseType){
    coursesState.courses.push(course);
    setcoursesState({...coursesState})
  }
  function removeCourse(id:number){
    _.remove(coursesState.courses, (e) => e.id == id);
    setcoursesState({...coursesState});
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
