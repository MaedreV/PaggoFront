"use client";


import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { uploadFile } from '../api/upload'; 
import jsPDF from 'jspdf'; 
import { useRouter } from "next/navigation"; 

const UploadPage: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [extractedText, setExtractedText] = useState<string | null>(null);
  const { token } = useAuth();
  const router = useRouter();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file || !token) {
      setError('Token em falta ou invalido.');
      return;
    }
    try {
      setLoading(true);
      const response = await uploadFile(file, token);
      setExtractedText(response.text); 
      setLoading(false);
    } catch (err) {
      setLoading(false);
      setError('Erro no envio do arquivo');
    }
  };

  const handleDownloadPDF = () => {
    if (!extractedText) return;

    const doc = new jsPDF();
    doc.text(extractedText, 10, 10); 
    doc.save('texto-extraido.pdf'); 
  };

  const navigateToDocuments = () => {
    router.push('/documents'); 
  };

  return (
    <div>
      <h1>Upload de documentos</h1>
      <form onSubmit={handleSubmit}>
        <input type="file" onChange={handleFileChange} required />
        <button type="submit" disabled={loading}>
          {loading ? 'Enviando' : 'Enviar'}
        </button>
      </form>

      {extractedText && (
        <div>
          <h2>Texto Extraido</h2>
          <p>{extractedText}</p>
          <button onClick={handleDownloadPDF}>Download como PDF</button>
        </div>
      )}

      <button onClick={navigateToDocuments} style={{ marginTop: '20px' }}>
        Ver todos documentos
      </button>

      {error && <p>{error}</p>}
    </div>
  );
};

export default UploadPage;
