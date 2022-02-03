import {combineReducers, createStore} from "redux"
import { UserData } from "../models/common/user-data"
import Course from "../models/course"
import {coursesReducer, userDataReducer} from "./reducers"
type StoreType = {
    courses: Course[],
    userData: UserData
}
const reducers = combineReducers<StoreType>({
    courses: coursesReducer, 
    userData: userDataReducer
})
export const store = createStore(reducers);
//selectors in accordance with state
export const coursesSelector = (state: StoreType): Course[] => state.courses;
export const userDataSelector = (state: StoreType): UserData => state.userData;