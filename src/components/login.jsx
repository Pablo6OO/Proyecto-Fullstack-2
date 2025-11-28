import { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from './registerUser';
import UserService from '../services/userService';

function Login() {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [errorLogin, setErrorLogin] = useState("");

  const { user, setUser } = useAuth();
  const navigate = useNavigate();
  
  const handleLogin = (e) => {
    e.preventDefault();
    setErrorLogin("");

    // Authenticate admin hardcoded case
    if (identifier === "admin@gmail.com" && password === "DuocUc..2025") {
      const adminUser = {
        email: 'admin@gmail.com',
        isAdmin: true,
        lastLogin: new Date().toISOString()
      };
      setUser(adminUser);
      alert("¡Bienvenido Administrador!\nAccediendo al panel de administración...");
      navigate('/admin');
      return;
    }

    // Buscar usuario en backend
    UserService.getAll().then(list => {
      const foundUser = (list || []).find(u => u.email === identifier && u.password === password);
      if (foundUser) {
        const updatedUser = { ...foundUser, lastLogin: new Date().toISOString(), isLoggedIn: true };
        setUser(updatedUser);
        alert(`¡Bienvenido ${updatedUser.email.split('@')[0]}!\nTe has conectado correctamente.`);
        navigate('/');
      } else {
        setErrorLogin("Credenciales inválidas. Verifica correo y contraseña.");
      }
    }).catch(err => {
      console.error('Error fetching users for login:', err);
      setErrorLogin('Ocurrió un error durante el inicio de sesión. Intenta nuevamente.');
    });
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