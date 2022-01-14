import Course from "../models/course";
import CoursesService from "./courses-service";
import {Observable, from} from 'rxjs'


export default class CoursesServiceRest implements CoursesService {
    private currentResponse = "";
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
         if(id == undefined){
        const observable = new Observable<Course[]>((subscriber) => {
            const interval = setInterval(async () => {
                try {
                    subscriber.next([]);
                    // const response = await this.fetchGet(this.url);
                    // if(this.currentResponse !== JSON.stringify(response)){
                    //     this.currentResponse = response;
                    //     subscriber.next(response);
                    // }
                } catch (err) {
                    subscriber.error(err)
                    clearInterval(interval);
                }
            }, 1000);
            return clearInterval(interval);
        })
        return observable;
    }
        return this.fetchGet(`${this.url}/${id}`) as Promise<Course>;
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
