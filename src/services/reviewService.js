const BASE = import.meta.env.VITE_API_BASE_URL || 'http://ec2-52-206-191-212.compute-1.amazonaws.com:8080/api';
const REVIEWS_URL = `${BASE}/reviews`;

async function handleResponse(res) {
  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || res.statusText);
  }
  return res.json();
}

const ReviewService = {
  getAll: async () => {
    const res = await fetch(REVIEWS_URL);
    return handleResponse(res);
  },
  create: async (r) => {
    const res = await fetch(REVIEWS_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(r),
    });
    return handleResponse(res);
  }
};

export default ReviewService;
