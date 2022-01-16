import { LoginData } from "../models/common/login-data";
import { UserData } from "../models/common/user-data";
import {Observable} from "rxjs"
import AuthService from "./auth-service";

export default class AuthServiceJWT implements AuthService{
    getUserData(): Observable<UserData> {
        throw new Error("Method not implemented.");
    }
    login(loginData: LoginData): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
    logout(): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
    
}