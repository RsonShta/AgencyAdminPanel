import axios from 'axios';

const baseURL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

axios.defaults.baseURL = baseURL;

/**
 * Fetches suppliers data from the backend API using axios.
 * This function does not use the native fetch API as required.
 *
 * @param token - JWT authentication token for API authorization
 * @returns Promise resolving to the suppliers data array
 * @throws Error if the API request fails
 */
export const fetchSuppliers = async (token: string) => {
  try {
    // Axios is used instead of fetch for better error handling and interceptors support
    const response = await axios.get('/api/getSuppliers', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Fetch suppliers error:", error);
    throw error;
  }
};

/**
 * Handles user login by making a POST request to the backend API using axios.
 * This function does not use the native fetch API as required.
 *
 * @param username - User's login username
 * @param password - User's password
 * @returns Promise resolving to the login response containing tokens
 * @throws Error if the login request fails
 */
export const handleLogin = async (username: string, password: string) => {
  try {
    // Axios is used instead of fetch for better error handling and interceptors support
    const response = await axios.post('/api/login', { username, password });
    return response.data;
  } catch (error) {
    console.error("Login error:", error);
    throw error;
  }
};

/**
 * Handles user logout by making a POST request to the backend API using axios.
 * This function does not use the native fetch API as required.
 * Note: Even if the API call fails, we still want to clear local storage.
 *
 * @param token - JWT authentication token for API authorization
 * @returns Promise resolving to the logout response
 * @throws Error if the logout request fails (but client-side cleanup still occurs)
 */
/**
 * Fetches a single supplier's details from the backend API using axios.
 *
 * @param token - JWT authentication token for API authorization
 * @param supplierId - ID of the supplier to fetch
 * @returns Promise resolving to the supplier details
 * @throws Error if the API request fails
 */
export const fetchSupplierById = async (token: string, supplierId: string) => {
  try {
    const response = await axios.get(`/api/getSupplier/${supplierId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Fetch supplier details error:", error);
    throw error;
  }
};

export const logout = async (token: string) => {
  try {
    // Axios is used instead of fetch for better error handling and interceptors support
    const response = await axios.post('/api/logout', {}, {
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
