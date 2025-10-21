import { useState } from "react";

function registro() {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [valpass, setValPass] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

  if (valpass !== password) {
    setError("La contraseña debe ser igual en los dos campos");
    return;
  }

  };

  return (
    <div class="container">
      <section class="form-section">
        <h1>Registro de Usuario</h1>
        <form onSubmit={handleLogin} novalidate>
          <div class="form-group">
            <label>Correo Electrónico</label>
            <input type="email"
                   placeholder="Correo usuario"
                   value={identifier}
                   onChange={(e) => setIdentifier(e.target.value)}
                   required
            />
          </div>
          <div class="form-group">
            <label>Contraseña</label>
            <input type="password"
                   placeholder="Contraseña"
                   value={password}
                   onChange={(e) => setPassword(e.target.value)}
                   required
                   minlength="6"
            />
          </div>
          <div class="form-group">
            <label>Confirmar Contraseña</label>
            <input type="password"
                   placeholder="Repita la Contraseña"
                   value={valpass}
                   onChange={(e) => setValPass(e.target.value)}
                   required
            />
          </div>
          <button type="submit" class="btn">Registrarse</button>
          {error && <p style={{ color: "red" }}>{error}</p>}
        </form>
      </section>
    </div>
  );
}

export default registro