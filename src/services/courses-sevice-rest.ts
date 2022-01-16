import Course from "../models/course";
import CoursesService from "./courses-service";
import {Observable, from} from 'rxjs'
const DELAY: number = 2000;
export const AUTH_TOKEN = "auth_token";

function getHeaders():{Authorization: string, "Content-Type": string} {
    return {Authorization: "Bearer " + localStorage.getItem(AUTH_TOKEN), 
    "Content-Type": "application/json"}
}

export default class CoursesServiceRest implements CoursesService {
    private currentResponse = "";
    constructor(private url: string) { }
    async add(course: Course): Promise<Course> {
        try {
            const response = await fetch(this.url, {
                method: "POST",
                headers: getHeaders(),
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

    get(id?: number): Observable<Course[]> | Promise<Course> {
        return id == undefined ? this.getObservable() : this.fetchGet(`${this.url}/${id}`) as Promise<Course>;
    }

    private getObservable(): Observable<Course[]>{
        return new Observable<Course[]>(subscriber => {
            const interval = setInterval(async ()=> {
                try {
                    const courses: Course[] = await this.fetchGet(this.url);
                        const getResponce: string = JSON.stringify(courses);
                        if(this.currentResponse !== getResponce){
                            this.currentResponse = getResponce;
                            subscriber.next(courses);
                        }
                } catch (err) {
                    subscriber.error(err);
                    clearInterval(interval);
                } 
            }, DELAY);
            return () => clearInterval(interval);
        })  
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
