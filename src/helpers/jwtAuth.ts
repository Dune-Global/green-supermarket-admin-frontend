import axios from "axios";

axios.defaults.baseURL =
  "https://greensupermarket-backend.azurewebsites.net/api/v1";

export const adminLogin = async (empId: number, password: string) => {
  try {
    const response = await axios.post("/admins/authentication", {
      empId: empId,
      password: password,
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const decodeToken = async (token: string) => {
  // getting token from localstorage as a bearer token need to return the response
  try {
    const response = await axios.get("/admins/auth", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
