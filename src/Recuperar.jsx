import React, { useState } from 'react';

const Recuperar = () => {
    const [numero, setPhoneNumber] = useState('');

    const handleInputChange = (e) => {
        setPhoneNumber(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const numeroConPrefijo = `+52${numero}`;
        try {
            const response = await fetch('https://apicondominio-7jd1.onrender.com/verificar', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ numero: numeroConPrefijo }),
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

    return (
        <div className="flex items-center justify-center min-h-screen fondo">
            <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
                <h2 className="text-2xl font-bold text-center text-gray-800">Recuperar Contraseña</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Número de Teléfono</label>
                        <input
                            type="tel"
                            value={numero}
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
            </div>
        </div>
    );
};

export default Recuperar;