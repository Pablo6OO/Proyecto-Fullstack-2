import React from 'react';
import './App.css';
import './style.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Login from './components/login';
import Admin from './components/admin';
import Carrito from './components/carrito';
import Registro from './components/registro'; 
import Footer from './components/Footer';
import Inicio from './components/Inicio';
import ProductDetail from './components/productdetail';
import { CartProvider } from './context/CartProvider';

function App() {
  return (
    <CartProvider>
      <div className='app-layout'></div>
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
            <Route path="/producto/:id" element={<ProductDetail />} />
            
            </Routes>
        </main>
        <Footer/>
      </div>
    </BrowserRouter>
    </CartProvider>
  );
}

export default App;
