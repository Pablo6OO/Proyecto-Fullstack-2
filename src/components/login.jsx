import { useState } from "react"; // 👈 1. Importar useState
import { Link , useNavigate } from 'react-router-dom';
import { useAuth } from './registerUser'; // 👈 2. Importar useAuth

function login() {

  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [errorLogin, setErrorLogin] = useState("");

  // 4. Acceder al contexto y navegación
  const { user } = useAuth(); // Solo necesitamos leer el usuario guardado
  const navigate = useNavigate();
  
  const handleLogin = (e) => {
    e.preventDefault();
    setErrorLogin("");

    // 5. Lógica de Autenticación
    // Comprobar si hay un usuario registrado en el contexto
    if (user && user.email === identifier && user.password === password) {
      
      // ¡Éxito! Las credenciales coinciden con el usuario guardado
      alert("Inicio de sesión exitoso!");
      navigate('/');
      
    } else {
      // Fracaso: Las credenciales no coinciden o el contexto está vacío
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

export default login