import React, { useRef } from 'react';
import { Link , useNavigate } from 'react-router-dom';
import { useAuth } from './registerUser';

function Header() {
  
  const audioRef = useRef(null);

  const { user, setUser } = useAuth();
  const navigate = useNavigate();

  const handleLogoClick = () => {
    if (audioRef.current) {
      audioRef.current.play();
    }
  };

  const handleLogout = () => {
    setUser(null); 
    navigate('/');
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
          {user && <Link to="/Carrito">Carrito</Link>}
          
          <Link to="/AboutUs">Sobre Nosotros</Link>
           <Link to="/Contact">Contacto</Link>
          {user ? (
            <>
              <button 
                onClick={handleLogout} 
                className="btn-logout" 
                style={{ background: 'red', color: 'white', border: 'none', padding: '5px 10px', cursor: 'pointer' }}
              >
                Cerrar Sesión
              </button>
            </>
          ) : (
            <>
              <Link to="/login">Iniciar sesion</Link>
              <Link to="/registro">Registro</Link>
            </>
          )}
        </nav>
      </div>
    </header>
    
  );
}

export default Header;