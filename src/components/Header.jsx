import React, { useRef } from 'react';
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
        <Link to="/" className="logo">Tienda Pato Feliz</Link>
        <img
          src="src/images/120px-Unused_Duck_Journal.png" 
          alt="Logo"
          className="logo-image"
          onClick={handleLogoClick} 
        />
        <audio ref={audioRef} id="logo-click" src="src/audio/Bumper_car_quack1.wav"></audio>

        <nav>
          <Link to="/">Inicio</Link>
          <Link to="/login">Iniciar sesion</Link>
          <Link to="/registro">Registro</Link>
          <Link to="/Carrito">Carrito</Link>
          <Link to="/aboutus">Sobre Nosotros</Link>
        </nav>
      </div>
    </header>
    
  );
}

export default Header;