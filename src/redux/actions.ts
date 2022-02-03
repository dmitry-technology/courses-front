import Course from "../models/course";
import { PayloadAction } from '@reduxjs/toolkit'
import { UserData } from "../models/common/user-data";

export const SET_COURSES = "set_courses";
export const SET_USER_DATA = "set_user_data";
type ActionType<T> = (data: T) => PayloadAction<T>;

export const setCourses: ActionType<Course[]> = courses => (
    { payload: courses, type: SET_COURSES });
export const setUserData: ActionType<UserData> = userData => (
    { payload: userData, type: SET_USER_DATA });

