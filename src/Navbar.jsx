import React from 'react';

const Navbar = () => {
  return (
    <nav className="bg-gray-200 p-4 fixed top-4 left-1/2 transform -translate-x-1/2 w-11/12 max-w-6xl z-10 rounded-2xl shadow-md">
      <div className="flex justify-between items-center">
        <div className="navbar-logo text-white text-lg font-bold"></div>
        <ul className="flex space-x-4">
          <li>
            <a href="/Inicio" className="text-cyan-700 hover:text-cyan-950" style={{ fontSize: '1.4rem' }}>
              Inicio
            </a>
          </li>
          <li>
            <a href="/Usuarios" className="text-cyan-700 hover:text-cyan-950" style={{ fontSize: '1.4rem' }}>
              Gestión de usuarios
            </a>
          </li>
          <li>
            <a href="/Multas" className="text-cyan-700 hover:text-cyan-950" style={{ fontSize: '1.4rem' }}>
              Multas
            </a>
          </li>
          <li>
            <a href="/" className="text-cyan-700 hover:text-cyan-950" style={{ fontSize: '1.4rem' }}>
              Login
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
