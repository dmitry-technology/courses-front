import CoursesServiceRest from "../services/courses-sevice-rest";
import College from '../services/college';
import AuthServiceJWT from "../services/auth-service-jwt";
const URL = "http://localhost:3500/courses";
export const courseProvider = new CoursesServiceRest(URL);
export const college: College = new College(courseProvider);
export const authService = new AuthServiceJWT("http://localhost:3500");