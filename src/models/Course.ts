import { CourseType } from "./course-type";

export default function createCourse(id:number, courseName:string, lecturerName:string, hours:number, cost:number, type:string, dayEvening:string[], openDate:Date): CourseType {
    return {
        id, courseName, lecturerName, hours, cost, type, dayEvening, openDate
    };
}