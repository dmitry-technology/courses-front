import { Course } from "../models/course";
import CoursesService from "./courses-service";

export default class CoursesServiceRest implements CoursesService {
    add(course: Course): Course {
        throw new Error("Method not implemented.");
    }
    remove(id: number): Course {
        throw new Error("Method not implemented.");
    }
    exists(id: number): boolean {
        throw new Error("Method not implemented.");
    }
    get(id?: number): Promise<Course[]> | Promise<Course> {
        throw new Error("Method not implemented.");
    }
    update(id: number, newCourse: Course): Course {
        throw new Error("Method not implemented.");
    }
    
}