import CoursesServiceRest from "../services/courses-sevice-rest";
import College from '../services/college';
import AuthServiceJWT from "../services/auth-service-jwt";
import CoursesServiceFire from "../services/courses-service-firestore";
import AuthServiceFake from "../services/auth-service-fake";
import courseData from './courseData.json'
import AuthServiceFire from "../services/auth-service-fire";
import CoursesServiceRestJava from "../services/courses-sevice-rest-java";
import AuthServiceRestJava from "../services/auth-service-rest-java";


/**rest */
// const URL = "http://localhost:3500/courses";
// export const courseProvider = new CoursesServiceRest(URL); //REST
// export const authService = new AuthServiceJWT("http://localhost:3500");

/**firebase */
// export const authService = new AuthServiceFire("administrators");
export const courseProvider = new CoursesServiceFire("Courses", courseData.minId, courseData.maxId);

/**fake auth */
export const authService = new AuthServiceFake();

/**java server rest */
// const URL = "http://localhost:8080";
// export const courseProvider = new CoursesServiceRestJava(`${URL}/courses`, URL);
// export const authService = new AuthServiceRestJava(URL);
// export const authService = new AuthServiceJWT(URL);


/**const for local storage */
export const AUTH_TOKEN = "auth_token";
export const USER_DATA = "user_data";



export const college: College = new College(courseProvider);
