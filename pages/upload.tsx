import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { uploadFile } from './api/upload'; // Função já criada

const UploadPage: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { token } = useAuth();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file || !token) {
      setError('Arquivo ou token faltando.');
      return;
    }
    try {
      setLoading(true);
      await uploadFile(file, token);
      setLoading(false);
      alert('Arquivo upado com sucesso!');
    } catch (err) {
      setLoading(false);
      setError('Erro no envio do arquivo.');
    }
  };

  return (
    <div>
      <h1>Upload Document</h1>
      <form onSubmit={handleSubmit}>
        <input type="file" onChange={handleFileChange} required />
        <button type="submit" disabled={loading}>
          {loading ? 'Enviando...' : 'Enviado'}
        </button>
      </form>
      {error && <p>{error}</p>}
    </div>
  );
};

export default UploadPage;
