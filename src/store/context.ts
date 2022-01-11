import { createContext } from "react";
import { CourseType } from "../models/course-type";
import { StoreType } from "../models/store-type";

export const defaultValue: StoreType = {
    courses: []
}
const CoursesContext = createContext<StoreType>(defaultValue);
export default CoursesContext;
