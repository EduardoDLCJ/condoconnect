import React, { useState } from 'react';
import FMultas from './Funciones/FMultas';

import NavbarU from './NavbarU';

const InicioU = () => {
  const departamento = localStorage.getItem('departamento');
  const torre = localStorage.getItem('torre');
  const usuario = localStorage.getItem('userName');	
  const userid = localStorage.getItem('userId');

  return (
    <div className="relative flex items-center justify-center h-screen appf">

      <NavbarU torre={torre} departamento={departamento} />
      <div className="bg-white p-8 rounded-lg shadow-lg mt-20">
        <h1 className="text-2xl font-bold mb-4">Departamento: {departamento}</h1>
        <h1 className="text-2xl font-bold mb-4">Torre número: {torre}</h1>
        <h1 className="text-2xl font-bold mb-4">
          ¡Bienvenido a CondoConnect {usuario}!
        </h1>
        <p className="text-gray-700">
          Estamos encantados de tenerte aquí. Explora y disfruta de todas las
          funcionalidades que ofrecemos.
        </p>
      </div>

      {/* Notificaciones emergentes */}
  
    </div>
  );
};

export default InicioU;
