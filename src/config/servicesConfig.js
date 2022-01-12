import CoursesServiceRest from "../services/courses-sevice-rest";
const URL = "http://localhost:3500/courses";
export const courseProvider = new CoursesServiceRest(URL);