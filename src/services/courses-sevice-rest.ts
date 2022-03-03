import Course from "../models/Course";
import CoursesService from "./courses-service";
import { Observable, from } from 'rxjs'
import ErrorCode from "../models/common/error-code"
import { AUTH_TOKEN } from "../config/servicesConfig";
const pollingInterval: number = 2000;

async function getResponse(url: string, init?: RequestInit): Promise<Response> {
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
        if (flInnerCatch) {
            throw err;
        } else {
            throw ErrorCode.SERVER_UNAVAILABLE;
        }
    }
}

async function requestRest(url: string, init?: RequestInit): Promise<any> {
    const response = await getResponse(url, init);
    return await response.json();
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
       add(course: Course): Promise<Course> {
        (course as any).userId = 1;
        return requestRest(this.url, {
            method: "POST",
            headers: getHeaders(),
            body: JSON.stringify(course)
        })
    }

    async remove(id: number): Promise<Course> {
        const oldCourse = await this.get(id);
        await requestRest(this.getUrlId(id), {
            method: "DELETE",
            headers: getHeaders()
        })
        return oldCourse as Course;
    }

    async exists(id: number): Promise<boolean> {
        const response = await getResponse(this.getUrlId(id),{
            headers: getHeaders(),
        } );
        return response.ok;
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
                }
            }, pollingInterval);
            return () => clearInterval(interval);
        })
    }

    private async fetchGet(url: string): Promise<any> {
        return  requestRest(url, {
            headers: getHeaders()
        }); 
    }

    private getUrlId(id: number) {
        return `${this.url}/${id}`;
    }

    async update(id: number, newCourse: Course): Promise<Course> {
        const oldCourse = await this.get(id);
        await fetch(this.getUrlId(id), {
            method: "PUT",
            headers: getHeaders(),
            body: JSON.stringify(newCourse)
        });
        return oldCourse as Course;
    }

}
