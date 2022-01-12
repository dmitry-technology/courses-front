import { Course, createCourse } from "../models/course";
import courseData from "../config/courseData.json";
import { getRandomDate, getRandomElement, getRandomInteger } from "./common/random";




export function createRandomCourses(amount:number) {
    let courses: Course[] = [];
      for (let i = 0; i < amount; i++) {
        courses.push(createRandomCourse());
      }
      return courses;
}

export function createRandomCourse(): Course {
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
   const course:Course = createCourse(id, name, lecture, hours, cost, type, dayEvening, startDate);
   return course;
 }
