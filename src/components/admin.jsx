import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './registerUser';
import './admin.css';

const Admin = () => {
    const [users, setUsers] = useState([]);
    const [cartHistory, setCartHistory] = useState([]);
    const [contactMessages, setContactMessages] = useState([]);
    const [productForm, setProductForm] = useState({
        name: '',
        price: '',
        description: '',
        image: ''
    });
    const [imagePreview, setImagePreview] = useState(null);
    const [products, setProducts] = useState([]);
    const [editIndex, setEditIndex] = useState(null);
    const navigate = useNavigate();
    const { setUser } = useAuth();

    const handleProductFormChange = (e) => {
        const { name, value, files } = e.target;
        if (name === 'image' && files && files[0]) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setProductForm(prev => ({ ...prev, image: reader.result }));
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(files[0]);
        } else {
            setProductForm(prev => ({ ...prev, [name]: value }));
        }
    };

    const handleAddProduct = (e) => {
        e.preventDefault();
        if (!productForm.name || !productForm.price || !productForm.description || !productForm.image) {
            alert('Por favor, completa todos los campos.');
            return;
        }
        const pricePesos = Math.round(parseFloat(productForm.price));
        const newProducts = [...products, { ...productForm, price: pricePesos }];
        setProducts(newProducts);
        localStorage.setItem('products', JSON.stringify(newProducts));
        alert('Producto agregado correctamente.');
        setProductForm({ name: '', price: '', description: '', image: '' });
        setImagePreview(null);
    };

    useEffect(() => {
        let stored = JSON.parse(localStorage.getItem('products')) || [];
        
        let migrated = false;
        stored = stored.map(p => {
            if (p && typeof p.price === 'number' && p.price > 100000 && p.price % 100 === 0) {
                migrated = true;
                return { ...p, price: Math.round(p.price / 100) };
            }
            return p;
        });
        if (migrated) {
            localStorage.setItem('products', JSON.stringify(stored));
        }
        setProducts(stored);
    }, []);

    const handleDeleteProduct = (idx) => {
        if (window.confirm('¿Seguro que quieres eliminar este producto?')) {
            const newProducts = products.filter((_, i) => i !== idx);
            setProducts(newProducts);
            localStorage.setItem('products', JSON.stringify(newProducts));
        }
    };

    const handleEditProduct = (idx) => {
        setEditIndex(idx);
        const p = products[idx];
        setProductForm({ ...p, price: p.price ? String(p.price) : '' });
        setImagePreview(p.image);
    };

    const handleSaveEdit = (e) => {
        e.preventDefault();
        if (!productForm.name || !productForm.price || !productForm.description || !productForm.image) {
            alert('Por favor, completa todos los campos.');
            return;
        }
        const pricePesos = Math.round(parseFloat(productForm.price));
        const newProducts = products.map((p, i) => i === editIndex ? { ...productForm, price: pricePesos } : p);
        setProducts(newProducts);
        localStorage.setItem('products', JSON.stringify(newProducts));
        setEditIndex(null);
        setProductForm({ name: '', price: '', description: '', image: '' });
        setImagePreview(null);
    };

    const handleCancelEdit = () => {
        setEditIndex(null);
        setProductForm({ name: '', price: '', description: '', image: '' });
        setImagePreview(null);
    };

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
            price: item.price,
            quantity: item.quantity || 1
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
        setUser(null);
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
                {/* Sección para agregar/editar productos nuevos */}
                <section className="admin-section">
                    <h2>{editIndex !== null ? 'Editar Producto' : 'Agregar Nuevo Producto'}</h2>
                    <form className="admin-product-form" onSubmit={editIndex !== null ? handleSaveEdit : handleAddProduct}>
                        <div className="form-grid">
                            <div className="form-left">
                                <div className="form-group">
                                    <label>Nombre</label>
                                    <input type="text" name="name" value={productForm.name} onChange={handleProductFormChange} required />
                                </div>
                                <div className="form-group">
                                    <label>Precio</label>
                                    <input type="number" name="price" value={productForm.price} onChange={handleProductFormChange} required min="0" step="0.01" />
                                </div>
                                <div className="form-group">
                                    <label>Descripción</label>
                                    <textarea name="description" value={productForm.description} onChange={handleProductFormChange} required />
                                </div>
                                <div className="form-actions" style={{ marginTop: '0.5rem' }}>
                                    {editIndex !== null ? (
                                        <>
                                            <button type="submit" className="btn">Guardar Cambios</button>
                                            <button type="button" className="admin-button delete" onClick={handleCancelEdit}>Cancelar</button>
                                        </>
                                    ) : (
                                        <button type="submit" className="btn">Agregar Producto</button>
                                    )}
                                </div>
                            </div>
                            <div className="form-right">
                                <div className="form-group">
                                    <label>Imagen</label>
                                    <input type="file" name="image" accept="image/*" onChange={handleProductFormChange} required={editIndex === null} />
                                </div>
                                <div className="image-preview" style={{ marginTop: '10px' }}>
                                    {imagePreview ? (
                                        <img src={imagePreview} alt="Vista previa" style={{ width: '100%', borderRadius: '8px', boxShadow: 'var(--box-shadow)' }} />
                                    ) : (
                                        <div className="empty-preview">Vista previa de la imagen</div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </form>
                    <h3>Productos Agregados</h3>
                    <table className="admin-table">
                        <thead>
                            <tr>
                                <th>Imagen</th>
                                <th>Nombre</th>
                                <th>Precio</th>
                                <th>Descripción</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.length === 0 ? (
                                <tr><td colSpan="5">No hay productos agregados.</td></tr>
                            ) : (
                                products.map((product, idx) => (
                                    <tr key={idx}>
                                        <td><img src={product.image} alt={product.name} style={{ maxWidth: '60px' }} /></td>
                                        <td>{product.name}</td>
                                        <td>${Number(product.price).toLocaleString('es-CL')}</td>
                                        <td>{product.description}</td>
                                        <td>
                                            <button className="admin-button" onClick={() => handleEditProduct(idx)}>Editar</button>
                                            <button className="admin-button delete" onClick={() => handleDeleteProduct(idx)}>Eliminar</button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </section>
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