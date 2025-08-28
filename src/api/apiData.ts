import axios from 'axios';
import { storage } from "../utils/storage";

const API_DATA_BASE_URL = 'http://127.0.0.1:8000';

axios.defaults.baseURL = API_DATA_BASE_URL;

// User Login

export const loginUser = async (username: string, password: string) => {
  try {
    const params = new URLSearchParams();
    params.append('username', username);
    params.append('password', password);
    const response = await axios.post(`${API_DATA_BASE_URL}/api/userLogin`, params, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const data = response.data as { access_token: string };
    storage.set("token", data.access_token, 60);
    storage.set("username", username, 60);
    return data;
  } catch (error: any) {
    console.error("Login error:", error);
    let errorMessage = "Login failed. Please check your credentials.";
    if (error.response && error.response.data && error.response.data.detail) {
      errorMessage = error.response.data.detail;
    }
    throw new Error(errorMessage);
  }
};
