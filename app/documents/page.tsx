"use client";

import React, { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useRouter } from "next/navigation";

const DocumentsPage: React.FC = () => {
  const [documents, setDocuments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { token } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!token) {
      router.push('/login');
      return;
    }

    const fetchDocuments = async () => {
      try {
        const response = await fetch('http://localhost:3001/ocr/documents', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) {
          throw new Error('Erro no fetch');
        }
        const data = await response.json();
        setDocuments(data);
        setLoading(false);
      } catch (err) {
        setError('Erro ao carregar documentos.' + err);
        setLoading(false);
      }
    };

    fetchDocuments();
  }, [token, router]);

  if (loading) return <p className="text-center mt-8">Carregando documentos...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="max-w-4xl mx-auto my-8 p-4 bg-white shadow rounded">
      <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">Seus Documentos</h1>
      {documents.length === 0 ? (
        <p className="text-center text-gray-500">Nenhum documento encontrado.</p>
      ) : (
        <ul className="space-y-4">
          {documents.map((doc) => (
            <li key={doc.id} className="p-4 border border-gray-200 rounded">
              <p className="text-gray-700">{doc.content}</p>
              <small className="text-gray-500">
                Criado em: {new Date(doc.createdAt).toLocaleString()}
              </small>
            </li>
          ))}
        </ul>
      )}
      <div className="mt-6 text-center">
        <button
          onClick={() => router.push('/upload')}
          className="px-6 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
        >
          Voltar ao Upload
        </button>
      </div>
    </div>
  );
};

export default DocumentsPage;
