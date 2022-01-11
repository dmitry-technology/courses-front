import { createTheme, ThemeProvider } from '@mui/material/styles';
import { FC, ReactNode, useContext, useState } from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import NavigatorResposive from './components/common/navigator-resposive';
import { PATH_ADD_COURSE, PATH_COURSES, PATH_LOGIN, PATH_LOGOUT, PATH_STATISTICS_COST, PATH_STATISTICS_HOURS, routes } from './config/routes-config';
import CoursesContext, { defaultValue } from './store/context';
import { createRandomCourse } from './util/random';
import { CourseType } from './models/course-type';
import _ from 'lodash';
import { StoreType } from './models/store-type';

const N_RANDOM_COURSES = 10;

let courses: CourseType[] = [];

function createRandomCourses() {
      for (let i = 0; i < N_RANDOM_COURSES; i++) {
        courses.push(createRandomCourse());
      }
}

const theme = createTheme();
createRandomCourses();

const App: FC = () => {
  const [coursesState, setcoursesState] = useState<StoreType>({courses: courses});
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
