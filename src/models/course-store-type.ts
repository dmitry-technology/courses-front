import { UserData } from "./common/user-data";
import Course from "./course";

export type StoreType = {
    
    addFn?: (course: Course) => Promise<Course|void>;
    removeFn?: (id: number) => Promise<Course|void>;
    updateFn?: (id: number, course: Course) => Promise<Course|void>;
}