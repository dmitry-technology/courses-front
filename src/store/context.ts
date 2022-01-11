// import { StoreType } from "../models/store-type";
import { createContext } from "react";
import { CourseType } from "../models/course-type";
// import { getRandomDate } from "../util/random";

export type CourseOpp = {
    courses : CourseType[];
    addFn : (course:CourseType) => void;
    removeFn : (id:number) => void;
}
export const defaultValue: CourseOpp = {
    courses: [],
    addFn : (course:CourseType) => {},
    removeFn : (id:number) => {} 
}
const CoursesContext = createContext<CourseOpp>(defaultValue);
export default CoursesContext;
