import { CourseType } from "./course";

export type StoreType = {
    courses : CourseType[];
    addFn ?: (course:CourseType) => void;
    removeFn ?: (id:number) => void;
}