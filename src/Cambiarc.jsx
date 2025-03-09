import React, { useState } from 'react';

const Cambiarc = () => {
    const [password, setPassword] = useState('');

    const handleChange = (e) => {
        setPassword(e.target.value);
    };

    const handleSubmit = async () => {
        try {
            const response = await fetch('https://your-endpoint-url.com/change-password', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ password }),
            });

            if (response.ok) {
                alert('Password changed successfully');
            } else {
                alert('Failed to change password');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred');
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen fondo">
            <div className="bg-white p-6 rounded shadow-md w-full max-w-sm">
                <h2 className="text-2xl font-bold mb-4">Crear contraseña nueva</h2>
                <input
                    type="password"
                    value={password}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded mb-4"
                    placeholder="Ingresar contraseña nueva"
                />
                <button
                    onClick={handleSubmit}
                    className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
                >
                    Aceptar
                </button>
            </div>
        </div>
    );
};

export default Cambiarc;