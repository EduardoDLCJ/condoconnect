import React, { useState, useEffect } from 'react';
import { use } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';

const Recuperar = () => {
    const [searchParams] = useSearchParams();
    const token = searchParams.get('token');

    const [correo, setCorreo] = useState('');
    const [nuevaContrasena, setNuevaContrasena] = useState('');
    const [confirmarContrasena, setConfirmarContrasena] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();


    useEffect(() => {
        const timeout = setTimeout(() => {
            navigate('/');
        }, 30000);

        return () => clearTimeout(timeout);
    } , [navigate]);

    const handleInputChange = (e) => {
        setCorreo(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setNuevaContrasena(e.target.value);
    };

    const handleConfirmPasswordChange = (e) => {
        setConfirmarContrasena(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:4000/verificar', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ correo }),
            });

            if (!response.ok) {
                throw new Error('Error sending verification');
            }

            const data = await response.json();
            console.log('Verification sent:', data);
        } catch (error) {
            console.error('Error sending verification:', error);
        }
    };

    const handleResetPassword = async (e) => {
        e.preventDefault();
        if (nuevaContrasena !== confirmarContrasena) {
            setError('Las contraseñas no coinciden');
            return;
        }
        try {
            const response = await fetch('http://localhost:4000/verificar/reset-password', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ token, nuevaContrasena }),
            });

            if (!response.ok) {
                throw new Error('Error resetting password');
            }

            console.log('Password reset successfully');
            navigate('/');
        } catch (error) {
            console.error('Error resetting password:', error);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen fondo">
            <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
                {/* Botón de volver */}
                <button
                    onClick={() => navigate('/')}
                    className="flex items-center text-gray-600 hover:text-gray-800 focus:outline-none mb-4"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-5 h-5 mr-2"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 19l-7-7 7-7"
                        />
                    </svg>
                    Volver
                </button>

                {token ? (
                    <>
                        <h2 className="text-2xl font-bold text-center text-gray-800">Restablecer Contraseña</h2>
                        <form onSubmit={handleResetPassword} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Nueva Contraseña</label>
                                <input
                                    type="password"
                                    value={nuevaContrasena}
                                    onChange={handlePasswordChange}
                                    required
                                    className="w-full px-4 py-2 mt-1 text-gray-700 bg-gray-100 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Confirmar Contraseña</label>
                                <input
                                    type="password"
                                    value={confirmarContrasena}
                                    onChange={handleConfirmPasswordChange}
                                    required
                                    className="w-full px-4 py-2 mt-1 text-gray-700 bg-gray-100 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                                />
                            </div>
                            {error && <p className="text-red-500 text-sm">{error}</p>}
                            <button
                                type="submit"
                                className="w-full px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
                            >
                                Restablecer Contraseña
                            </button>
                        </form>
                    </>
                ) : (
                    <>
                        <h2 className="text-2xl font-bold text-center text-gray-800">Recuperar Contraseña</h2>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Correo Electrónico</label>
                                <input
                                    type="email"
                                    value={correo}
                                    onChange={handleInputChange}
                                    required
                                    className="w-full px-4 py-2 mt-1 text-gray-700 bg-gray-100 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                                />
                            </div>
                            <button
                                type="submit"
                                className="w-full px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
                            >
                                Enviar Verificación
                            </button>
                        </form>
                    </>
                )}
            </div>
        </div>
    );
};

export default Recuperar;