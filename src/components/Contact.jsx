import React, { useState } from 'react';
import ContactService from '../services/contactService';

function Contact({ onClose }) {
  const [nombre, setNombre] = useState('');
  const [correo, setCorreo] = useState('');
  const [contenido, setContenido] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!nombre.trim() || !correo.trim() || !contenido.trim()) return;


    const newMessage = {
      nombre: nombre,
      correo: correo,
      contenido: contenido,
      date: new Date().toISOString()
    };


  // Guardar en backend
  ContactService.create(newMessage).catch(err => console.error('Error saving contact message:', err));

   
    setSuccess(true);
    setNombre('');
    setCorreo('');
    setContenido('');

  
    setTimeout(() => setSuccess(false), 4000);

    
    if (onClose) setTimeout(onClose, 1500);
  };

  return (
    <div className="contact-panel" style={{padding: '1rem', background: 'white', boxShadow: '0 2px 8px rgba(0,0,0,0.1)'}}>
      <section className="form-section">
        <h2>Contacto</h2>
        <form id="contacto-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="nombre">Nombre</label>
            <input
              type="text"
              id="nombre"
              name="nombre"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="correo">Correo Electrónico</label>
            <input
              type="email"
              id="correo"
              name="correo"
              value={correo}
              onChange={(e) => setCorreo(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="contenido">Mensaje</label>
            <textarea
              id="contenido"
              name="contenido"
              rows="4"
              value={contenido}
              onChange={(e) => setContenido(e.target.value)}
              required
            />
          </div>

          <div style={{display: 'flex', gap: '0.5rem', alignItems: 'center'}}>
            <button type="submit" className="btn">Enviar</button>
            {onClose && (
              <button type="button" className="btn" onClick={onClose} style={{background:'#ccc'}}>
                Cerrar
              </button>
            )}
          </div>

          {success && (
            <p id="mensaje-exito" style={{color: 'green', marginTop: '0.5rem'}}>¡Mensaje enviado correctamente!</p>
          )}
        </form>
      </section>
    </div>
  );
}

export default Contact;
