import Course from "../models/course";
import CoursesService from "./courses-service";
import { Observable, from } from 'rxjs'
import ErrorCode from "../models/common/error-code"
const DELAY: number = 2000;
export const AUTH_TOKEN = "auth_token";

async function gerResponse(url: string, init?: RequestInit): Promise<Response> {
    let flInnerCatch = false;
    try {
        const response = await fetch(url, init);
        if (response.status < 400 || response.status == 404) {
            return response;
        }
        const err = response.status == 401 || response.status == 403 ? 
        ErrorCode.AUTH_ERROR : ErrorCode.SERVER_UNAVAILABLE;
        flInnerCatch = true;
        throw err;
    } catch (err) {
        if(flInnerCatch) {
            throw err;
        } else {
            throw ErrorCode.SERVER_UNAVAILABLE;
        }
    }
}

async function requestRest(url: string, init?: RequestInit): Promise<Response> {
    const response = await gerResponse(url, init);
    return response.json();
}

function getHeaders(): { Authorization: string, "Content-Type": string } {
    return {
        Authorization: "Bearer " + localStorage.getItem(AUTH_TOKEN),
        "Content-Type": "application/json"
    }
}

export default class CoursesServiceRest implements CoursesService {
    private cache = "";
    constructor(private url: string) { }
    async add(course: Course): Promise<Course> {
        try {
            (course as any).userId = 1;
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
                method: "DELETE",
                headers: getHeaders()
            });
        return oldCourse as Course;
    }
    async exists(id: number): Promise<boolean> {
        try {
            const response = await fetch(this.getUrlId(id), {
                headers: getHeaders()
            });
            return response.ok;
        } catch (err) {
            throw "server is not available";
        }
    }

    get(id?: number): Observable<Course[]> | Promise<Course> {
        return id == undefined ? this.getObservable() : this.fetchGet(`${this.url}/${id}`) as Promise<Course>;
    }

    private getObservable(): Observable<Course[]> {
        this.cache = '';
        return new Observable<Course[]>(observer => {
            const interval = setInterval(async () => {
                try {
                    if (!!localStorage.getItem(AUTH_TOKEN)) {
                        const courses: Course[] = await this.fetchGet(this.url);
                        const getResponce: string = JSON.stringify(courses);
                        if (this.cache !== getResponce) {
                            this.cache = getResponce;
                            observer.next(courses);
                        }
                    }
                } catch (err) {
                    this.cache = "";
                    observer.error(err);
                    clearInterval(interval);
                }
            }, DELAY);
            return () => clearInterval(interval);
        })
    }

    private async fetchGet(url: string): Promise<any> {

        const r = await fetch(url, {
            headers: getHeaders()
        });
        if (r.status === 401 || r.status === 403) {
            localStorage.setItem(AUTH_TOKEN, '');
            throw Error(`${r.status}`);
        }
        return await r.json();

    }

    private getUrlId(id: number) {
        return `${this.url}/${id}`;
    }

    async update(id: number, newCourse: Course): Promise<Course> {
        const oldCourse = await this.get(id);
        const response = await fetch(this.getUrlId(id), {
            method: "PUT",
            headers: getHeaders(),
            body: JSON.stringify(newCourse)
        });
        return oldCourse as Course;
    }

}
