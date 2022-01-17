type Course = {
    id:number;
    courseName:string;
    lecturerName:string; 
    hours:number;
    cost:number;
    type:string;
    dayEvening:string[];
    openDate:Date;
}
 
export function createCourse(id:number, courseName:string, lecturerName:string, hours:number, cost:number, type:string, dayEvening:string[], openDate:Date): Course {
    return {
        id, courseName, lecturerName, hours, cost, type, dayEvening, openDate
    };
}

export default Course;