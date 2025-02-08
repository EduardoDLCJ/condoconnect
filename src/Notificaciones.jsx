import React, { useState, useEffect } from 'react';
import NavbarU from './NavbarU';

const Notificaciones = () => {
    const [notifications, setNotifications] = useState([]);
    const departamento = localStorage.getItem('departamento');
    const torre = localStorage.getItem('torre');

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

    return (
        <div className="relative flex items-center justify-center h-screen appf">
            <NavbarU torre={torre} departamento={departamento} />
            <div className="bg-white p-8 rounded-lg shadow-lg mt-20 w-96">
                <h2 className="text-lg font-bold">Notificaciones</h2>
                <ul className="mt-4 space-y-3">
                    {notifications.length === 0 ? (
                        <li className="p-2 bg-gray-100 rounded-lg shadow">
                            No hay notificaciones nuevas.
                        </li>
                    ) : (
                        notifications.map((notif) => (
                            <li key={notif._id} className="p-4 bg-gray-100 rounded-lg shadow">
                                <p><strong>Motivo:</strong> {notif.motivo}</p>
                                <p><strong>Cantidad:</strong> {notif.cantidad}</p>
                                <p><strong>Fecha:</strong> {new Date(notif.createdAt).toLocaleString()}</p>
                            </li>
                        ))
                    )}
                </ul>
            </div>
        </div>
    );
};

export default Notificaciones;
