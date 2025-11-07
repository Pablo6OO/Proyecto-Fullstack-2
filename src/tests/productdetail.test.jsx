import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { BrowserRouter } from 'react-router-dom';

import ProductDetail from '../components/productdetail';

// =========================================================
// 1. MOCKING: Preparación del Entorno
// =========================================================

const MOCK_PRODUCT = {
  id: 1,
  name: "Taza de gato negro",
  price: 2990,
  priceFormatted: "$2.990",
  description: "Taza de gato negro",
  image: "taza1.jpg",
  reviewAuthor: "Juan Rodríguez",
  reviewComment: "Buena taza, aunque un poco más pequeña de lo que esperaba. Cumple su función.",
  reviewRating: 4,
};

let mockUser = null; 
const mockAddItem = vi.fn();
vi.mock('react-router-dom', async (importOriginal) => {
  const actual = await importOriginal();
  return { ...actual, useParams: () => ({ id: '1' }) };
});

vi.mock('../components/registerUser', () => ({
  useAuth: () => ({ user: mockUser }),
}));

vi.mock('../context/CartProvider', () => ({
  useCart: () => ({ addItem: mockAddItem }),
}));

vi.mock('../components/ReviewForm', () => ({
    default: () => <div data-testid="review-form-mock">Review Form</div>
}));


const renderWithMocks = (userValue) => {
  mockUser = userValue;
  return render(
    <BrowserRouter>
      <ProductDetail />
    </BrowserRouter>
  );
};

describe('Componente ProductDetail - Autenticación y Carrito', () => {

  beforeEach(() => {
    vi.clearAllMocks();
    mockUser = null;
  });

  // =========================================================
  // TEST 1: Usuario NO AUTENTICADO
  // =========================================================
  
  it('debe mostrar el mensaje de registro y ocultar el botón de añadir si NO hay usuario', () => {
    renderWithMocks(null);
    
    expect(screen.getByRole('heading', { level: 2, name: /Debe registrarse primero/i })).toBeInTheDocument();
    
    expect(screen.queryByRole('button', { name: /Añadir al carrito/i })).not.toBeInTheDocument();
  });

  // =========================================================
  // TEST 2: Usuario AUTENTICADO
  // =========================================================

  it('debe mostrar el botón de añadir y ocultar el mensaje de registro si hay usuario', () => {
    renderWithMocks({ email: 'test@gmail.com' });
    
    const addButton = screen.getByRole('button', { name: /Añadir al carrito/i });
    expect(addButton).toBeInTheDocument();
    
    expect(screen.queryByRole('heading', { level: 2, name: /Debe registrarse primero/i })).not.toBeInTheDocument();
  });

  // =========================================================
  // TEST 3: Interacción de Añadir al Carrito
  // =========================================================

  it('debe llamar a addItem al hacer clic en "Añadir al carrito"', () => {
    renderWithMocks({ email: 'test@gmail.com' });
    
    const addButton = screen.getByRole('button', { name: /Añadir al carrito/i });
    fireEvent.click(addButton);
    
    expect(mockAddItem).toHaveBeenCalledWith(MOCK_PRODUCT, 1);
  });
});