// Fence API functions

import API_BASE from './config';

export const fetchFences = async () => {
  try {
    const res = await fetch(`${API_BASE}/fences`);
    if (!res.ok) throw new Error('Network response was not ok');
    return await res.json();
  } catch (error) {
    console.error("Failed to fetch fences:", error);
    throw error;
  }
};

export const fetchGates = async () => {
  try {
    const res = await fetch(`${API_BASE}/gates`);
    if (!res.ok) throw new Error('Network response was not ok');
    return await res.json();
  } catch (error) {
    console.error("Failed to fetch gates:", error);
    throw error;
  }
};

// Example: export async function getFences() {} 