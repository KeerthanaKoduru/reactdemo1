import API from "../../utils/api";
export const getCurrentProfile = async () => {
  try {
    const response = await API.get("/profile/me");
    return { data: response.data, status: response.status };
  } catch (error) {
    console.log(error.response);
    throw {
      data: error.response.data,
      status: error.response.status,
    };
  }
};
