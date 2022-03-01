import {applyMiddleware, combineReducers, createStore} from "redux"
import { UserData } from "../models/common/user-data"
import Course from "../models/course"
import {coursesReducer, userDataReducer, errorCodeReducer} from "./reducers"
import thunk from 'redux-thunk'
import ErrorCode from "../models/common/error-code";
type StoreType = {
    courses: Course[],
    userData: UserData,
    errorCode: ErrorCode
}
const reducers = combineReducers<StoreType>({
    courses: coursesReducer, 
    userData: userDataReducer,
    errorCode: errorCodeReducer
})
export const store = createStore(reducers, applyMiddleware(thunk));
//selectors in accordance with state
export const coursesSelector = (state: StoreType): Course[] => state.courses;
export const userDataSelector = (state: StoreType): UserData => state.userData;
export const errorCodeSelector = (state: StoreType): ErrorCode => state.errorCode;