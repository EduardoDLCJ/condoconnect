import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Login';
import Inicio from './Inicio';

import Usuarios from './Usuarios';
import Multas from './Multas';
import InicioU from './InicioU';
import VerMultas from './VerMultas';
import Notificaciones from './Notificaciones';
import Usuario from './Usuario';

const App = () => (
  <Router>  
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/Inicio" element={<Inicio />} />
      <Route path="/Usuarios" element={<Usuarios />} />
      <Route path="/Multas" element={<Multas />} />
      <Route path="/InicioU" element={<InicioU />} />
      <Route path="/VerMultas" element={<VerMultas />} />
      <Route path="/Notificaciones" element={<Notificaciones />} />
      <Route path="/Usuario" element={<Usuario />} />
    </Routes>
  </Router>
);

export default App;
