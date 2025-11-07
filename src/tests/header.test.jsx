import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { BrowserRouter } from 'react-router-dom';

import Header from '../components/Header';

// =========================================================
// 1. MOCKING: Preparación del Entorno
// =========================================================

const mockNavigate = vi.fn();
vi.mock('react-router-dom', async (importOriginal) => {
  const actual = await importOriginal();
  return { ...actual, useNavigate: () => mockNavigate };
});

let mockUser = null;
const mockSetUser = vi.fn();

vi.mock('../components/registerUser', () => ({
  useAuth: () => ({
    user: mockUser,
    setUser: mockSetUser
  }),
  AuthProvider: ({ children }) => <div>{children}</div>,
}));

const renderWithAuth = (userValue) => {
  mockUser = userValue;

  return render(
    <BrowserRouter>
      <Header />
    </BrowserRouter>
  );
};


describe('Componente Header - Renderizado Condicional y Logout', () => {

  beforeEach(() => {
    vi.clearAllMocks();
    mockUser = null;
  });

  // =========================================================
  // TEST 1: Usuario NO AUTENTICADO (user es null)
  // =========================================================
  
  it('debe mostrar Iniciar Sesión y Registro cuando el usuario NO está autenticado', () => {
    renderWithAuth(null);
    
    expect(screen.getByText(/Iniciar sesion/i)).toBeInTheDocument();
    expect(screen.getByText(/Registro/i)).toBeInTheDocument();
    
    expect(screen.queryByText(/Carrito/i)).not.toBeInTheDocument();
    expect(screen.queryByRole('button', { name: /Cerrar Sesión/i })).not.toBeInTheDocument();
  });

  // =========================================================
  // TEST 2: Usuario AUTENTICADO (user existe)
  // =========================================================

  it('debe mostrar Carrito y Cerrar Sesión cuando el usuario SÍ está autenticado', () => {
    const dummyUser = { email: 'test@gmail.com', password: '123' };
    renderWithAuth(dummyUser);
    
    expect(screen.getByText(/Carrito/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Cerrar Sesión/i })).toBeInTheDocument();
    
    expect(screen.queryByText(/Iniciar sesion/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/Registro/i)).not.toBeInTheDocument();
  });

  // =========================================================
  // TEST 3: Interacción de Cerrar Sesión (Logout)
  // =========================================================
  
  it('debe llamar a setUser(null) y navegar a "/" al hacer clic en Cerrar Sesión', () => {
    const dummyUser = { email: 'test@gmail.com', password: '123' };
    renderWithAuth(dummyUser);
    
    const logoutButton = screen.getByRole('button', { name: /Cerrar Sesión/i });
    fireEvent.click(logoutButton);
    
    expect(mockSetUser).toHaveBeenCalledWith(null);
    
    expect(mockNavigate).toHaveBeenCalledWith('/');
  });
});