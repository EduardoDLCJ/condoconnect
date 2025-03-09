import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import { useNavigate } from 'react-router-dom';

const Usuarios = () => {
    const [formData, setFormData] = useState({
        nombre: '',
        apellido: '',
        telefono: '',
        departamento: '',
        torre: '',
        tipoUsuario: 'Administrador',
        contrasena: ''
    });
    const navigate = useNavigate();
    const [usuarios, setUsuarios] = useState([]);
    const [showForm, setShowForm] = useState(false); // Controla si el modal está visible
    const [currentPage, setCurrentPage] = useState(1); // Página actual
    const itemsPerPage = 5; // Número de elementos por página
    const token = localStorage.getItem('authToken');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('https://apicondominio-7jd1.onrender.com/registro', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });
            const data = await response.json();
            setUsuarios([...usuarios, data]);
            setFormData({
                nombre: '',
                apellido: '',
                telefono: '',
                departamento: '',
                torre: '',
                tipoUsuario: 'Administrador',
                contrasena: ''
            });
            setShowForm(false); 
            
        } catch (error) {
            console.error('Error:', error);
        }
    };

    useEffect(() => {
        const fetchUsuarios = async () => {
            try {
                //const token = localStorage.getItem('authToken'); // O como almacenes el token
                const response = await fetch('https://apicondominio-7jd1.onrender.com/users', {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                });

                if (response.estatus === 401){
                    localStorage.removeItem('authToken');
                    navigate('/');
                    return;
                }
                if (!response.ok) {
                    throw new Error('Error al obtener usuarios');
                }
    
                const data = await response.json();
                setUsuarios(data);
                console.log(data);
            } catch (error) {
                console.error('Error:', error);
            }
        };
        fetchUsuarios();
    }, []);
    

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentUsuarios = usuarios.slice(indexOfFirstItem, indexOfLastItem);

    // Cambiar página
    const handleNextPage = () => {
        if (currentPage < Math.ceil(usuarios.length / itemsPerPage)) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    return (
        <div className="min-h-screen flex flex-col appf">
            <Navbar />
            <div className="flex flex-col items-center bg-white p-8 rounded-4xl shadow-lg w-auto" style={{ margin: '50px', marginTop: '190px' }}>
                <div className="bg-white p-6 rounded-2xl shadow-lg w-full max-w-5xl">
                    <button
                        className="bg-blue-600 text-white px-6 py-2 rounded shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-6"
                        onClick={() => setShowForm(true)}
                    >
                        Registrar Usuario
                    </button>

                    {/* Modal */}
                    {showForm && (
                        <div className="fixed inset-0 flex items-center justify-center z-50" style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
                            <div className="bg-white shadow-xl rounded-lg p-6 w-full max-w-md">
                                <h2 className="text-xl font-semibold mb-4 text-center text-blue-600">Registrar Usuario</h2>
                                <form className="space-y-4" onSubmit={handleSubmit}>
                                    <div>
                                        <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="nombre">
                                            Nombre
                                        </label>
                                        <input
                                            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            id="nombre"
                                            type="text"
                                            name="nombre"
                                            value={formData.nombre}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="apellido">
                                            Apellido
                                        </label>
                                        <input
                                            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            id="apellido"
                                            type="text"
                                            name="apellido"
                                            value={formData.apellido}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="telefono">
                                            Teléfono
                                        </label>
                                        <input
                                            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            id="telefono"
                                            type="text"
                                            name="telefono"
                                            value={formData.telefono}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                    <div className="flex space-x-4">
    <div className="flex-grow">
        <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="departamento">
            Departamento
        </label>
        <input
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            id="departamento"
            type="number"
            name="departamento"
            value={formData.departamento}
            onChange={handleChange}
        />
    </div>
    <div className="flex-grow">
        <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="torre">
            Torre
        </label>
        <input
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            id="torre"
            type="number"
            name="torre"
            value={formData.torre}
            onChange={handleChange}
        />
    </div>
</div>

                                    <div>
                                        <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="tipoUsuario">
                                            Tipo de Usuario
                                        </label>
                                        <select
                                            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            id="tipoUsuario"
                                            name="tipoUsuario"
                                            value={formData.tipoUsuario}
                                            onChange={handleChange}
                                            required
                                        >
                                            <option value="Administrador">Administrador</option>
                                            <option value="Administración">Administración</option>
                                            <option value="Dueno">Dueño</option>
                                            <option value="Inquilino">Inquilino</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="contrasena">
                                            Contraseña
                                        </label>
                                        <input
                                            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            id="contrasena"
                                            type="password"
                                            name="contrasena"
                                            value={formData.contrasena}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                    <div className="flex justify-end space-x-4">
                                        <button
                                            className="bg-gray-400 text-white px-4 py-2 rounded-lg hover:bg-gray-500"
                                            onClick={() => setShowForm(false)}
                                            type="button"
                                        >
                                            Cancelar
                                        </button>
                                        <button
                                            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                                            type="submit"
                                        >
                                            Registrar
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    )}

                    {/* Tabla de usuarios */}
                    <table className="min-w-full bg-white shadow-lg rounded-lg">
                        <thead className="bg-gray-100 border-b">
                            <tr>
                                <th className="py-4 px-6 text-left text-gray-700 font-semibold">Nombre</th>
                                <th className="py-4 px-6 text-left text-gray-700 font-semibold">Apellido</th>
                                <th className="py-4 px-6 text-left text-gray-700 font-semibold">Teléfono</th>
                                <th className="py-4 px-6 text-left text-gray-700 font-semibold">Departamento</th>
                                <th className="py-4 px-6 text-left text-gray-700 font-semibold">Torre</th>
                                <th className="py-4 px-6 text-left text-gray-700 font-semibold">Tipo de Usuario</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentUsuarios.map((usuario, index) => (
                                <tr key={index} className="border-b hover:bg-gray-50">
                                    <td className="py-4 px-6">{usuario.nombre}</td>
                                    <td className="py-4 px-6">{usuario.apellido}</td>
                                    <td className="py-4 px-6">{usuario.telefono}</td>
                                    <td className="py-4 px-6">{usuario.departamento}</td>
                                    <td className="py-4 px-6">{usuario.torre}</td>
                                    <td className="py-4 px-6">{usuario.tipoUsuario}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {/* Paginación */}
                    <div className="flex justify-between items-center mt-4">
                        <button
                            className={`px-4 py-2 rounded-lg ${currentPage === 1 ? 'bg-gray-300' : 'bg-blue-600 text-white hover:bg-blue-700'}`}
                            onClick={handlePrevPage}
                            disabled={currentPage === 1}
                        >
                            Anterior
                        </button>
                        <span className="text-gray-700">Página {currentPage} de {Math.ceil(usuarios.length / itemsPerPage)}</span>
                        <button
                            className={`px-4 py-2 rounded-lg ${currentPage === Math.ceil(usuarios.length / itemsPerPage) ? 'bg-gray-300' : 'bg-blue-600 text-white hover:bg-blue-700'}`}
                            onClick={handleNextPage}
                            disabled={currentPage === Math.ceil(usuarios.length / itemsPerPage)}
                        >
                            Siguiente
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Usuarios;
