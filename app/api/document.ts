import axios from 'axios';

const API_URL = 'http://localhost:3001/ocr'; 

export const getDocuments = async (token: string): Promise<any[]> => {
  try {
    const response = await axios.get(`${API_URL}/documents`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data.documents; // Retorna a lista de documentos
  } catch (error: any) {
    console.error('Erro ao buscar documentos:', error.response?.data || error.message);
    throw new Error(error.response?.data?.message || 'Falha ao buscar documentos');
  }
};
