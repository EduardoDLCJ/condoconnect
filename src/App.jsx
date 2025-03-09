import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './Login';
import Inicio from './Inicio';
import Usuarios from './Usuarios';
import Multas from './Multas';
import InicioU from './InicioU';
import VerMultas from './VerMultas';
import Notificaciones from './Notificaciones';
import Usuario from './Usuario';
import Recuperar from './Recuperar';
import Cambiarc from './Cambiarc';
import Respaldar from './respaldar';

const PrivateRoute = ({ element: Component, roles, ...rest }) => {
  const token = localStorage.getItem('authToken');
  const userRole = localStorage.getItem('userRole');

  if (!token || !roles.includes(userRole)) {
    return <Navigate to="/" />;
  }

  return <Component {...rest} />;
};

const App = () => (
  <Router>
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/Inicio" element={<PrivateRoute element={Inicio} roles={['Administrador']} />} />
      <Route path="/Usuarios" element={<PrivateRoute element={Usuarios} roles={['Administrador']} />} />
      <Route path="/Multas" element={<PrivateRoute element={Multas} roles={['Administrador']} />} />
      <Route path="/InicioU" element={<PrivateRoute element={InicioU} roles={['Dueno']} />} />
      <Route path="/VerMultas" element={<PrivateRoute element={VerMultas} roles={['Dueno']} />} />
      <Route path="/Notificaciones" element={<PrivateRoute element={Notificaciones} roles={['Dueno']} />} />
      <Route path="/Usuario" element={<PrivateRoute element={Usuario} roles={['Dueno']} />} />
      <Route path="/Recuperar" element={<Recuperar />} />
      <Route path="/Cambiarc" element={<Cambiarc />} />
      <Route path="/Respaldar" element={<PrivateRoute element={Respaldar} roles={['Administrador']} />} />
    </Routes>
  </Router>
);

export default App;
