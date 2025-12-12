const BASE = import.meta.env.VITE_API_BASE_URL || 'http://ec2-52-206-191-212.compute-1.amazonaws.com:8080/api';
const CONTACTS_URL = `${BASE}/contactMessages`;

async function handleResponse(res) {
  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || res.statusText);
  }
  return res.json();
}

const ContactService = {
  getAll: async () => {
    const res = await fetch(CONTACTS_URL);
    return handleResponse(res);
  },
  create: async (msg) => {
    const res = await fetch(CONTACTS_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(msg),
    });
    return handleResponse(res);
  }
};

export default ContactService;
