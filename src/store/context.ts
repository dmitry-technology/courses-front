import { createContext } from "react";
import { nonAuthorizedUser } from "../models/common/user-data";
import { StoreType } from "../models/course-store-type";



export const initialCourses: StoreType = {}
const CoursesContext = createContext<StoreType>(initialCourses);

export default CoursesContext;
