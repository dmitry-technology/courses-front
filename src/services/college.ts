import CoursesService from "./courses-service";
import {Observable} from 'rxjs'
import { map } from "rxjs/operators";
import Course from "../models/course";


export default class College {
    constructor(private coursesSerivece: CoursesService) { }
    addCourse(course: Course): Promise<Course> {
        return this.coursesSerivece.add(course);
    }
    removeCourse(id: number): Promise<Course> {
        return this.coursesSerivece.remove(id);
    }
    getCourse(id: number): Promise<Course> {
        return this.coursesSerivece.get(id) as Promise<Course>;
    }
    updateCourse(id: number, course: Course): Promise<Course> {
        return this.coursesSerivece.update(id, course);
    }
    exists(id: number): Promise<boolean> {
        return this.coursesSerivece.exists(id);
    }
    getAllCourses(): Observable<Course[]> {
        return (this.coursesSerivece.get() as Observable<Course[]>)
        .pipe(map(courses => courses.map(course => ({...course, openDate: new Date(course.openDate)}))));
    }
    getAll(): Promise<Course[]> {
        return this.coursesSerivece.getAll!() as Promise<Course[]>;
    }

}