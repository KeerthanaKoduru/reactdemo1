/* export const loadUser = async () => {
  try {
    const response = await API.get("/auth"); //get request to the backend server to fetch the user details
    console.log(response);
    localStorage.setItem("token", response.data.token);
    return { data: response.data, status: response.status }; //{user details}
  } catch (error) {}
};
export const loginUser = async (userData) => {
  try {
    const response = await API.post("/auth", userData);
    return { data: response.data, status: response.status };
  } catch (error) {}
};
//registerUser-Registers a new user with the provided details.
//file3
export const registerUser = async (userData) => {
  try {
    //url:http://localhost:9500/api/users/
    //http method:post
    //request body:userData
    //response:success or failure message
    //response(success):{token}
    //response(failure):{error validational details}
    const response = await API.post("/users", userData); //post request to the backend server
    //below is success response
    return { data: response.data, status: response.status }; //{token}
  } catch (error) {}
}; //for asynchronous operation
//write try and then catch blocks first create them empty
 */

import API from "../../utils/api";

// load user details
export const loadUser = async () => {
  try {
    // URL: http://localhost:9500/api/auth/user
    // method: GET
    // headers: {x-auth-token: token}
    // response(success): {user details}
    // response(failure): {error validational details}
    const response = await API.get("/auth");
    // below return is ur success response
    //console.log(response);
    //localStorage.setItem("token", response.data.token);
    return { data: response.data, status: response.status };
  } catch (error) {}
};

export const loginUser = async (userData) => {
  try {
    // URL: http://localhost:9500/api/auth
    // method: POST
    // body: userData
    // response(success): {token}
    // response(failure): {error validational details}
    const response = await API.post("/auth", userData);
    // below return is ur success response
    console.log(response.data);
    localStorage.setItem("token", response.data.token);
    return { data: response.data, status: response.status };
  } catch (error) {}
};
// registerUser - Registers a new user with the provided user data
export const registerUser = async (userData) => {
  try {
    // URL: http://localhost:9500/api/users
    // method: POST
    // body: userData
    // response(success): {token}
    // response(failure): {error validational details}
    const response = await API.post("/users", userData);
    // below return is ur success response
    console.log(response.data);
    localStorage.setItem("token", response.data.token);
    return { data: response.data, status: response.status };
  } catch (error) {}
};
