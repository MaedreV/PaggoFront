import axios from 'axios';

const API_URL = 'http://localhost:3001/ocr'; // Ajuste para o URL do backend

export const uploadFile = async (file: File, token: string): Promise<void> => {
  const formData = new FormData();
  formData.append('file', file);

  try {
    await axios.post(`${API_URL}/upload`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      },
    });
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Envio do arquivo falhou');
  }
};
