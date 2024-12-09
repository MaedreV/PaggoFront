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
      setError('Erro no envio do arquivo' + err);
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
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-3xl font-semibold text-center mb-4">Upload de documentos</h1>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <input 
          type="file" 
          onChange={handleFileChange} 
          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        <button 
          type="submit" 
          disabled={loading}
          className="w-full py-3 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 disabled:bg-blue-300"
        >
          {loading ? 'Enviando...' : 'Enviar'}
        </button>
      </form>

      {extractedText && (
        <div className="mt-6">
          <h2 className="text-2xl font-semibold">Texto Extraído</h2>
          <p className="mt-2 text-sm text-gray-700">{extractedText}</p>
          <button 
            onClick={handleDownloadPDF} 
            className="mt-4 px-6 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
          >
            Baixar como PDF
          </button>
        </div>
      )}

      <button 
        onClick={navigateToDocuments} 
        className="mt-6 w-full py-3 bg-gray-300 text-gray-800 font-semibold rounded-md hover:bg-gray-400"
      >
        Ver todos os documentos
      </button>

      {error && <p className="mt-4 text-red-500 text-center">{error}</p>}
    </div>
  );
};

export default UploadPage;
