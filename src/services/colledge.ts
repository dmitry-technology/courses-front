import { Course } from "../models/course";
import CoursesService from "./courses-service";

export default class Colledge {
    constructor(private coursesSerivece: CoursesService) { }
    async addCourse(course: Course): Promise<Course> {
        return await this.coursesSerivece.add(course);
    }
    async removeCourse(id: number): Promise<Course> {
        return await this.coursesSerivece.remove(id);
    }
    async getCourse(id: number): Promise<Course> {
        return await this.coursesSerivece.get(id) as Course;
    }
    async updateCourse(id: number, course: Course): Promise<Course> {
        const res = this.coursesSerivece.get(id) as Promise<Course>;
        this.coursesSerivece.update(id, course);
        return res;
    }
    async exists(id: number): Promise<boolean> {
        return this.coursesSerivece.exists(id);
    }
    async getAllCourses(): Promise<Course[]> {
        return await this.coursesSerivece.get() as Course[];
    }

}