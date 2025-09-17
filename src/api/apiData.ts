import axios from 'axios';

const API_DATA_BASE_URL = 'http://127.0.0.1:8000';

axios.defaults.baseURL = API_DATA_BASE_URL;

export const handleLogin = async (username: string, password: string) => {
  try {
    // Replace with your actual API endpoint
    const response = await axios.post(`${API_DATA_BASE_URL}/api/login`, { username, password });
    return response.data;
  } catch (error) {
    console.error("Login error:", error);
    throw error;
  }
};

export const logout = async (token: string) => {
  try {
    const response = await axios.post(`${API_DATA_BASE_URL}/api/logout`, {}, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
    console.log("Logout successful");
    return response.data;
  } catch (err: any) {
    console.error("Logout API failed:", err?.response?.data || err.message);
    // Don't throw error - we want to clear local storage even if API fails
    throw err; // Re-throw to let AuthContext handle it
  }
};
