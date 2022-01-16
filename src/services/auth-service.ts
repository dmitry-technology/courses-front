import {Observable} from 'rxjs'
import { LoginData } from '../models/common/login-data';
import { UserData } from '../models/common/user-data';

export default interface AuthService {
    getUserData():Observable<UserData>;
    login(loginData: LoginData): Promise<boolean>;
    logout():Promise<boolean>;
}