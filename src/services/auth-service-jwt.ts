import { LoginData } from "../models/common/login-data";
import { nonAuthorizedUser, UserData } from "../models/common/user-data";
import { Observable } from "rxjs"
import { AUTH_TOKEN } from "./courses-sevice-rest";
import { Buffer } from "buffer";
import AuthService from "./auth-service";
const pollingInterval = 2000;

export default class AuthServiceJWT implements AuthService {
    private cashe = '';
    constructor(private url: string) { }
    getUserData(): Observable<UserData> {
        return new Observable<UserData>(subscribe => {
            let userData = fetchUserData();
            this.cashe = JSON.stringify(userData);
            subscribe.next(userData);
            setInterval(() => {
                userData = fetchUserData();
                const userDataJSON = JSON.stringify(userData);
                if (userDataJSON !== this.cashe) {
                    this.cashe = userDataJSON;
                    subscribe.next(userData);
                }
            }, pollingInterval);
        });
    }
    async login(loginData: LoginData): Promise<boolean> {
        let res = false;
        const response = await fetch(`${this.url}/login`, {
            method: "POST",
            headers: {
                'Content-Type': "application/json"
            },
            body: JSON.stringify(loginData)
        });
        if (response.ok) {
            const token = await response.json();
            localStorage.setItem(AUTH_TOKEN, token.accessToken);
            res = true;
        }
        return Promise.resolve(res);
    }
    logout(): Promise<boolean> {
        localStorage.removeItem(AUTH_TOKEN);
        return Promise.resolve(true);
    }

}

function fetchUserData(): UserData {
    const token: string | null = localStorage.getItem(AUTH_TOKEN);

    return !token ? nonAuthorizedUser : tokenToUserData(token);
}
function tokenToUserData(token: string): UserData {
    let resUserData = nonAuthorizedUser;
    const rawPayload = token.split('.')[1]; //JSON in Base64
    const payload: any = JSON.parse(Buffer.from(rawPayload, 'base64').toString("ascii"));
    if (payload.exp < (Date.now() / 1000)) {
        localStorage.removeItem(AUTH_TOKEN);
    } else {
        resUserData = { userName: payload.email, displayName: payload.email, isAdmin: +payload.sub === 1 }
    }
    return resUserData;
}

