import { useState } from "react";
import { useAuth } from './registerUser';
import { useNavigate } from "react-router-dom";

function registro() {
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
      dateRegistered: new Date().toISOString(),
      lastLogin: null
    };


    setUser(newUser);


    const registeredUsers = JSON.parse(localStorage.getItem('registeredUsers')) || [];
    
   
    if (registeredUsers.some(user => user.email === identifier)) {
      setErrorCorreo("Este correo ya está registrado");
      return;
    }

    registeredUsers.push(newUser);
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
            <label>Correo Electrónico</label>
            <input type="email"
                   placeholder="Correo usuario"
                   value={identifier}
                   onChange={(e) => setIdentifier(e.target.value)}
                   required
            />
            {errorCorreo && <p style={{ color: "red" }}>{errorCorreo}</p>}
          </div>
          <div className="form-group">
            <label>Contraseña</label>
            <input type="password"
                   placeholder="Contraseña"
                   value={password}
                   onChange={(e) => setPassword(e.target.value)}
                   required
                   minlength="8"
            />
          </div>
          <div className="form-group">
            <label>Confirmar Contraseña</label>
            <input type="password"
                   placeholder="Repita la Contraseña"
                   value={valpass}
                   onChange={(e) => setValPass(e.target.value)}
                   required
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