import axios from "axios";

export const axiosInstance = axios.create({
    baseURL: "http://localhost:5000", // Ensure this matches your backend server URL
    headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
    }
});
