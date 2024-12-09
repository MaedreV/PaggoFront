"use client";


import { useRouter } from "next/navigation"; 

export default function Home() {
  const router = useRouter();

  const handleLogin = () => {
    router.push("/login");
  };

  const handleRegister = () => {
    router.push("/register"); 
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8 bg-gray-100">
      <h1 className="text-4xl font-bold mb-8">Bem-vindo!</h1>
      <p className="text-lg text-gray-700 mb-8 text-center">
        Faça login ou registre-se para acessar sua conta.
      </p>
      <div className="flex gap-4">
        <button
          className="px-6 py-3 text-white bg-blue-500 rounded-md hover:bg-blue-600 transition"
          onClick={handleLogin}
        >
          Logar
        </button>
        <button
          className="px-6 py-3 text-white bg-green-500 rounded-md hover:bg-green-600 transition"
          onClick={handleRegister}
        >
          Registrar
        </button>
      </div>
    </div>
  );
}
