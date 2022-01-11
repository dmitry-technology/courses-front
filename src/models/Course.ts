export type CourseType = {
    id:number;
    courseName:string;
    lecturerName:string; 
    hours:number;
    cost:number;
    type:string;
    dayEvening:string[];
    openDate:Date;
}

export function createCourse(id:number, courseName:string, lecturerName:string, hours:number, cost:number, type:string, dayEvening:string[], openDate:Date): CourseType {
    return {
        id, courseName, lecturerName, hours, cost, type, dayEvening, openDate
    };
}