import { UserData } from "./common/user-data";
import Course from "./course";

export type StoreType = {
    courses: Course[];
    userData: UserData;
    addFn?: (course: Course) => void;
    removeFn?: (id: number) => void;
}