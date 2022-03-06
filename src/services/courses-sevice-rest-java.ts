import Course from "../models/Course";
import CoursesService from "./courses-service";
import { Observable, Observer } from 'rxjs'
import ErrorCode from "../models/common/error-code"
import { CompatClient, Stomp } from "@stomp/stompjs";
import SockJS from "sockjs-client";
import { AUTH_TOKEN } from "../config/servicesConfig";


async function  getResponse(url: string, init?: RequestInit  ): Promise<Response>  {
    let flInnerCatch = false;
     try {
         const response = await fetch(url, init);
         if (response.status < 400 || response.status == 404) {
             return response ;
         }
         const err = response.status == 401 || response.status == 403 ?
         ErrorCode.AUTH_ERROR : ErrorCode.SERVER_UNAVAILABLE;
         flInnerCatch = true
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
    const response: Response = await getResponse(url, init) ;
    return await response.json();
}

function getHeaders(): { Authorization?: string, "Content-Type": string } {
    return { "Content-Type": "application/json",
     Authorization: localStorage.getItem(AUTH_TOKEN) as string};
}
export default class CoursesServiceRestJava implements CoursesService {
    private courses: Course[] = [];
    stompClient: CompatClient | undefined;
    constructor(private url: string, private wsUrl: string) { }
     add(course: Course): Promise<Course> {
        (course as any).userId = 1;
        return requestRest(this.url, {
            method: 'POST',
            headers: getHeaders(),
            body: JSON.stringify(course)
        })
       
    }
    async remove(id: number): Promise<Course> {
        const oldCourse = await this.get(id);
        await requestRest(this.getUrlId(id),{
            method: "DELETE",
            headers: getHeaders()
        });
        return oldCourse as Course;
    }
    private getUrlId(id: number) {
        return `${this.url}/${id}`;
    }
    async exists(id: number): Promise<boolean> {
        const response = await getResponse(this.getUrlId(id),{
            headers: getHeaders(),
        } );
        return response.ok;
    }
    get(id?: number): Observable<Course[]> | Promise<Course> {
        if (id) {
            return fetchGet(this.getUrlId(id));
        } else {
            return new Observable<Course[]>(observer => {
                 this.fetchData(observer);
                 this.connect(observer);
                return () => {this.disconnect()};
            });
        }

    }
    async update(id: number, newCourse: Course): Promise<Course> {
        const oldCourse = await this.get(id);
        await fetch(this.getUrlId(id), {
            method: 'PUT',
            headers: getHeaders(),
            body: JSON.stringify(newCourse)
        });
        return oldCourse as Course;
    }
    private fetchData(observer: Observer<Course[]>) {
        fetchGet(this.url).then(data => {this.courses=data; observer.next(data);}).
        catch(err => observer.error(err))
    }
    private connect(observer: Observer<Course[]>) {
        const webSocket = new SockJS(`${this.wsUrl}/websocket-courses`);
        this.stompClient = Stomp.over(webSocket);
        this.stompClient.connect({}, 
            (frame: any) => {
                this.stompClient!.subscribe("/topic/courses", message => {
                    const payLoad: any = JSON.parse(message.body);
                    const cmd: String = payLoad.command;
                    const id: number = parseInt(payLoad.id);
                    switch (cmd) {
                        case "added":
                            (this.get(id) as Promise<Course>).then((course) => {
                                this.courses.push(course);
                                observer.next(this.courses);
                            })
                            break;
                        case "removed":
                            this.removeCourseFromCash(id);
                            observer.next(this.courses);
                            break;
                        case "updated":
                            (this.get(id) as Promise<Course>).then((course) => {
                                this.removeCourseFromCash(id);
                                this.courses.push(course);
                                observer.next(this.courses);
                            })
                            break;
                        default:
                            console.log("not found command");
                            break;
                    }
                });
            }, (error:any) => observer.error(error), () => observer.error("disconnected"))
    }
    private disconnect() {
        this.stompClient?.disconnect()
    }
    private removeCourseFromCash(id: number) {
        let index = this.courses.findIndex(c => c.id == id);
        this.courses.splice(index, 1);
    }
}


 function fetchGet(url: string): Promise<any> {
        return  requestRest(url, {
            headers: {Authorization: localStorage.getItem(AUTH_TOKEN) as string}
        }); 
    
}