import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Lottie from 'lottie-react';
import loadingAnimation from './assets/Animation - 1738769995911.json'; // Asegúrate de descargar un archivo JSON de Lottie y guardarlo en tu proyecto

const Login = ({ onLogin }) => {
  const [telefono, setTelefono] = useState('');
  const [password, setPassword] = useState('');
  const [showWarning, setShowWarning] = useState(false);
  const [loginError, setLoginError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Inicio de sesión";
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!telefono || !password) {
      setShowWarning(true);
      setLoginError('');
      return;
    }

    setShowWarning(false);
    setLoginError('');
    setIsLoading(true);

    try {
      const response = await fetch('https://apicondominio-7jd1.onrender.com/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ telefono, contrasena: password }),
      });

      const data = await response.json();

      if (response.ok) {
        console.log('Inicio de sesión exitoso:', data);
        const { tipoUsuario, departamento, torre } = data.user;

        if (tipoUsuario) {
          localStorage.setItem('departamento', departamento);
          localStorage.setItem('torre', torre);
          localStorage.setItem('userRole', tipoUsuario);

          switch (tipoUsuario) {
            case 'Administrador':
              navigate('/Inicio');
              break;
            case 'Dueno':
              navigate('/InicioU');
              break;
            default:
              alert('No tienes permisos para acceder a esta página');
          }
        } else {
          setLoginError('El campo tipoUsuario no está presente en la respuesta del servidor');
        }
      } else {
        setLoginError('Tu nombre de usuario o contraseña son incorrectos');
      }
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      setLoginError('Hubo un problema con el servidor, por favor intenta más tarde');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen fondo">
      <div className="flex flex-col items-center">
        <div className="logo flex items-center mb-4"></div>
        <div className="w-full max-w-md p-8 space-y-4 bg-neutral-50 rounded-4xl shadow-md">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-800">Inicio de Sesión</h1>
          </div>

          {loginError && (
            <div className="p-4 text-sm text-red-700 bg-red-100 border border-red-400 rounded-md">
              {loginError}
            </div>
          )}

          {showWarning && (
            <div className="p-4 text-sm text-yellow-700 bg-yellow-100 border border-yellow-400 rounded-md">
              Por favor, completa todos los campos.
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <input
                type="text"
                placeholder="Teléfono"
                className="w-full px-4 py-2 text-gray-700 bg-gray-100 border rounded-4xl focus:outline-none focus:ring-2 focus:ring-blue-400"
                value={telefono}
                onChange={(e) => setTelefono(e.target.value)}
              />
            </div>

            <div>
              <input
                type="password"
                placeholder="Contraseña"
                className="w-full px-4 py-2 text-gray-700 bg-gray-100 border rounded-4xl focus:outline-none focus:ring-2 focus:ring-blue-400"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="flex justify-center items-center h-12">
              {isLoading ? (
                <Lottie animationData={loadingAnimation} className="w-16 h-16" />
              ) : (
                <button
                  type="submit"
                  className="w-full flex justify-center items-center px-4 py-2 font-bold text-white bg-blue-500 rounded-4xl hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  disabled={isLoading}
                >
                  Iniciar sesión
                </button>
              )}
            </div>
          </form>

          <div className="flex justify-center pt-5 space-x-2">
            <h1 className="text-sm text-gray-700">¿No tienes una cuenta?</h1>
            <button
              onClick={() => navigate('/Registro')}
              className="text-blue-500 hover:underline focus:outline-none"
            >
              Registrarse
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
