import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { BrowserRouter } from 'react-router-dom';

import Registro from '../components/registro';
import { AuthProvider } from '../components/registerUser';

// =========================================================
// 1. MOCKING: Preparación del Entorno
// =========================================================

const mockNavigate = vi.fn();
vi.mock('react-router-dom', async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});
window.alert = vi.fn();
const mockSetUser = vi.fn();
vi.mock('../components/registerUser', async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    useAuth: () => ({ setUser: mockSetUser }),
    AuthProvider: actual.AuthProvider,
  };
});

const RegistroWrapper = () => (
  <BrowserRouter>
    <AuthProvider>
      <Registro />
    </AuthProvider>
  </BrowserRouter>
);

describe('Componente Registro - Validaciones y Lógica', () => {

  beforeEach(() => {
    vi.clearAllMocks();
  });

  // =========================================================
  // TEST 1: Validación de Contraseñas (Error)
  // =========================================================

  it('debe mostrar error si las contraseñas no coinciden y no debe intentar registrar', async () => {
    render(<RegistroWrapper />);
    
    fireEvent.change(screen.getByLabelText(/Correo Electrónico/i), { target: { value: 'test@gmail.com' } });
    fireEvent.change(screen.getByLabelText('Contraseña'), { target: { value: 'pass1' } });
    fireEvent.change(screen.getByLabelText(/Confirmar Contraseña/i), { target: { value: 'pass2' } });
    
    fireEvent.click(screen.getByRole('button', { name: /Registrarse/i }));

    const errorContraseña = await screen.findByText(/La contraseña debe ser igual en los dos campos/i);
    expect(errorContraseña).toBeInTheDocument();
    
    expect(mockNavigate).not.toHaveBeenCalled();
    expect(mockSetUser).not.toHaveBeenCalled();
  });

  // =========================================================
  // TEST 2: Validación de Correo (Error)
  // =========================================================

  it('debe mostrar error si el correo es inválido y no debe intentar registrar', async () => {
    render(<RegistroWrapper />);
    
    fireEvent.change(screen.getByLabelText(/Correo Electrónico/i), { target: { value: 'test@hotmail.com' } });
    fireEvent.change(screen.getByLabelText('Contraseña'), { target: { value: 'password123' } });
    fireEvent.change(screen.getByLabelText(/Confirmar Contraseña/i), { target: { value: 'password123' } });
    
    fireEvent.click(screen.getByRole('button', { name: /Registrarse/i }));

    const errorCorreo = await screen.findByText(/Correo invalido, ingrese correo con '@gmail.com'/i);
    expect(errorCorreo).toBeInTheDocument();
    
    expect(mockNavigate).not.toHaveBeenCalled();
    expect(mockSetUser).not.toHaveBeenCalled();
  });
  
  // =========================================================
  // TEST 3: Registro Exitoso (Éxito)
  // =========================================================
  
  it('debe llamar a setUser y navegar a la página principal si la validación es exitosa', async () => {
    render(<RegistroWrapper />);
    
    const email = 'test@gmail.com';
    const password = 'password123';

    fireEvent.change(screen.getByLabelText(/Correo Electrónico/i), { target: { value: email } });
    fireEvent.change(screen.getByLabelText('Contraseña'), { target: { value: password } });
    fireEvent.change(screen.getByLabelText(/Confirmar Contraseña/i), { target: { value: password } });

    fireEvent.click(screen.getByRole('button', { name: /Registrarse/i }));

    expect(window.alert).toHaveBeenCalledWith('¡Registrado correctamente!');
    
    expect(mockSetUser).toHaveBeenCalledWith({ email, password });
    
    expect(mockNavigate).toHaveBeenCalledWith('/');
    
    expect(screen.queryByText(/La contraseña debe ser igual/i)).not.toBeInTheDocument();
  });
});