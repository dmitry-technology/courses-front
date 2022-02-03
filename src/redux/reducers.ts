import { PayloadAction } from "@reduxjs/toolkit";
import { nonAuthorizedUser, UserData } from "../models/common/user-data";
import Course from "../models/course";
import { SET_COURSES, SET_USER_DATA } from "./actions";

export const coursesReducer = (courses: Course[] = [], action: PayloadAction<Course[]>) => {
    return action.type === SET_COURSES ? action.payload : courses;
}
export const userDataReducer = (userData: UserData = nonAuthorizedUser, action: PayloadAction<UserData>) => {
    return action.type === SET_USER_DATA ? action.payload : userData;
}
