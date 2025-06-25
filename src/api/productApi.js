const BASE_URL = 'http://localhost:5000';

const api = {
  getFences: async () => {
    const res = await fetch(`${BASE_URL}/fences`);
    if (!res.ok) throw new Error('Failed to fetch fences');
    return res.json();
  },
  getGates: async () => {
    const res = await fetch(`${BASE_URL}/gates`);
    if (!res.ok) throw new Error('Failed to fetch gates');
    return res.json();
  },
  saveProduct: async (productData) => {
    const { _id, productType, ...data } = productData;
    const url = _id ? `${BASE_URL}/products/${_id}` : `${BASE_URL}/products`;
    const method = _id ? 'PATCH' : 'POST';

    const res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ productType: productType === 'Хашаа' ? 'fence' : 'gate', ...data }),
    });

    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.message || 'Failed to save product');
    }
    return res.json();
  },
  deleteProduct: async (id, productType) => {
    const res = await fetch(`${BASE_URL}/products/${id}?productType=${productType}`, { method: 'DELETE' });
    if (!res.ok) {
        const errorData = await res.json().catch(() => ({ message: 'Failed to delete product' }));
        throw new Error(errorData.message);
    }
    return res.json();
  }
};

export default api; 