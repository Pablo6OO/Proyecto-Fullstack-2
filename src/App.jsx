import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import './style.css'
import Header from './components/Header';
import React from 'react'

function App(){
  return(
    <div>
      <Header></Header>
      <main className="container">
    <section className="hero">
        <h1>Bienvenido a nuestra tienda</h1>
        <p>Productos de calidad para tu día a día.</p>
    </section>

    <section className="product-grid">
        <h2>Nuestros Productos</h2>
        <div className="products-container">
            {/* Aquí irían los productos */}
        </div>
    </section>

    <section className="product-reviews">
        <h2>Opiniones de Nuestros Clientes</h2>
        <div className="reviews-list" id="reviews-list">
            <article className="review-item">
                <div className="review-header">
                    <p className="review-author"><strong>Benjamin leroy</strong></p>
                    <div className="review-rating">
                        <span className="star">&#9733;</span><span className="star">&#9733;</span><span className="star">&#9733;</span><span className="star">&#9733;</span><span className="star">&#9733;</span>
                    </div>
                </div>
                <p className="review-comment">Envian rapido los pedidos.</p>
            </article>
        </div>
    </section>

    <section className="About-us">
        <h2>Sobre Nosotros</h2>
        <p>En Tienda Pato Feliz, nos dedicamos a la venta de productos de calidad, para lograr una satisfaccion de nuestros clientes. Somos un proyecto academico de un estudiante de DuocUC</p>
    </section>

    <section className="team">
        <h2>Nuestro Equipo</h2>
        <div className="team-members">
            <div className="team-member">
                {/* La etiqueta <img> ahora está auto-cerrada con "/>" */}
                <img src="images/owner.jpg" alt="Owner" className="team-photo" />
                <h3>Gabriel Espinoza</h3>
                <p>Creador</p>
            </div>
        </div>
    </section>
    
    <section className="contact">
        <a href="contacto.html" className="btn">Contactanos</a>
    </section>

    <section className="review-form-section">
        <div className="review-form">
            <h3>Danos Tu Opinion</h3>
            <form id="new-review-form">
                <div className="form-group">
                    {/* El atributo "for" se cambió a "htmlFor" */}
                    <label htmlFor="reviewer-name">Tu nombre:</label>
                    <input type="text" id="reviewer-name" name="reviewer-name" required />
                </div>
                <div className="form-group">
                    <label>Tu calificación:</label>
                    <div className="star-rating-input">
                        <input type="radio" id="star5" name="rating" value="5" required /><label htmlFor="star5" title="5 estrellas">&#9733;</label>
                        <input type="radio" id="star4" name="rating" value="4" /><label htmlFor="star4" title="4 estrellas">&#9733;</label>
                        <input type="radio" id="star3" name="rating" value="3" /><label htmlFor="star3" title="3 estrellas">&#9733;</label>
                        <input type="radio" id="star2" name="rating" value="2" /><label htmlFor="star2" title="2 estrellas">&#9733;</label>
                        <input type="radio" id="star1" name="rating" value="1" /><label htmlFor="star1" title="1 estrella">&#9733;</label>
                    </div>
                </div>
                <div className="form-group">
                    <label htmlFor="review-text">Tu comentario:</label>
                    <textarea id="review-text" name="review-text" rows="4" required></textarea>
                </div>
                <button type="submit" className="btn">Enviar Reseña</button>
            </form>
        </div>
    </section>
</main>
</div>);
}



export default App
