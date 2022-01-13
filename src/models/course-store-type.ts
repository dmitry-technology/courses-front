import Course from "./course";

export type StoreType = {
    courses: Course[];
    addFn?: (course: Course) => void;
    removeFn?: (id: number) => void;
}