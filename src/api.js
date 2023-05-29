import axios from "axios";

const API_URL = "http://localhost:8000"; // Replace with your backend server URL

export const login = async (username, password) => {
  try {
    const response = await axios.post(`${API_URL}/login`, {
      username,
      password,
    });
    return response.data.token;
  } catch (error) {
    throw new Error(error.response.data.error);
  }
};

export const signup = async (username, password) => {
  try {
    const response = await axios.post(`${API_URL}/signup`, {
      username,
      password,
    });
    return response.data.token;
  } catch (error) {
    throw new Error(error.response.data.error);
  }
};
