import { Course } from "../models/course";
import CoursesService from "./courses-service";

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
        const response = await fetch(`${this.url}/${encodeURIComponent(id)}`,
            {
                method: "DELETE"
            });
        return await response.json();
    }
    async exists(id: number): Promise<boolean> {
        try {
            const response = await fetch(this.getUrlId(id));
            return response.ok;
        } catch (err) {
            throw "server is not available";
        }
    }
    get(id?: number): Promise<Course[]> | Promise<Course> {
        return id == undefined ? (this.fetchGet(this.url) as Promise<Course[]>) :
            this.fetchGet(`${this.url}/${id}`) as Promise<Course>;
    }
    private async fetchGet(url: string): Promise<any> {
        const r = await fetch(url);
        return await r.json();
    }
    private getUrlId(id: number) {
        return `${this.url}/${encodeURIComponent(id)}`;
    }
    async update(id: number, newCourse: Course): Promise<Course> {
        const response = await fetch(this.getUrlId(id), {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newCourse)
        });
        return await response.json();
    }

}
