import CoursesServiceRest from "../services/courses-sevice-rest";
import College from '../services/college';
const URL = "http://localhost:3500/courses";
export const courseProvider = new CoursesServiceRest(URL);

// export const colledge: Colledge = new Colledge(courseProvider)