import { useState } from "react";
import { useAuth } from './registerUser';
import { useNavigate } from "react-router-dom";

function registro() {
  const [name, setName] = useState("");
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [valpass, setValPass] = useState("");
  const [error, setError] = useState("");
  const [errorCorreo, setErrorCorreo] = useState("");
  const { setUser } = useAuth();
  const navigate = useNavigate();


  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setErrorCorreo("");

    if (valpass !== password) {
      setError("La contraseña debe ser igual en los dos campos");
      return;
    }
    
    if (!(identifier.includes('@gmail.com'))) {
      setErrorCorreo("Correo invalido, ingrese correo con '@gmail.com'");
      return;
    }

    
    
    const newUser = {
      email: identifier,
      password: password,
      name: name || identifier.split('@')[0] 
    };

    
    setUser(newUser); 
    
    
    const registeredUsers = JSON.parse(localStorage.getItem('registeredUsers')) || [];
    registeredUsers.push({
      email: identifier,
      name: newUser.name,
      dateRegistered: new Date().toISOString().split('T')[0]
    });
    localStorage.setItem('registeredUsers', JSON.stringify(registeredUsers));
    

    alert('¡Registrado correctamente!');

    navigate('/');
  };

  return (
    <div className="container">
      <section className="form-section">
        <h1>Registro de Usuario</h1>
        <form onSubmit={handleLogin} novalidate>
          <div className="form-group">
            <label htmlFor="name-registro">Nombre (Opcional)</label>
            <input type="text"
                   placeholder="Tu nombre completo"
                   value={name}
                   onChange={(e) => setName(e.target.value)}
                   id="name-registro"
            />
          </div>
          <div className="form-group">
            <label htmlFor="email-registro">Correo Electrónico</label>
            <input type="email"
                   placeholder="Correo usuario"
                   value={identifier}
                   onChange={(e) => setIdentifier(e.target.value)}
                   required
                   id="email-registro"
            />
            {errorCorreo && <p style={{ color: "red" }}>{errorCorreo}</p>}
          </div>
          <div className="form-group">
            <label htmlFor="password-registro">Contraseña</label>
            <input type="password"
                   placeholder="Contraseña"
                   value={password}
                   onChange={(e) => setPassword(e.target.value)}
                   required
                   minlength="8"
                   id="password-registro"
            />
          </div>
          <div className="form-group">
            <label htmlFor="confirm-password">Confirmar Contraseña</label>
            <input type="password"
                   placeholder="Repita la Contraseña"
                   value={valpass}
                   onChange={(e) => setValPass(e.target.value)}
                   required
                   id="confirm-password"
            />
            {error && <p style={{ color: "red" }}>{error}</p>}
          </div>
          <button type="submit" className="btn">Registrarse</button>
        </form>
      </section>
    </div>
  );
}

export default registro