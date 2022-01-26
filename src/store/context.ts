import { createContext } from "react";
import { nonAuthorizedUser } from "../models/common/user-data";
import Course from "../models/course";
import { StoreType } from "../models/course-store-type";
import {college} from "../config/servicesConfig";



export const initialCourses: StoreType = {
    courses: [],
    userData: nonAuthorizedUser,
    addFn: (course: Course) => college.addCourse(course),
    removeFn: (id) => college.removeCourse(id),
    updateFn: (id, course) => college.updateCourse(id, course)

}
const CoursesContext = createContext<StoreType>(initialCourses);



export default CoursesContext;
