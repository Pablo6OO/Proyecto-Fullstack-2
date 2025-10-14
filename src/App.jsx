import React from 'react';
import './App.css';
import './style.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// 1. Importamos los componentes con su nombre en PascalCase
import Header from './components/Header';
import Carrito from './components/carrito'; // <-- CAMBIO: Nombre en mayúscula
import inicio from './components/Inicio';

function App() {
  return (
    // BrowserRouter debe envolver toda la aplicación
    <BrowserRouter>
      <div>
        <Header />
        <main>
          <Routes>
            {/* 2. Usamos el componente con su nombre en PascalCase */}
            <Route path="/" element={<Carrito />} />
            <Route path="/" element={<inicio/>}/>
            {/* Aquí puedes agregar más rutas en el futuro, por ejemplo: */}
            {/* <Route path="/contacto" element={<PaginaDeContacto />} /> */}
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
