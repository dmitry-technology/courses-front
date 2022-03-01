import  Course  from "../models/course";
import {Observable} from 'rxjs'

export default interface CoursesService {
    add(course: Course): Promise<Course>;
    remove(id: number): Promise<Course>;
    exists(id: number): Promise<boolean>;
    get(id?: number): Observable<Course[]> | Promise<Course>;
    update(id: number, newCourse: Course): Promise<Course>;
    getAll?() : Promise<Course[]>;
}