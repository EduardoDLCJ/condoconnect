import React, { useState, useEffect } from 'react';
import NavbarU from './NavbarU';

const Notificaciones = () => {
    const [notifications, setNotifications] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 3;
    const departamento = localStorage.getItem('departamento');
    const torre = localStorage.getItem('torre');

      useEffect(() => {
        document.title = "Notificaciones";
      }, []);

    useEffect(() => {
        const fetchNotifications = async () => {
            try {
                const response = await fetch(
                    `https://apicondominio-7jd1.onrender.com/notificaciones/${departamento}/${torre}`
                );
                const data = await response.json();

                if (Array.isArray(data)) {
                    setNotifications(data);
                } else {
                    console.error('Formato de datos inesperado:', data);
                }
            } catch (error) {
                console.error('Error al obtener notificaciones:', error);
            }
        };

        fetchNotifications();
        const interval = setInterval(fetchNotifications, 5000);

        return () => clearInterval(interval);
    }, [departamento, torre]);

    const handleDelete = async (id) => {
        try {
            const response = await fetch(`https://apicondominio-7jd1.onrender.com/notificaciones/${id}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                throw new Error('Error al eliminar la notificación');
            }

            setNotifications(notifications.filter((notif) => notif._id !== id));
        } catch (error) {
            console.error('Error al eliminar la notificación:', error);
        }
    };

    // Calcular el número total de páginas
    const totalPages = Math.ceil(notifications.length / itemsPerPage);

    // Obtener las notificaciones de la página actual
    const currentNotifications = notifications.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    return (
        <div className="relative flex items-center justify-center h-screen appf">
            <NavbarU torre={torre} departamento={departamento} />
            <div className="bg-white p-8 rounded-lg shadow-lg mt-20 w-120">
                <h2 className="text-lg font-bold">Notificaciones</h2>
                {currentNotifications.length === 0 ? (
                    <div className="p-2 bg-gray-100 rounded-lg shadow">
                        No hay notificaciones nuevas.
                    </div>
                ) : (
                    <table className="min-w-full bg-white">
                        <thead>
                            <tr>
                                <th className="py-2 px-4 border-b">Motivo</th>
                                <th className="py-2 px-4 border-b">Cantidad</th>
                                <th className="py-2 px-4 border-b">Fecha</th>
                                <th className="py-2 px-4 border-b">Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentNotifications.map((notif) => (
                                <tr key={notif._id}>
                                    <td className="py-2 px-4 border-b">{notif.motivo}</td>
                                    <td className="py-2 px-4 border-b">{notif.cantidad}</td>
                                    <td className="py-2 px-4 border-b">{new Date(notif.createdAt).toLocaleString()}</td>
                                    <td className="py-2 px-4 border-b">
                                        <button
                                            onClick={() => handleDelete(notif._id)}
                                            className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                                        >
                                            Eliminar
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
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

export default Notificaciones;
