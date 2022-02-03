import CoursesServiceRest from "../services/courses-sevice-rest";
import College from '../services/college';
import AuthServiceJWT from "../services/auth-service-jwt";
import CoursesServiceFire from "../services/courses-service-firestore";
import AuthServiceFake from "../services/auth-service-fake";
import courseData from './courseData.json'
import AuthServiceFire from "../services/auth-service-fire";
const URL = "http://localhost:3500/courses";

/**rest */
// export const courseProvider = new CoursesServiceRest(URL); //REST
// export const authService = new AuthServiceJWT("http://localhost:3500");

/**firebase */
export const authService = new AuthServiceFire("administrators");
export const courseProvider = new CoursesServiceFire("Courses", courseData.minId, courseData.maxId);

/**fake auth */
// export const authService = new AuthServiceFake();


export const college: College = new College(courseProvider);
