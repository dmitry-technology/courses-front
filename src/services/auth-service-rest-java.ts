import { Observable, Subscriber } from "rxjs";
import { LoginData } from "../models/common/login-data";
import { nonAuthorizedUser, unavailableServiceUser, UserData } from "../models/common/user-data";
import AuthService from "./auth-service";
import {AUTH_TOKEN, USER_DATA } from "../config/servicesConfig";

export default class AuthServiceRestJava implements AuthService {
    
    subscriber: Subscriber<UserData> | undefined;
   
    constructor(private url: string) {

    }
    getUserData(): Observable<UserData> {
         
        return new Observable ( subscriber => {
            this.subscriber = subscriber;
        subscriber.next ( localStorage.getItem(USER_DATA) ? JSON.parse(localStorage.getItem(USER_DATA) as string) : nonAuthorizedUser)
    });
    }
    async login(loginData: LoginData): Promise<boolean> {
        let res = false;
        try {
            const response = await fetch(this.url + '/login', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                   
            },
            body: JSON.stringify(loginData)
            });
            
            if (response.ok) {
                const {accessToken, role} = await response.json();
                localStorage.setItem(AUTH_TOKEN,accessToken) ;
                const userDataObj = {userName: loginData.email, isAdmin: role=='ADMIN', displayName: loginData.email}
                localStorage.setItem(USER_DATA, JSON.stringify(userDataObj));
               
               this.subscriber?.next(userDataObj);
                

                res = true;
            }
            
        } catch (err) {
            this.subscriber?.next(unavailableServiceUser)
        }
        return res;
    }
    logout(): Promise<string> {
      localStorage.removeItem(AUTH_TOKEN);
        this.subscriber?.next(nonAuthorizedUser);
        localStorage.setItem(USER_DATA, JSON.stringify(nonAuthorizedUser));
        return Promise.resolve("true");
    }

}
