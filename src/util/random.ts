// import { isArray } from "lodash";

import createCourse from "../models/Course";
import { CourseType } from "../models/course-type";
import courseData from "../config/courseData.json";


export function getRandomInteger(min:number, max:number) {
    if (min > max) {
        [min, max] = [max, min];
    }
    return Math.round(Math.random() * (max - min) + min);
}
export function getRandomElement(array:any) {
    if (!Array.isArray(array) || array.length === 0) {
        throw Error();
    }
    return array[getRandomInteger(0, array.length - 1)];
}
export function getRandomDate(minYear:number, maxYear:number) {
    let date1 = `01-01-${minYear}`;
    let date2 = `12-31-${maxYear}`;
    let newDate1 = new Date(date1).getTime();
    let newDate2 = new Date(date2).getTime();
    if (date1 > date2) {
        return new Date(getRandomInteger(newDate2, newDate1));
    } else {
        return new Date(getRandomInteger(newDate1, newDate2));
    }
}

export function createRandomCourse(): CourseType {
        const { minCost, maxCost, minHours, maxHours, minYear, maxYear, courseName, lecturers, types, timing } = { ...courseData };

   const id = getRandomInteger(0, Date.now()) ;
   const name = courseName[getRandomInteger(0, courseName.length - 1)];
   const lecture = lecturers[getRandomInteger(0, lecturers.length - 1)];
   const hours = getRandomInteger(minHours, maxHours);
   const cost = getRandomInteger(minCost, maxCost);
   const type = getRandomElement(types);
   const dayEveningId = getRandomInteger(0, 2);
   const dayEvening = dayEveningId < 2 ? [timing[dayEveningId]] : timing;
   const startDate = getRandomDate(minYear, maxYear);
   const course:CourseType = createCourse(id, name, lecture, hours, cost, type, dayEvening, startDate);
   return course;
 }
