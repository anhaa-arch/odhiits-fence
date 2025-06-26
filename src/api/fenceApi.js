// Fence API functions

const API_BASE = process.env.REACT_APP_API_URL || 'http://localhost:5000';

export async function getFences() {
  const res = await fetch(`${API_BASE}/fences`);
  if (!res.ok) throw new Error('Failed to fetch fences');
  return res.json();
}

export async function getGates() {
  const res = await fetch('http://localhost:5000/gates');
  if (!res.ok) throw new Error('Failed to fetch gates');
  return res.json();
}

// Example: export async function getFences() {} 