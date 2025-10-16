/* //ur axios related configurations and api calls detailing will be added here step2
//file2
import axios from "axios";

const API = axios.create({
  timeout: 4000, //4 seconds time limit to wait for the response from the backend server
  baseURL: "/api", //this is the base url for all the rest calls to be made from the frontend to the backend server vite will bring the url of api here
  headers: {
    "Content-Type": "application/json", //for all the rest calls content type is json
  },
}); //it will give u the new instance of axios with some common settings/configuration. This is a one time activity
//for 10 rest calls this interceptors execute 10 times
API.interceptors.request.use((config) => {
  //config is the request object which is going to the backend server
  const NO_AUTH_URLS = ["/auth", "/users"]; //array of urls which do not require token
  //   console.log(config.method);
  //   if (NO_AUTH_URLS.some((url) => config.url?.toLowerCase().startsWith(url))) {
  //     return config; //if the url matches with any of the no auth urls return the config as it is
  //   }
  //   const token = localStorage.getItem("token"); //get the token from local storage
  //   if (token) {
  //     config.headers["x-auth-token"] = token; //add the token to the request headers if token is present
  //   }
  //   return config;
  // });
  // export default API;

  // //service uses axios instance to make the rest calls get/post/put/delete ==> it will use configurations (timeout, baseURL) defined in this file
  // // it will go for the network call there ur proxy will be applied this would be done internally by axios
  console.log(config.method);
  const token = localStorage.getItem("token");
  console.log(token);
  if (
    NO_AUTH_URLS.includes(config.url?.toLowerCase()) &&
    config.method === "get"
  ) {
    console.log("inside the get check condition with get method");
    config.headers["x-auth-token"] = token;
    return config;
  }
  if (NO_AUTH_URLS.some((url) => config.url?.toLowerCase().startsWith(url))) {
    console.log("inside the get check condition");

    return config;
  }
  if (token) {
    console.log("inside the api.js adding token");
    config.headers["x-auth-token"] = token;
  }
  return config;
});
export default API;
// no need to provide the complete url in ur api calls`
// /api : not required
// /api : i have added as a baseURL.
// /api/users/ someting.
// /api/v2/ sfdsa fds

// service ==> axios instance--> get /post/put/delete===> it will use configurations (timeout (4000ms) , baseURL ("/api") )==> it will go for the network call there ur proxy will be applied ==> this would be done internally by axios
//
 */

// ur axios related configurations and api calls detailing will be added here.
import axios from "axios";

const API = axios.create({
  timeout: 4000, // 4 seconds time limit to wait for the
  // response from the server.
  baseURL: "/api",
  headers: {
    "Content-Type": "application/json",
  },
}); // it will give u the new instance of axios with some common settings / configurations
// one time activity.
// if i am performing 10 rest calls then this interceptor will be executed => 10 times
API.interceptors.request.use(
  // add the token to header called x-auth-token
  (config) => {
    const NO_AUTH_URLS = ["/auth", "/users"];
    // token should not be added for login and register.
    // / /api/auth get method helps to load the user details and it requires the token
    console.log(config.method);
    const token = localStorage.getItem("token");
    console.log(token);
    if (
      NO_AUTH_URLS.includes(config.url?.toLowerCase()) &&
      config.method === "get"
    ) {
      console.log("inside the get check condition with get method");
      config.headers["x-auth-token"] = token;
      return config;
    }
    if (NO_AUTH_URLS.some((url) => config.url?.toLowerCase().startsWith(url))) {
      console.log("inside the get check condition");

      return config;
    }
    if (token) {
      console.log("inside the api.js adding token");
      config.headers["x-auth-token"] = token;
    }
    return config;
  }
);
export default API;
// no need to provide the complete url in ur api calls`
// /api : not required
// /api : i have added as a baseURL.
// /api/users/ someting.
// /api/v2/ sfdsa fds

// service ==> axios instance--> get /post/put/delete===> it will use configurations (timeout (4000ms) , baseURL ("/api") )==> it will go for the network call there ur proxy will be applied ==> this would be done internally by axios
//
