import { useState } from "react";

function registro() {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [valpass, setValPass] = useState("");
  const [error, setError] = useState("");
  const [errorCorreo, setErrorCorreo] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setErrorCorreo("");

    if (valpass !== password) {
      setError("La contraseña debe ser igual en los dos campos");
    }
    
    if (!(identifier.includes('@gmail.com'))) {
      setErrorCorreo("Correo invalido, ingrese correo con '@gmail.com'");
    }
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