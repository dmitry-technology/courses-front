import { StoreType } from "../models/store-type";
import { createContext } from "react";
export const defaultValue: StoreType = {
    count: 0
}
const CoursesContext = createContext<StoreType>(defaultValue);
export default CoursesContext;
