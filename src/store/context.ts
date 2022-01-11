import { createContext } from "react";
import { StoreType } from "../models/course-store-type";
import {createRandomCourses } from "../util/random-courses";
const N_RANDOM_COURSES = 10;

export const initialCourses: StoreType = {
    courses: createRandomCourses(N_RANDOM_COURSES)
}
const CoursesContext = createContext<StoreType>(initialCourses);



export default CoursesContext;
