const BASE = import.meta.env.VITE_API_BASE_URL || 'http://ec2-52-206-191-212.compute-1.amazonaws.com:8080/api';
const PRODUCTS_URL = `${BASE}/products`;

async function handleResponse(res) {
  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || res.statusText);
  }
  return res.json();
}

const ProductService = {
  getAll: async () => {
    const res = await fetch(PRODUCTS_URL);
    return handleResponse(res);
  },
  getById: async (id) => {
    const res = await fetch(`${PRODUCTS_URL}/${id}`);
    return handleResponse(res);
  },
  create: async (product) => {
    const res = await fetch(PRODUCTS_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(product),
    });
    return handleResponse(res);
  }
  ,
  delete: async (id) => {
    const res = await fetch(`${PRODUCTS_URL}/${id}`, { method: 'DELETE' });
    if (!res.ok) {
      const text = await res.text();
      throw new Error(text || res.statusText);
    }
    return;
  }
  ,
  update: async (id, product) => {
    const res = await fetch(`${PRODUCTS_URL}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(product),
    });
    return handleResponse(res);
  }
};

export default ProductService;
