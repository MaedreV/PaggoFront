import axios from 'axios';

const API_URL = 'http://localhost:3001/auth'; // Ajuste para o URL do backend

interface LoginResponse {
  token: string;
  user: string;
}

export const login = async (email: string, password: string): Promise<LoginResponse> => {
  try {
    const response = await axios.post(`${API_URL}/login`, { email, password });
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Login falhou');
  }
};

export const register = async (email: string, password: string): Promise<void> => {
  try {
    await axios.post(`${API_URL}/register`, { email, password });
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Registro falhou');
  }
};
