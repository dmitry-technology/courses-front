import { UserData } from "./common/user-data";
import Course from "./course";

export type StoreType = {
    courses: Course[];
    userData: UserData;
    addFn: (course: Course) => Promise<Course>;
    removeFn: (id: number) => Promise<Course>;
    updateFn: (id: number, course: Course) => Promise<Course>;
}