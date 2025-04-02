import React, { useState } from 'react';

const Cambiarc = () => {
    const [password, setPassword] = useState('');

    const handleChange = (e) => {
        setPassword(e.target.value);
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

            </div>
        </div>
    );
};

export default Cambiarc;
