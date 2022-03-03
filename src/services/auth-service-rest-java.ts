import { Observable, Subscriber } from "rxjs";
import { LoginData } from "../models/common/login-data";
import { nonAuthorizedUser, UserData } from "../models/common/user-data";
import AuthService from "./auth-service";
import { AUTH_ROLE, AUTH_TOKEN, AUTH_USER } from "../config/servicesConfig";

export default class AuthServiceRestJava implements AuthService {
    
    subscribe: Subscriber<UserData> = new Subscriber(); 
    constructor(private url: string) { }

    private fetchUserData(): UserData {
        const token: string | null = localStorage.getItem(AUTH_TOKEN);
        return !token ? nonAuthorizedUser : authUserData();
    }

    getUserData(): Observable<UserData> {

        return new Observable<UserData>(subscribe => {
            this.subscribe = subscribe;
            let userData: UserData = this.fetchUserData();
            subscribe.next(userData);
        });
    }
    async login(loginData: LoginData): Promise<boolean> {
        let res = false;
        try {
            const response = await fetch(`${this.url}/login`, {
                method: "POST",
                headers: {
                    'Content-Type': "application/json"
                },
                body: JSON.stringify(loginData)
            });
            if (response.ok) {
                const token = await response.json();
                console.log(token.role);
                
                const userData: UserData = { userName: loginData.email, displayName: loginData.email, isAdmin: token.role === "ROLE_ADMIN" };
                localStorage.setItem(AUTH_TOKEN, token.accessToken);
                localStorage.setItem(AUTH_ROLE, token.role);
                localStorage.setItem(AUTH_USER, JSON.stringify(userData));                
                this.subscribe.next(userData);
                res = true;
            }
            return res;
        } catch (err) {
            console.log(err);
            
            localStorage.setItem(AUTH_TOKEN, 'xxx'); //only for activating poller after service availability
            localStorage.setItem(AUTH_ROLE, 'xxx');
            this.subscribe.next(nonAuthorizedUser);
            return false;
        }
    }
    logout(): Promise<string | null> {
        localStorage.removeItem(AUTH_TOKEN);
        this.subscribe.next(nonAuthorizedUser);
        return Promise.resolve("true");
    }

}


function authUserData(): UserData{
    const authUser = localStorage.getItem(AUTH_USER);
    const authRole = localStorage.getItem(AUTH_ROLE);
    if(!!authUser){
        return { userName: authUser, displayName: authUser, isAdmin: authRole === "ROLE_ADMIN" }
    } else {
        return nonAuthorizedUser;
    }
}