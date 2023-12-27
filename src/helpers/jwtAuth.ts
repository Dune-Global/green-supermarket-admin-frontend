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
