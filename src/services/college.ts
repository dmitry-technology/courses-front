import CoursesService from "./courses-service";
import {Observable} from 'rxjs'
import Course from "../models/course";


export default class College {
    constructor(private coursesSerivece: CoursesService) { }
    addCourse(course: Course): Promise<Course> {
        //TODO  generate id and validation id doesn't exist
        return this.coursesSerivece.add(course);
    }
    removeCourse(id: number): Promise<Course> {
        //TODO
        return this.coursesSerivece.remove(id);
    }
    getCourse(id: number): Promise<Course> {
        return this.coursesSerivece.get(id) as Promise<Course>;
    }
    updateCourse(id: number, course: Course): Promise<Course> {
        //TODO
        return this.coursesSerivece.update(id, course);
    }
    exists(id: number): Promise<boolean> {
        return this.coursesSerivece.exists(id);
    }
    getAllCourses(): Observable<Course[]> {
        return this.coursesSerivece.get() as Observable<Course[]>;
    }

}