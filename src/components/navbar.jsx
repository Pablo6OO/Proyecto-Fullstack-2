// src/components/Navbar.jsx

import React from 'react';
import { Link } from 'react-router-dom'; 

function Navbar() {
  return (
    <nav className="main-navbar">
      <ul>
        <li>
          <Link to="/">inicio</Link>
        </li>
        <li>
          <Link to="/productos">Nuestros Productos</Link>
        </li>
        <li>
          <Link to="/sobre-nosotros">Sobre Nosotros</Link>
        </li>
        <li>
          <Link to="/contacto">Contacto</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;