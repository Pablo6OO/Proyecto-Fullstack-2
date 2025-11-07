import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './admin.css';

const Admin = () => {
    const [users, setUsers] = useState([]);
    const [cartHistory, setCartHistory] = useState([]);
    const [contactMessages, setContactMessages] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const isAdmin = localStorage.getItem('isAdmin');
        const isAuthenticated = localStorage.getItem('isAuthenticated');

        if (!isAuthenticated || isAdmin !== 'true') {
            alert('Acceso no autorizado. Por favor inicie sesión como administrador.');
            navigate('/login');
            return;
        }

        fetchUsers();
        fetchCartHistory();
        fetchContactMessages();
    }, [navigate]);

    const fetchUsers = () => {
        const registeredUsers = JSON.parse(localStorage.getItem('registeredUsers')) || [];
        const contextUsers = JSON.parse(localStorage.getItem('users')) || [];
        
        const allUsers = [...registeredUsers, ...contextUsers];
        const uniqueUsers = Array.from(new Map(allUsers.map(user => [user.email, user])).values());
        
        setUsers(uniqueUsers.map(user => ({
            email: user.email,
            dateRegistered: user.dateRegistered || new Date().toISOString().split('T')[0],
            lastLogin: user.lastLogin || 'No ha iniciado sesión',
            isAdmin: user.email === 'admin@gmail.com'
        })));
    };

    const fetchCartHistory = () => {
        const cartHistory = JSON.parse(localStorage.getItem('cartHistory')) || [];
        setCartHistory(cartHistory.map(item => ({
            date: new Date(item.date).toISOString().split('T')[0],
            product: item.product,
            price: item.price
        })));
    };

    const fetchContactMessages = () => {
        const messages = JSON.parse(localStorage.getItem('contactMessages')) || [];
        setContactMessages(messages.map(msg => ({
            name: msg.nombre || msg.name,
            email: msg.correo || msg.email,
            message: msg.contenido || msg.message,
            date: msg.date || new Date().toISOString().split('T')[0]
        })));
    };
    const handleDeleteUser = (email) => {
        const confirmed = window.confirm(`¿Está seguro de eliminar al usuario ${email}?`);
        if (confirmed) {
            const registeredUsers = JSON.parse(localStorage.getItem('registeredUsers')) || [];
            const updatedUsers = registeredUsers.filter(user => user.email !== email);
            localStorage.setItem('registeredUsers', JSON.stringify(updatedUsers));
            fetchUsers(); 
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('isAuthenticated');
        localStorage.removeItem('isAdmin');
        navigate('/login');
    };

    return (
        <div className="admin-container">
            <header className="admin-header">
                <div className="container">
                    <h1>Tienda Pato feliz - Panel de Administración</h1>
                    <nav>
                        <button onClick={() => navigate('/')}>Inicio</button>
                        <button onClick={handleLogout}>Cerrar sesión</button>
                    </nav>
                </div>
            </header>

            <main className="admin-main">
                <section className="admin-section">
                    <h2>Gestión de Usuarios Registrados</h2>
                    <div className="admin-stats">
                        <div className="stat-box">
                            <h4>Total Usuarios</h4>
                            <p>{users.length}</p>
                        </div>
                        <div className="stat-box">
                            <h4>Usuarios Normales</h4>
                            <p>{users.filter(user => !user.isAdmin).length}</p>
                        </div>
                        <div className="stat-box">
                            <h4>Administradores</h4>
                            <p>{users.filter(user => user.isAdmin).length}</p>
                        </div>
                    </div>
                    <table className="admin-table">
                        <thead>
                            <tr>
                                <th>Correo Electrónico</th>
                                <th>Fecha Registro</th>
                                <th>Último Acceso</th>
                                <th>Tipo</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user, index) => (
                                <tr key={index} className={user.isAdmin ? 'admin-row' : ''}>
                                    <td>{user.email}</td>
                                    <td>{new Date(user.dateRegistered).toLocaleDateString()}</td>
                                    <td>{user.lastLogin === 'No ha iniciado sesión' ? 
                                        user.lastLogin : 
                                        new Date(user.lastLogin).toLocaleString()}</td>
                                    <td>{user.isAdmin ? 'Administrador' : 'Usuario'}</td>
                                    <td>
                                        {!user.isAdmin && (
                                            <button 
                                                className="admin-button delete"
                                                onClick={() => handleDeleteUser(user.email)}
                                            >
                                                Eliminar
                                            </button>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </section>

                <section className="admin-section">
                    <h2>Historial de Compras</h2>
                    <table className="admin-table">
                        <thead>
                            <tr>
                                <th>Fecha</th>
                                <th>Producto</th>
                                <th>Cantidad</th>
                                <th>Precio Unitario</th>
                                <th>Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            {cartHistory.map((item, index) => (
                                <tr key={index}>
                                    <td>{new Date(item.date).toLocaleString()}</td>
                                    <td>{item.product}</td>
                                    <td>{item.quantity}</td>
                                    <td>${item.price}</td>
                                    <td>${(item.price * item.quantity).toFixed(2)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </section>

                <section className="admin-section">
                    <h2>Mensajes de Contacto Recibidos</h2>
                    <table className="admin-table">
                        <thead>
                            <tr>
                                <th>Nombre</th>
                                <th>Email</th>
                                <th>Mensaje</th>
                                <th>Fecha</th>
                            </tr>
                        </thead>
                        <tbody>
                            {contactMessages.map((message, index) => (
                                <tr key={index}>
                                    <td>{message.name}</td>
                                    <td>{message.email}</td>
                                    <td>{message.message}</td>
                                    <td>{message.date}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </section>
            </main>

          
        </div>
    );
};

export default Admin;