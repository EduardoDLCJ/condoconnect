import { useState } from "react";
import Navbar from './Navbar';


export default function BackupDB() {
  const [loading, setLoading] = useState(false);

  const handleBackup = async () => {
    setLoading(true);
    try {
      const response = await fetch("http://localhost:4000/backup");
      if (!response.ok) throw new Error("Error al generar el respaldo");

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "backup.json";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
        <Navbar />
      <div className="appf p-6 rounded-lg shadow-xl text-center">
        <h1 className="text-2xl font-bold mb-4">Respaldo de Base de Datos</h1>
        <p className="text-gray-600 mb-4">Haz clic en el botón para generar un respaldo.</p>
        <button
          onClick={handleBackup}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition disabled:opacity-50"
          disabled={loading}
        >
          {loading ? "Generando respaldo..." : "Generar Respaldo"}
        </button>
      </div>
    </div>
  );
}