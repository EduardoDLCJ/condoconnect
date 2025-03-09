import React from 'react';
import Navbar from './Navbar';

const Inicio = () => {
    return (
        <div className="flex flex-col h-screen">
            <Navbar />
            <div className="flex flex-1 items-center justify-center appf">
                <div className="flex flex-row items-center bg-white p-8 rounded-4xl shadow-lg w-full max-w-3x4" style={{ margin: '50px' }}>
                    {/* Texto a la izquierda */}
                    <div className="flex-1">
                        <h1 className="text-7xl font-bold mb-4">¡Bienvenido a CondoConnect!</h1>
                        <p className="text-gray-700 text-4xl">
                            Estamos encantados de tenerte aquí. Explora y disfruta de todas las funcionalidades que ofrecemos.
                        </p>
                    </div>

                    {/* Imagen a la derecha */}
                    <div className="flex-1 flex justify-end ">
                        <div className="img"></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Inicio;
