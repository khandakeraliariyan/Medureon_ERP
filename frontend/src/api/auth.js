const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api/v1';

async function request(path, options = {}) {
  const res = await fetch(`${API_BASE}${path}`, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  });

  const data = await res.json().catch(() => ({}));

  if (!res.ok || data.success === false) {
    throw new Error(data.message || 'Something went wrong. Please try again.');
  }

  return data;
}

export function registerAccount({ name, email, password, role }) {
  return request('/auth/register', {
    method: 'POST',
    body: JSON.stringify({ name, email, password, role }),
  });
}

export function login({ email, password }) {
  return request('/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  });
}
