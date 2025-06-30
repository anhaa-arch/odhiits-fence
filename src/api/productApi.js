import API_URL from './config';

const api = {
  getProducts: async () => {
    try {
      // Since we don't know the type, we might need to fetch both or have a generic endpoint
      // This is a placeholder for a more robust implementation
      const fencesRes = await fetch(`${API_URL}/fences`);
      const gatesRes = await fetch(`${API_URL}/gates`);
      if (!fencesRes.ok || !gatesRes.ok) {
        throw new Error('Нэг эсвэл түүнээс дээш бүтээгдэхүүнийг татахад алдаа гарлаа');
      }
      const fences = await fencesRes.json();
      const gates = await gatesRes.json();
      return [...fences, ...gates];
    } catch (error) {
      console.error('Бүтээгдэхүүн татахад алдаа гарлаа:', error);
      throw error;
    }
  },

  createProduct: async (productData) => {
    try {
      const res = await fetch(`${API_URL}/products`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(productData),
      });
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || 'Бүтээгдэхүүн үүсгэхэд алдаа гарлаа');
      }
      return await res.json();
    } catch (error) {
      console.error('Бүтээгдэхүүн үүсгэхэд алдаа гарлаа:', error);
      throw error;
    }
  },

  updateProduct: async (id, productData) => {
    try {
      const res = await fetch(`${API_URL}/products/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(productData),
      });
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || 'Бүтээгдэхүүн засахад алдаа гарлаа');
      }
      return await res.json();
    } catch (error) {
      console.error('Бүтээгдэхүүн засахад алдаа гарлаа:', error);
      throw error;
    }
  },

  deleteProduct: async (id, productType) => {
    try {
      const res = await fetch(`${API_URL}/products/${id}?productType=${productType}`, {
        method: 'DELETE',
      });
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || 'Бүтээгдэхүүн устгахад алдаа гарлаа');
      }
      return await res.json();
    } catch (error) {
      console.error('Бүтээгдэхүүн устгахад алдаа гарлаа:', error);
      throw error;
    }
  },
  
  uploadImage: async (formData) => {
    try {
      const res = await fetch(`${API_URL}/upload`, {
        method: 'POST',
        body: formData,
      });
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || 'Зураг хуулахад алдаа гарлаа');
      }
      return await res.json();
    } catch (error) {
      console.error('Зураг хуулахад алдаа гарлаа:', error);
      throw error;
    }
  },
};

export default api; 