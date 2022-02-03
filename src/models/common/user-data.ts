import { UserInfo } from "firebase/auth"

export type UserData = {
    userName: string;
    isAdmin: boolean;
    displayName: string;
    social?: UserInfo;
}
export const DISPLAY_NAME_ERROR = 'error'
export const nonAuthorizedUser: UserData = {displayName:"", isAdmin:false, userName:""}
export const unavailableServiceUser: UserData = {userName: 'error', isAdmin: false,
 displayName: DISPLAY_NAME_ERROR}