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

export const logout = async () => {
  try {
    await axios.post(`/logout`);
    console.log("✅ Logout successful");
  } catch (err: any) {
    console.error("❌ Logout failed:", err?.response?.data || err.message);
    throw new Error("Logout failed");
  }
};
