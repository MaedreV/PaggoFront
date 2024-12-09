import axios from 'axios';

const API_URL = 'http://localhost:3001/ocr'; 

export const uploadFile = async (file: File, token: string): Promise<any> => {
  const formData = new FormData();
  formData.append('file', file);

 try {
  const response = await axios.post(`${API_URL}/upload`, formData, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;

} catch (error: any) {
  console.error('Envio do arquivo falhou:', error.response?.data || error.message);
  throw new Error(error.response?.data?.message || 'Envio do arquivo falhou');
}
};
