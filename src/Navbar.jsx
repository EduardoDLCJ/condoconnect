import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(true);

  useEffect(() => {
    const verifyToken = async () => {
      const token = localStorage.getItem('authToken');
      if (!token) {
        handleLogout();
        return;
      }

      try {
        const response = await fetch('https://apicondominio-7jd1.onrender.com/login/verificar-token', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });
        
        const data = await response.json();

        if (!response.ok || !data.valido) {
          handleLogout();
        }
      } catch (error) {
        console.error('Error verificando token:', error);
        handleLogout();
      }
    };

    const interval = setInterval(verifyToken, 10000); // Verificar cada 60 segundos
    verifyToken(); // Verificar inmediatamente al cargar

    return () => clearInterval(interval);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('departamento');
    localStorage.removeItem('torre');
    localStorage.removeItem('userRole');
    setIsAuthenticated(false);
    navigate('/');
  };

  return (
    isAuthenticated && (
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
              <button
                onClick={handleLogout}
                className="text-cyan-700 hover:text-cyan-950"
                style={{ fontSize: '1.4rem' }}
              >
                Cerrar sesión
              </button>
            </li>
          </ul>
        </div>
      </nav>
    )
  );
};

export default Navbar;
