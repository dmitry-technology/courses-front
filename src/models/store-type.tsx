import { CourseType } from "./course-type";

export type StoreType = {
    courses : CourseType[];
    addFn ?: (course:CourseType) => void;
    removeFn ?: (id:number) => void;
}