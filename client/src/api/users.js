import { axiosInstance } from "./index";

export const loginUser = async (user) => {
  try {
    const response = await axiosInstance.post("/api/users/login", user); 
    return response.data;
  } catch (error) {
    return error.response
      ? error.response.data
      : { success: false, message: "An error occurred" };
  }
};

export const registerUser = async (user) => {
  try {
    const response = await axiosInstance.post("/api/users/register", user);
    return response.data;
  } catch (error) {
    console.error("Registration error:", error);
    return {
      success: false,
      message: error.response?.data?.message || "Registration failed",
    };
  }
};
