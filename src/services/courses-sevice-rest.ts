import Course from "../models/course";
import CoursesService from "./courses-service";
import {Observable, from} from 'rxjs'


export default class CoursesServiceRest implements CoursesService {
    constructor(private url: string) { }
    async add(course: Course): Promise<Course> {
        try {
            const response = await fetch(this.url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(course)
            });
            return await response.json();
        } catch (err) {
            console.log("server is not available!!!");
            throw "server is not available";
        }
    }
    async remove(id: number): Promise<Course> {
        const oldCourse = await this.get(id);
        await fetch(this.getUrlId(id),
            {
                method: "DELETE"
            });
        return oldCourse as Course;
    }
    async exists(id: number): Promise<boolean> {
        try {
            const response = await fetch(this.getUrlId(id));
            return response.ok;
        } catch (err) {
            throw "server is not available";
        }
    }
    //TODO FIXME
    get(id?: number): Observable<Course[]> | Promise<Course> {
        return id == undefined ? from(this.fetchGet(this.url)) as Observable<Course[]> :
            this.fetchGet(`${this.url}/${id}`) as Promise<Course>;
    }
    private async fetchGet(url: string): Promise<any> {
        const r = await fetch(url);
        return await r.json();
    }
    private getUrlId(id: number) {
        return `${this.url}/${id}`;
    }
    async update(id: number, newCourse: Course): Promise<Course> {
        const oldCourse = await this.get(id);
        const response = await fetch(this.getUrlId(id), {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newCourse)
        });
        return oldCourse as Course;
    }

}
