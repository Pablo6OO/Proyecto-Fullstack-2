import React from "react";

 function Header (){
    return( <header class="header">
        <div className="container">
              <a href="main.html" class="logo">Tienda Pato feliz</a>
            <img src="images/120px-Unused_Duck_Journal.png" alt="Logo" class="logo-image"
            onclick="document.getElementById('logo-click').play()"/>
            <audio id="logo-click" src="audio/Bumper_car_quack1.wav"></audio> 
            <nav>
         <a href="main.html" id="login-link">Inicio</a>
            <a href="admin.html" id="admin-link">Admin</a>
                <a href="index.html">Iniciar sesion</a>
                <a href="registro.html" id="register-link">Registro</a>
                <a href="carrito.html">Carrito</a>
             
               
            </nav>
        </div>
    </header>
    );
 }
 export default Header;