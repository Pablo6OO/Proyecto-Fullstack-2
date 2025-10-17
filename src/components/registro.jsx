function registro() {
  return (
    <div class="container">
      <section class="form-section">
        <h1>Registro de Usuario</h1>
        <form id="registro-form" novalidate>
          <div class="form-group">
            <label for="email">Correo Electrónico</label>
            <input type="email" placeholder="Correo usuario" id="email" onChange={(e) => setIdentifier(e.target.value)} required/>
            <p class="error-message" id="email-error"></p>
          </div>
          <div class="form-group">
            <label for="password">Contraseña</label>
            <input type="password" id="password" placeholder="Contraseña" name="password" onChange={(e) => setIdentifier(e.target.value)} required minlength="6"/>
            <p class="error-message" id="password-error">La contraseña debe tener al menos 6 caracteres.</p>
          </div>
          <div class="form-group">
            <label for="password">Confirmar Contraseña</label>
            <input type="password" id="conpassword" placeholder="Repita la Contraseña" name="conpassword" onChange={(e) => setIdentifier(e.target.value)} required/>
          </div>
          <button type="submit" class="btn">Registrarse</button>
          <p id="form-error" class="error-message form-error"></p>
        </form>
      </section>
    </div>
  );
}

export default registro