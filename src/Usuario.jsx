import React, { useEffect, useState } from "react";
import NavbarU from './NavbarU';
import { useNavigate } from "react-router-dom";

const Usuario = () => {
  const [user, setUser] = useState({
    departamento: localStorage.getItem("departamento") || "",
    torre: localStorage.getItem("torre") || "",
    tipoUsuario: localStorage.getItem("userRole") || "",
    authToken: localStorage.getItem("authToken") || "",
    _id: localStorage.getItem("userId") || "",
    nombre: localStorage.getItem("userName") || "",
    telefono: localStorage.getItem("userPhone") || "",
    apellido: localStorage.getItem("userApellido") || "",
  });

  const [showModal, setShowModal] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [logoutAllDevices, setLogoutAllDevices] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    Object.keys(user).forEach((key) => {
      localStorage.setItem(key, user[key]);
    });
  }, [user]);

  const updateUser = (newUserData) => {
    setUser((prevUser) => ({ ...prevUser, ...newUserData }));
  };

  const clearUser = () => {
    setUser({
      departamento: "",
      torre: "",
      tipoUsuario: "",
      authToken: "",
      _id: "",
      nombre: "",
      telefono: "",
      apellido: "",
    });
    localStorage.clear();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    updateUser({ [name]: value });
  };

  const handlePasswordChange = async () => {
    // Aquí se enviará la nueva contraseña y el valor del checkbox al backend
    const response = await fetch('https://apicondominio-7jd1.onrender.com/users/cambiarpass', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${user.authToken}`
      },
      body: JSON.stringify({
        newPassword,
        logoutAllDevices
      })
    });

    if (response.status === 204) {
      localStorage.removeItem('authToken');
      alert('Contraseña cambiada exitosamente. Por favor, inicia sesión nuevamente.');
      navigate('/');
    } else if (response.status === 200) {
      alert('Contraseña cambiada exitosamente.');
    } else {
      alert('Error al cambiar la contraseña');
    }
  };

  return (
    <div className="relative flex items-center justify-center h-screen appf">
      <NavbarU torre={user.torre} departamento={user.departamento} />
      <div className="w-full max-w-md p-8 space-y-4 bg-white rounded-lg shadow-md mt-20">
        <h1 className="text-2xl font-bold text-center text-gray-800">Usuario</h1>
        <form className="space-y-4">
          <div className="flex space-x-4">
            <div className="w-1/2">
              <label className="block text-sm font-medium text-gray-700">Departamento</label>
              <input
                type="text"
                name="departamento"
                value={user.departamento}
                onChange={handleChange}
                className="w-full px-4 py-2 mt-1 text-gray-700 bg-gray-100 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
            <div className="w-1/2">
              <label className="block text-sm font-medium text-gray-700">Torre</label>
              <input
                type="text"
                name="torre"
                value={user.torre}
                onChange={handleChange}
                className="w-full px-4 py-2 mt-1 text-gray-700 bg-gray-100 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
          </div>
          <div className="flex space-x-4">
            <div className="w-1/2">
              <label className="block text-sm font-medium text-gray-700">Tipo de Usuario</label>
              <input
                type="text"
                name="tipoUsuario"
                value={user.tipoUsuario}
                onChange={handleChange}
                className="w-full px-4 py-2 mt-1 text-gray-700 bg-gray-100 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
            <div className="w-1/2">
              <label className="block text-sm font-medium text-gray-700">Nombre</label>
              <input
                type="text"
                name="nombre"
                value={user.nombre}
                onChange={handleChange}
                className="w-full px-4 py-2 mt-1 text-gray-700 bg-gray-100 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
          </div>
          <div className="flex space-x-4">
            <div className="w-1/2">
              <label className="block text-sm font-medium text-gray-700">Apellido</label>
              <input
                type="text"
                name="apellido"
                value={user.apellido}
                onChange={handleChange}
                className="w-full px-4 py-2 mt-1 text-gray-700 bg-gray-100 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
            <div className="w-1/2">
              <label className="block text-sm font-medium text-gray-700">Teléfono</label>
              <input
                type="text"
                name="telefono"
                value={user.telefono}
                onChange={handleChange}
                className="w-full px-4 py-2 mt-1 text-gray-700 bg-gray-100 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
          </div>
          <div className="flex justify-between">
            <button
              type="button"
              onClick={() => setShowModal(true)}
              className="px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-700"
            >
              Cambiar Contraseña
            </button>
          </div>
        </form>
      </div>

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center modal-background">
          <div className="w-full max-w-md p-8 space-y-4 rounded-lg shadow-md modal">
            <h2 className="text-xl font-bold text-center text-gray-800">Cambiar Contraseña</h2>
            <div>
              <label className="block text-sm font-medium text-gray-700">Nueva Contraseña</label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full px-4 py-2 mt-1 text-gray-700 bg-gray-100 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                checked={logoutAllDevices}
                onChange={(e) => setLogoutAllDevices(e.target.checked)}
                className="mr-2"
              />
              <label className="text-sm font-medium text-gray-700">Cerrar sesión en todos los dispositivos</label>
            </div>
            <div className="flex justify-end space-x-4">
              <button
                type="button"
                onClick={() => setShowModal(false)}
                className="px-4 py-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={handlePasswordChange}
                className="px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-700"
              >
                Guardar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Usuario;
