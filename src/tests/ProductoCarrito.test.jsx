import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';

import ProductoCarrito from '../components/ProductoCarrito';

// =========================================================
// 1. MOCKING: Preparación del Entorno
// =========================================================

const mockRemoveItem = vi.fn();

vi.mock('../context/CartProvider', () => ({
  useCart: () => ({ removeItem: mockRemoveItem }),
}));

describe('Componente ProductoCarrito - Cálculo y Eliminación', () => {

  beforeEach(() => {
    vi.clearAllMocks();
  });

  const mockItem = {
    id: 5,
    name: "Taza de pato",
    price: 5000,
    priceFormatted: "$5.000",
    quantity: 3,
    image: "pato.jpg"
  };

  // =========================================================
  // TEST 1: Cálculo y Renderizado Correcto
  // =========================================================

  it('debe calcular y mostrar el subtotal correctamente', () => {
    render(<ProductoCarrito item={mockItem} />);
    
    expect(screen.getByText(mockItem.name)).toBeInTheDocument();
    expect(screen.getByText(`Cantidad: ${mockItem.quantity}`)).toBeInTheDocument();

    expect(screen.getByText(/Subtotal:/i).textContent).toContain('15.000');
  });

  // =========================================================
  // TEST 2: Interacción de Eliminar
  // =========================================================

  it('debe llamar a removeItem con el ID correcto al hacer clic en "Eliminar"', () => {
    render(<ProductoCarrito item={mockItem} />);
    
    const removeButton = screen.getByRole('button', { name: /Eliminar/i });
    fireEvent.click(removeButton);
    
    expect(mockRemoveItem).toHaveBeenCalledWith(mockItem.id);
  });
});