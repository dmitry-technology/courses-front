import AuthService from "./auth-service";
import { AuthProvider, FacebookAuthProvider, getAuth, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup, signOut, TwitterAuthProvider, User } from 'firebase/auth';  //state
import { authState } from 'rxfire/auth';  //publisher state
import { Observable, of, from } from "rxjs";      //publisher
import { filter, map, mergeMap } from "rxjs/operators";     //map user to Userdate
import { docData, collectionData } from "rxfire/firestore";
import { LoginData } from "../models/common/login-data";
import { nonAuthorizedUser, UserData } from "../models/common/user-data";
import appFire from "../config/fire-config";
import { collection, CollectionReference, getFirestore, doc, getDoc, DocumentData, DocumentReference, DocumentSnapshot } from "firebase/firestore";

const socialauth: Map<string,AuthProvider> = new Map<string,AuthProvider>(
    [
        ["google", new GoogleAuthProvider() ],
        ["twitter", new TwitterAuthProvider() ],
        ["facebook", new FacebookAuthProvider() ],
    ]
)

export default class AuthServiceFire implements AuthService {
    private authFire = getAuth(appFire);

    private db = getFirestore(appFire);
    private collection;

    constructor(private collectionAdministrators: string) {
        this.collection = collection(this.db, this.collectionAdministrators);

    }
    // getUserData(): Observable<UserData> {
    //     return authState(this.authFire).pipe(
    //         mergeMap(userFire => {
    //             return collectionData(this.collection).pipe(
    //                 map(admins => (
    //                     !!userFire ? {
    //                         userName: userFire.uid,
    //                         isAdmin: admins.findIndex(doc => doc.id === userFire.uid) >= 0,
    //                         displayName: userFire.email!
    //                     } : nonAuthorizedUser
    //                 ))
    //             )
    //         }
    //         ));
    // }

    async isAdmin(id?: string): Promise<boolean> {
        if (!id) {
            return false;
        }

        const docRef: DocumentReference = doc(this.collection, id);
        const docSnap: DocumentSnapshot = await getDoc(docRef);

        return docSnap.exists();
    }

    getUserData(): Observable<UserData> {
        return authState(this.authFire)
            .pipe ( mergeMap(user => from(this.isAdmin(user?.uid))
                .pipe(map((isAdmin) => {
                    if (!!user) {
                        return {
                            userName: user.uid,
                            displayName: user.displayName ?? user.email!,
                            isAdmin: isAdmin,
                            social: user.providerData[0]
                        };
                    }
                    return nonAuthorizedUser;
                }))
            ));
    }

    login(loginData: LoginData): Promise<boolean> {

        if (!!loginData.password) {
            return signInWithEmailAndPassword(this.authFire, loginData.email, loginData.password).then(() => true).catch(() => false);
        } else {
            let authProvider: any;
            switch (loginData.email) {
                case "google":
                    authProvider = new GoogleAuthProvider();
                    break;
                case "twitter":
                    authProvider = new TwitterAuthProvider();
                    break;
                case "facebook":
                    authProvider = new FacebookAuthProvider();
                    break;
                default:
                    console.log("error name provider");
                    break;
            }
            socialauth.get(loginData.email);
            return signInWithPopup(this.authFire, authProvider).then(() => true).catch(() => false);
        }
    }
    logout(): Promise<string> {
        
        const name = this.authFire.currentUser!.displayName
        return signOut(this.authFire).then(() => !!name ? name : "not auth").catch(() => !!name ? name : "not auth");
    }

}



