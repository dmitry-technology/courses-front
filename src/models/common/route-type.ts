import { UserInfo } from "firebase/auth";
import { ReactNode } from "react";

export type RouteType = {
    path : string;
    element: ReactNode;
    label: string;
    authenticated?: boolean;
    adminOnly?: boolean;
    isSocialAuth?: boolean;
    social?: UserInfo | undefined;
    icon: ReactNode
}