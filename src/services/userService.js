const BASE = import.meta.env.VITE_API_BASE_URL || 'http://ec2-52-206-191-212.compute-1.amazonaws.com:8080/api';
const USERS_URL = `${BASE}/users`;

async function handleResponse(res) {
  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || res.statusText);
  }
  return res.json();
}

const UserService = {
  getAll: async () => {
    const res = await fetch(USERS_URL);
    return handleResponse(res);
  },
  getById: async (id) => {
    const res = await fetch(`${USERS_URL}/${id}`);
    return handleResponse(res);
  },
  create: async (user) => {
    const res = await fetch(USERS_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(user),
    });
    return handleResponse(res);
  },
  getLoyaltyPoints: async (id) => {
    const res = await fetch(`${USERS_URL}/${id}/loyalty-points`);
    return handleResponse(res);
  },
  resetLoyaltyPoints: async (id) => {
    const res = await fetch(`${USERS_URL}/${id}/reset-loyalty-points`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    });
    return handleResponse(res);
  }
};

export default UserService;
