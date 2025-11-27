import React from 'react';
import AboutUs from './components/AboutUs';
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
import Contact from './components/Contact';
import ProductDetail from './components/productdetail';
import { CartProvider } from './context/CartProvider';
import { SearchProvider } from './context/SearchContext';
import { AuthProvider } from './components/registerUser';

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <SearchProvider>
          <div className='app-layout'></div>
          <BrowserRouter>
          <div>
            <Header />
          <main>
            <Routes>
              <Route path="/login" element={<Login/>}/>
              <Route path="/admin" element={<Admin/>}/>
              <Route path="/registro" element={<Registro/>}/>
              <Route path="/carrito" element={<Carrito/>}/>
              <Route path="/" element={<Inicio/>}/>
              <Route path="/AboutUs" element={<AboutUs/>}/>
                <Route path="/Contact" element={<Contact/>}/>
              <Route path="/producto/:id" element={<ProductDetail/>}/>  
            </Routes>
          </main>
          <Footer/>
        </div>
      </BrowserRouter>
        </SearchProvider>
      </CartProvider>
    </AuthProvider>
  
  );
}

export default App;
