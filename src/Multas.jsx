import React, { useState, useEffect, useRef } from "react";
import Navbar from "./Navbar";
import { CSSTransition } from "react-transition-group";
import './Modal.css';

const Multas = () => {
  const nodeRef = useRef(null);
  const [formData, setFormData] = useState({
    motivo: "",
    departamento: "",
    torre: "",
    monto: "",
  });
  const [multas, setMultas] = useState([]);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;
  const [isLoading, setIsLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  useEffect(() => {
    fetch("https://apicondominio-7jd1.onrender.com/multas/getmultas")
      .then((response) => response.json())
      .then((data) => setMultas(data))
      .catch((err) => console.error("Error al obtener las multas:", err));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { motivo, departamento, torre, monto } = formData;

    if (!motivo || !departamento || !torre || !monto) {
      setError("Todos los campos son obligatorios");
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch("https://apicondominio-7jd1.onrender.com/multas", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          motivo,
          departamento,
          torre,
          cantidad: parseFloat(monto),
        }),
      });

      if (!response.ok) {
        throw new Error("Error al registrar la multa");
      }
      setModalMessage("Multa registrada con éxito");
      const result = await response.json();
      setMultas([...multas, result.multa]);
      setFormData({ motivo: "", departamento: "", torre: "", monto: "" });
      setError(null);
    } catch (err) {
      console.error(err);
      setError("Error al registrar la multa");
      setModalMessage("Error al registrar la multa");
    } finally { 
      setIsLoading(false);
      setModalVisible(true);
    }
  };

  // Calcular el número total de páginas
  const totalPages = Math.ceil(multas.length / itemsPerPage);

  // Obtener los elementos de la página actual
  const currentItems = multas.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="flex flex-col md:flex-row space-y-8 md:space-y-0 md:space-x-8 p-6 mb-10 appf">
      <Navbar />

      {/* Formulario */}
      <div className="md:w-1/3 bg-white p-6 shadow-2xs rounded-4xl" style={{marginTop: "40px"}}>
        <h1 className="text-2xl font-bold mb-4 text-gray-700">Registrar Multa</h1>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="motivo">
              Motivo
            </label>
            <input
              type="text"
              id="motivo"
              name="motivo"
              value={formData.motivo}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded focus:ring focus:ring-blue-200"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="departamento">
              Departamento
            </label>
            <input
              type="text"
              id="departamento"
              name="departamento"
              value={formData.departamento}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded focus:ring focus:ring-blue-200"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="torre">
              Torre
            </label>
            <input
              type="text"
              id="torre"
              name="torre"
              value={formData.torre}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded focus:ring focus:ring-blue-200"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="monto">
              Monto
            </label>
            <input
              type="number"
              id="monto"
              name="monto"
              value={formData.monto}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded focus:ring focus:ring-blue-200"
            />
          </div>

           <div className="flex justify-center items-center">
            <CSSTransition
              in={isLoading}
              timeout={300}
              classNames="fade"
              unmountOnExit
              nodeRef={nodeRef}
            >
              <div ref={nodeRef} className="w-6 h-6 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            </CSSTransition>

            {!isLoading && (
              <button
                type="submit"
                className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300"
              >
                Registrar
              </button>
            )}
          </div>
        </form>
        {modalVisible && <div className="modal-background" onClick={() => setModalVisible(false)} />}
<CSSTransition
  in={modalVisible}
  timeout={300}
  classNames="modal"
  unmountOnExit
  onExited={() => setModalVisible(false)}
> 
  <div className="modal">
    <div className="modal-content">
      <p>{modalMessage}</p>
      <button onClick={() => setModalVisible(false)} className="btn">Cerrar</button>
    </div>
  </div>
</CSSTransition>

      </div>

      {/* Tabla */}
      <div className="md:w-2/2 bg-white p-6 shadow-md rounded-4xl" style={{marginTop: "50px"}}>
        <h1 className="text-2xl font-bold mb-4 text-gray-700">Multas Registradas</h1>
        <table className="w-full border border-gray-300 text-sm text-gray-700">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="border px-4 py-2">Motivo</th>
              <th className="border px-4 py-2">Departamento</th>
              <th className="border px-4 py-2">Torre</th>
              <th className="border px-4 py-2">Monto</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((multa, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="border px-4 py-2">{multa.motivo}</td>
                <td className="border px-4 py-2">{multa.departamento}</td>
                <td className="border px-4 py-2">{multa.torre}</td>
                <td className="border px-4 py-2">${multa.cantidad}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex justify-center mt-4">
        <nav className="inline-flex">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-3 py-1 mx-1 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
          >
            Anterior
          </button>
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index}
              onClick={() => handlePageChange(index + 1)}
              className={`px-3 py-1 mx-1 rounded ${
                currentPage === index + 1 ? 'bg-blue-500 text-white' : 'bg-gray-200 hover:bg-gray-300'
              }`}
            >
              {index + 1}
            </button>
          ))}
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-3 py-1 mx-1 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
          >
            Siguiente
          </button>
        </nav>
      </div>
      </div>
    </div>
  );
};

export default Multas;