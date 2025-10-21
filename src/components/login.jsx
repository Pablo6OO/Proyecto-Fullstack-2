import { Link } from 'react-router-dom';

function login() {
  return (
    <section className="container">
      <section className="form-section">
        <h1>Inicio sesion</h1>
        <form id="registro-form" novalidate>
          <div class="form-group">
            <label for="email">Correo Electrónico</label>
            <input type="email" placeholder="Correo usuario" id="email" onChange={(e) => setIdentifier(e.target.value)} required/>
          </div> 
          <div className="form-group">
            <label for="password">Contraseña</label>
            <input type="password" id="password" placeholder="Contraseña" name="password" onChange={(e) => setIdentifier(e.target.value)} />
          </div>
          <button type="submit" class="btn">Iniciar Sesión</button>

          <h4>¿No tienes una cuenta? <Link to="/registro">Regístrate</Link></h4>
        </form>
      </section>
    </section>
  );
}

export default login