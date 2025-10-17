import React from 'react';
import './App.css';
import './style.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Header from './components/Header';
import Login from './components/login';
import Admin from './components/admin';
import Carrito from './components/carrito';
import Registro from './components/registro'; 
import footer from './components/Footer';
import Inicio from './components/Inicio';

function App() {
  return (
    <BrowserRouter>
      <div>
        <Header />
        <main>
          <Routes>
            <Route path="/login" element={<Login/>}/>
            <Route path="/admin" element={<Admin/>}/>
            <Route path="/registro" element={<Registro/>}/>
            <Route path="/carrito" element={<Carrito />} />
            <Route path="/" element={<Inicio />}/>
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
