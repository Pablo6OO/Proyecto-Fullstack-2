function admin() {
  return (
    <main className="container">
      <section>
        <h1>Gestión de Usuarios Registrados</h1>
        <table id="usuarios-table" style="width:100%;border-collapse:collapse;">
          <thead>
            <tr>
              <th>Correo Electrónico</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
                  
          </tbody>
        </table>
      </section>
  
      <section id="historial-carrito">
        <h2>Historial del Carrito</h2>
        <table id="carrito-table" style="width:100%;border-collapse:collapse;">
          <thead>
            <tr>
              <th>Fecha</th>
              <th>Producto</th>
              <th>Precio</th>
            </tr>
          </thead>
          <tbody>
       
          </tbody>
        </table>
      </section>

      <section className="admin-panel">
        <h1>Panel de Administración</h1>
        <h2>Mensajes de Contacto Recibidos</h2>
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Email</th>
                <th>Mensaje</th>
                <th>Fecha</th>
              </tr>
            </thead>
            <tbody id="messages-tbody">
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
}

export default admin