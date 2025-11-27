import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { BrowserRouter } from 'react-router-dom';

import Login from '../components/login';
import { AuthProvider } from '../components/registerUser';

// =========================================================
// 1. MOCKING: Preparación del Entorno
// =========================================================

let mockUser = null;
const mockNavigate = vi.fn();
window.alert = vi.fn();

vi.mock('react-router-dom', async (importOriginal) => {
  const actual = await importOriginal();
  return { ...actual, useNavigate: () => mockNavigate };
});

vi.mock('../components/registerUser', () => ({
  useAuth: () => ({
    user: mockUser,
  }),
  AuthProvider: ({ children }) => <div>{children}</div>,
}));

const renderWithAuth = (userValue) => {
  mockUser = userValue;
  return render(
    <BrowserRouter>
      <Login />
    </BrowserRouter>
  );
};

describe('Componente Login - Flujo de Inicio de Sesión', () => {

  beforeEach(() => {
    vi.clearAllMocks();
    mockUser = null;
  });

  // =========================================================
  // TEST 1: Login Exitoso
  // =========================================================

  it('debe mostrar alerta y navegar a "/" si las credenciales coinciden con el usuario en contexto', async () => {
    const registeredUser = { email: 'user@gmail.com', password: 'password123' };
    
    renderWithAuth(registeredUser);
    
    fireEvent.change(screen.getByLabelText(/Correo Electrónico/i), { target: { value: registeredUser.email } });
    fireEvent.change(screen.getByLabelText(/Contraseña/i), { target: { value: registeredUser.password } });

    fireEvent.click(screen.getByRole('button', { name: /Iniciar Sesión/i }));

    expect(window.alert).toHaveBeenCalledWith('Inicio de sesión exitoso!');
    expect(mockNavigate).toHaveBeenCalledWith('/');
    expect(screen.queryByText(/Credenciales inválidas/i)).not.toBeInTheDocument();
  });

  // =========================================================
  // TEST 2: Login Fallido (Credenciales Incorrectas)
  // =========================================================
  
  it('debe mostrar un mensaje de error si las credenciales son incorrectas', async () => {
    const registeredUser = { email: 'user@gmail.com', password: 'password123' };
    
    renderWithAuth(registeredUser);
    
    fireEvent.change(screen.getByLabelText(/Correo Electrónico/i), { target: { value: registeredUser.email } });
    fireEvent.change(screen.getByLabelText(/Contraseña/i), { target: { value: 'pass_incorrecta' } });

    fireEvent.click(screen.getByRole('button', { name: /Iniciar Sesión/i }));

    const errorText = await screen.findByText(/Credenciales inválidas/i);
    expect(errorText).toBeInTheDocument();
    
    expect(window.alert).not.toHaveBeenCalled();
    expect(mockNavigate).not.toHaveBeenCalled();
  });
});