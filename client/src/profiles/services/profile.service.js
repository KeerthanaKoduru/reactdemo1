import API from "../../utils/api";

export const deleteEducation = (eduId) =>
  API.delete(`/profile/education/${eduId}`);

export const deleteExperience = (expId) =>
  API.delete(`/profile/experience/${expId}`);

export const addEducation = async (formData) => {
  try {
    const response = await API.put("/profile/education", formData);
    return { data: response.data, status: response.status };
  } catch (error) {
    console.log(error.response);
    throw {
      data: error.response.data,
      status: error.response.status,
    };
  }
};

export const addExperience = async (formData) => {
  try {
    const response = await API.put("/profile/experience", formData);
    return { data: response.data, status: response.status };
  } catch (error) {
    console.log(error.response);
    throw {
      data: error.response.data,
      status: error.response.status,
    };
  }
};

export const createProfile = async (formData) => {
  try {
    const response = await API.post("/profile", formData);
    return { data: response.data, status: response.status };
  } catch (error) {
    console.log(error.response);
    throw {
      data: error.response.data,
      status: error.response.status,
    };
  }
};

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
