import React, { useState, useEffect } from "react";
import NavbarU from "./NavbarU";

const VerMultas = () => {
  const [multas, setMultas] = useState([]);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 7;

  const torre = localStorage.getItem("torre");
  const departamento = localStorage.getItem("departamento");

  useEffect(() => {
    if (torre && departamento) {
      // Enviar torre y departamento como parámetros de consulta
      fetch(`https://apicondominio-7jd1.onrender.com/multas/m/${torre}/${departamento}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Error al obtener las multas");
          }
          return response.json();
        })
        .then((data) => setMultas(data))
        .catch((err) => {
          console.error(err);
          setError("Error al obtener las multas");
        });
    }
  }, [torre, departamento]);

  const totalPages = Math.ceil(multas.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentMultas = multas.slice(startIndex, endIndex);

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  return (
    <div className="flex items-center justify-center space-x-8 p-4 appf">
      <NavbarU torre={torre} departamento={departamento} />
      {/* Tabla */}
      <div className="w-1/2 bg-white p-6 shadow-md rounded-4xl">
        <h1 className="text-xl font-bold mb-4">Multas Registradas</h1>
        {error && <p className="text-red-500">{error}</p>}
        <div className="overflow-x-auto">
          <table className="w-full border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th className="border px-4 py-2">Motivo</th>
                <th className="border px-4 py-2">Departamento</th>
                <th className="border px-4 py-2">Torre</th>
                <th className="border px-4 py-2">Monto</th>
              </tr>
            </thead>
            <tbody>
              {currentMultas.map((multa, index) => (
                <tr key={index}>
                  <td className="border px-4 py-2">{multa.motivo}</td>
                  <td className="border px-4 py-2">{multa.departamento}</td>
                  <td className="border px-4 py-2">{multa.torre}</td>
                  <td className="border px-4 py-2">${multa.cantidad}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Paginador */}
        <div className="flex justify-between items-center mt-4">
          <button
            onClick={handlePrevPage}
            disabled={currentPage === 1}
            className={`px-4 py-2 rounded ${
              currentPage === 1
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-blue-500 text-white hover:bg-blue-600"
            }`}
          >
            Anterior
          </button>
          <span className="text-gray-700">
            Página {currentPage} de {totalPages}
          </span>
          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            className={`px-4 py-2 rounded ${
              currentPage === totalPages
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-blue-500 text-white hover:bg-blue-600"
            }`}
          >
            Siguiente
          </button>
        </div>
      </div>
    </div>
  );
};

export default VerMultas;
