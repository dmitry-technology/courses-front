export type UserData = {
    userName: string;
    isAdmin: boolean;
    displayName: string;
}

export const nonAuthorizedUser: UserData = {displayName:"", isAdmin:false, userName:""}
