function AboutUs(){
    return(
        <div>
            <section className="AboutUs-section">
       
            <h1>Sobre Nosotros</h1>
            <p>Somos una empresa dedicada a ofrecer los mejores productos para nuestros clientes. Nuestra misión es brindar calidad y excelente servicio.</p>
            <h2>Equipo de Trabajo</h2>
            <section className="aboutus-team">
            <ul>
                <img src="src/images/owner.jpg" alt="Logo" className="aboutus-logo"img/>
                <li>Gabriel Espinoza - Fundador y CEO</li>
                
              
            </ul>
            <section>
                <ul>
                <img src="src/images/dev1.jpg" alt="Logo" className="aboutus-logo"img width={220}/>
                    <li>Pablo Diaz - Programador</li>
                </ul>
            </section>
            </section>
             </section>
        </div>
    );
}
export default AboutUs;