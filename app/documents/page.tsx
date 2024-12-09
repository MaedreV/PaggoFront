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
        setError('Erro no fetch');
        setLoading(false);
      }
    };

    fetchDocuments();
  }, [token, router]);

  if (loading) return <p>Carregando documentos...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1>Seus documentos</h1>
      {documents.length === 0 ? (
        <p>Nenhum documento encontrado.</p>
      ) : (
        <ul>
          {documents.map((doc) => (
            <li key={doc.id}>
              <p>{doc.content}</p>
              <small>Criado em: {new Date(doc.createdAt).toLocaleString()}</small>
            </li>
          ))}
        </ul>
      )}
      <button onClick={() => router.push('/upload')}>Voltar ao upload</button>
    </div>
  );
};

export default DocumentsPage;
