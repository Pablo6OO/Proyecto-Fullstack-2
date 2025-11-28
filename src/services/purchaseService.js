const BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api';
const PURCHASES_URL = `${BASE}/purchases`;

async function handleResponse(res) {
  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || res.statusText);
  }
  return res.json();
}

const PurchaseService = {
  getAll: async () => {
    const res = await fetch(PURCHASES_URL);
    return handleResponse(res);
  },
  create: async (p) => {
    const res = await fetch(PURCHASES_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(p),
    });
    return handleResponse(res);
  }
};

export default PurchaseService;
