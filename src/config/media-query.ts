

export enum CourseFields {
    id = "id",
    courseName = "courseName",
    lecturerName= "lecturerName", 
    hours = "hours",
    cost = "cost",
    type = "type",
    dayEvening = "dayEvening",
    openDate = "openDate",
    actions = "actions" 
}

export function getCoursesFields(): Map<string, CourseFields[]> {
    return new Map<string, CourseFields[]>([
        ["isMobile", [CourseFields.courseName, CourseFields.openDate]],
        ["isLaptop", [CourseFields.courseName, CourseFields.lecturerName, CourseFields.openDate, CourseFields.actions]],
        ["isDesktop", [CourseFields.courseName, CourseFields.lecturerName, CourseFields.hours, CourseFields.cost, CourseFields.openDate, CourseFields.actions]], 
    ]);
}

