import React, { useRef } from 'react';
// 1. Importamos 'Link' para manejar la navegación
import { Link } from 'react-router-dom';

function Header() {
  
  const audioRef = useRef(null);

  const handleLogoClick = () => {
    if (audioRef.current) {
      audioRef.current.play();
    }
  };

  return (
    <header className="header">
      <div className="container">
        <Link to="/" className="logo">Tienda Pato feliz</Link>
        <img
          src="src/images/120px-Unused_Duck_Journal.png" 
          alt="Logo"
          className="logo-image"
          onClick={handleLogoClick} 
        />
        <audio ref={audioRef} id="logo-click" src="src/audio/Bumper_car_quack1.wav"></audio>

        <nav>
          {/* 3. Reemplazamos todas las etiquetas <a> por <Link> */}
          <Link to="/">Inicio</Link>
          <Link to="/admin">Admin</Link>
          <Link to="/login">Iniciar sesion</Link>
          <Link to="/registro">Registro</Link>
          <Link to="/carrito">Carrito</Link>
        </nav>
      </div>
    </header>
  );
}

export default Header;