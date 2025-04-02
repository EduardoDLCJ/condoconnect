import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Lottie from 'lottie-react';
import {jwtDecode} from 'jwt-decode';
import loadingAnimation from './assets/Animation - 1738769995911.json';

const Login = ({ onLogin }) => {
      const [formData, setFormData] = useState({
          nombre: '',
          apellido: '',
          correo: '',
          telefono: '',
          departamento: '',
          torre: '',
          tipoUsuario: 'Dueno',
          contrasena: ''
      });
  const [telefono, setTelefono] = useState('');
  const [password, setPassword] = useState('');
  const [showWarning, setShowWarning] = useState(false);
  const [loginError, setLoginError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
      const [showForm, setShowForm] = useState(false); // Controla si el modal está visible

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
        ...formData,
        [name]: value
    });
};


  useEffect(() => {
    document.title = "Inicio de sesión";
    verificarToken();
  }, []);

  const verificarToken = async () => {
    const token = localStorage.getItem('authToken');
    if (!token) return;

    try {
      const decodedToken = jwtDecode(token);
      const { tipoUsuario } = decodedToken;
      redirigirUsuario(tipoUsuario);
    } catch (error) {
      console.error('Error verificando token:', error);
    }
  };

  const redirigirUsuario = (tipoUsuario) => {
    switch (tipoUsuario) {
      case 'Administrador':
        navigate('/Inicio');
        break;
      case 'Dueno':
        navigate('/InicioU');
        break;
      default:
        localStorage.removeItem('authToken');
    }
  };

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
        body: JSON.stringify({ telefono, contrasena: password, recordar: rememberMe }),
      });

      const data = await response.json();

      if (response.ok) {
        const { token, user } = data;
        if (user && token) {
          localStorage.setItem('departamento', user.departamento);
          localStorage.setItem('torre', user.torre);
          localStorage.setItem('authToken', token);
          localStorage.setItem('userId', user._id);
          localStorage.setItem('userName', user.nombre);
          localStorage.setItem('userPhone', user.telefono);
          localStorage.setItem('userApellido', user.apellido);

          const decodedToken = jwtDecode(token);
          const { tipoUsuario } = decodedToken;
          localStorage.setItem('userRole', tipoUsuario);
          redirigirUsuario(tipoUsuario);
        } else {
          setLoginError('Error en la autenticación, intenta de nuevo');
        }
      } else {
        setLoginError('Usuario o contraseña incorrectos');
      }
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      setLoginError('Hubo un problema con el servidor, intenta más tarde');
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegistro = async (e) => {
    e.preventDefault();
    try {
        const response = await fetch('https://apicondominio-7jd1.onrender.com/registro', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });
        const data = await response.json();
        if (!data) {
            alert('Error al registrar el usuario: ' + data.message);
            return;
        }
        setFormData({
            nombre: '',
            apellido: '',
            correo: '',
            telefono: '',
            departamento: '',
            torre: '',
            tipoUsuario: 'Dueno',
            contrasena: ''
        });
        if (response.ok) {
            alert('Usuario registrado exitosamente');
            setShowForm(false); 
        }
        else {
            alert('Error al registrar el usuario: ' + data.message);
        }

        window.location.reload();
    } catch (error) {
        console.error('Error:', error);
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

            <div className="flex items-center">
              <input
                type="checkbox"
                id="recordar"
                name="recordar"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
              />
              <label htmlFor="recordar" className="ml-2 text-sm text-gray-700">
                Recordar
              </label>
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

            <button
            onClick={() => setShowForm(true)}

              className="text-blue-500 hover:underline focus:outline-none"
            >
              Registro
            </button>
          </div>
          <div className="flex justify-center pt-5 space-x-2">
            <h1 className="text-sm text-gray-700">¿Olvidaste la tu contraseña?</h1>
            <button
              onClick={() => navigate('/Recuperar')}
              className="text-blue-500 hover:underline focus:outline-none"
            >
              Recuperar
            </button>

            {showForm && (
                        <div className="fixed inset-0 flex items-center justify-center z-50" style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
                            <div className="bg-white shadow-xl rounded-lg p-6 w-full max-w-md">
                                <h2 className="text-xl font-semibold mb-4 text-center text-blue-600">Registrar Usuario</h2>
                                <form className="space-y-4" onSubmit={handleSubmit}>
                                    <div>
                                        <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="nombre">
                                            Nombre
                                        </label>
                                        <input
                                            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            id="nombre"
                                            type="text"
                                            name="nombre"
                                            value={formData.nombre}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="apellido">
                                            Apellido
                                        </label>
                                        <input
                                            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            id="apellido"
                                            type="text"
                                            name="apellido"
                                            value={formData.apellido}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="correo">
                                            Correo Electrónico
                                        </label>
                                        <input
                                            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            id="correo"
                                            type="email"
                                            name="correo"
                                            value={formData.correo}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="telefono">
                                            Teléfono
                                        </label>
                                        <input
                                            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            id="telefono"
                                            type="text"
                                            name="telefono"
                                            value={formData.telefono}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                    <div className="flex space-x-4">
                                  <div className="flex-grow">
                                      <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="departamento">
                                          Departamento
                                      </label>
                                      <input
                                          className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                          id="departamento"
                                          type="number"
                                          name="departamento"
                                          value={formData.departamento}
                                          onChange={handleChange}
                                      />
                                  </div>
                                  <div className="flex-grow">
                                      <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="torre">
                                          Torre
                                      </label>
                                      <input
                                          className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                          id="torre"
                                          type="number"
                                          name="torre"
                                          value={formData.torre}
                                          onChange={handleChange}
                                      />
                                  </div>
                              </div>


                                    <div>
                                        <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="contrasena">
                                            Contraseña
                                        </label>
                                        <input
                                            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            id="contrasena"
                                            type="password"
                                            name="contrasena"
                                            value={formData.contrasena}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                    <div className="flex justify-end space-x-4">
                                        <button
                                            className="bg-gray-400 text-white px-4 py-2 rounded-lg hover:bg-gray-500"
                                            onClick={() => setShowForm(false)}
                                            type="button"
                                        >
                                            Cancelar
                                        </button>
                                        <button
                                            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                                            onClick={handleRegistro}
                                        >
                                            Registrar
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
