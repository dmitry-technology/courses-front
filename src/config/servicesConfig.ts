import CoursesServiceRest from "../services/courses-sevice-rest";
import College from '../services/college';
import AuthServiceJWT from "../services/auth-service-jwt";
import CoursesServiceFire from "../services/courses-service-firestore";
import AuthServiceFake from "../services/auth-service-fake";
import courseData from './courseData.json'
import AuthServiceFire from "../services/auth-service-fire";

const URL = "http://localhost:3500/courses";
// export const courseProvider = new CoursesServiceRest(URL); //REST
export const courseProvider = new CoursesServiceFire("Courses", courseData.minId, courseData.maxId);
export const college: College = new College(courseProvider);
// export const authService = new AuthServiceJWT("http://localhost:3500");
// export const authService = new AuthServiceFake();
export const authService = new AuthServiceFire("administrators");