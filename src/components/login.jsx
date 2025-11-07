import { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from './registerUser';

function Login() {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [errorLogin, setErrorLogin] = useState("");

  const { user, setUser } = useAuth();
  const navigate = useNavigate();
  
  const handleLogin = (e) => {
    e.preventDefault();
    setErrorLogin("");

    if (identifier === "admin@gmail.com" && password === "DuocUc..2025") {
      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('isAdmin', 'true');
      alert("¡Bienvenido Administrador!\nAccediendo al panel de administración...");
      navigate('/admin');
      return;
    }

    const registeredUsers = JSON.parse(localStorage.getItem('registeredUsers')) || [];
    const foundUser = registeredUsers.find(u => u.email === identifier && u.password === password);

    if (foundUser) {
      try {
        const updatedUser = {
          ...foundUser,
          lastLogin: new Date().toISOString(),
          isLoggedIn: true
        };
        
        const updatedUsers = registeredUsers.map(u => 
          u.email === updatedUser.email ? updatedUser : u
        );
        localStorage.setItem('registeredUsers', JSON.stringify(updatedUsers));
        
        setUser(updatedUser);
        
        localStorage.setItem('isAuthenticated', 'true');
        localStorage.setItem('isAdmin', 'false');
        
        const userName = updatedUser.email.split('@')[0];
        const formattedName = userName.charAt(0).toUpperCase() + userName.slice(1);
        
        alert(`¡Bienvenido ${formattedName}! \n\nTe has conectado correctamente.\nSerás redirigido a la página de inicio.`);
        
        navigate('/');
        
        setTimeout(() => {
          alert('¡Disfruta de tu compra en Tienda Pato Feliz! ');
        }, 1000);
      } catch (error) {
        console.error('Error durante el inicio de sesión:', error);
        setErrorLogin("Ocurrió un error durante el inicio de sesión. Por favor, intenta nuevamente.");
      }
    } else {
      setErrorLogin("Credenciales inválidas. Verifica correo y contraseña.");
    }
  };

  return (
    <section className="container">
      <section className="form-section">
        <h1>Inicio sesion</h1>
        <form onSubmit={handleLogin} noValidate>
          <div class="form-group">
            <label for="email">Correo Electrónico</label>
            <input type="email" placeholder="Correo usuario" id="email" onChange={(e) => setIdentifier(e.target.value)} required/>
          </div> 
          <div className="form-group">
            <label for="password">Contraseña</label>
            <input type="password" id="password" placeholder="Contraseña" name="password" onChange={(e) => setPassword(e.target.value)} />
          </div>
          {errorLogin && <p style={{ color: "red" }}>{errorLogin}</p>}
          <button type="submit" class="btn">Iniciar Sesión</button>

          <h4>¿No tienes una cuenta? <Link to="/registro">Regístrate</Link></h4>
        </form>
      </section>
    </section>
  );
}

export default Login;