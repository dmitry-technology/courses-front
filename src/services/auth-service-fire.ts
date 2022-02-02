import AuthService from "./auth-service";
import { getAuth, signInWithEmailAndPassword, signOut, User } from 'firebase/auth';  //state
import { authState } from 'rxfire/auth';  //publisher state
import { Observable, of, from } from "rxjs";      //publisher
import { filter, map, mergeMap } from "rxjs/operators";     //map user to Userdate
import { docData, collectionData } from "rxfire/firestore";
import { LoginData } from "../models/common/login-data";
import { nonAuthorizedUser, UserData } from "../models/common/user-data";
import appFire from "../config/fire-config";
import { collection, CollectionReference, getFirestore, doc, getDoc, DocumentData } from "firebase/firestore";

export default class AuthServiceFire implements AuthService {
    private authFire = getAuth(appFire);

    private db = getFirestore(appFire);
    private collection;

    constructor(private collectionAdministrators: string) {
        this.collection = collection(this.db, this.collectionAdministrators);

    }
    getUserData(): Observable<UserData> {
        return authState(this.authFire).pipe(
            mergeMap(userFire => {
                return collectionData(this.collection).pipe(
                    map(admins => (
                        !!userFire ? {
                            userName: userFire.uid,
                            isAdmin: admins.findIndex(doc => doc.email == userFire.email) >= 0,
                            displayName: userFire.displayName || userFire.email as string
                        } : nonAuthorizedUser
                    ))
                )}
            ));
    }

    login(loginData: LoginData): Promise<boolean> {
        return signInWithEmailAndPassword(this.authFire, loginData.email, loginData.password)
            .then(() => true).catch(() => false);
    }
    logout(): Promise<boolean> {
        return signOut(this.authFire).then(() => true).catch(() => false);
    }

}



