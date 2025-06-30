import React, { useEffect, useState } from 'react';
import api from '../api/productApi';
import API_URL from '../api/config';

const ProductForm = ({ product, onSave, onCancel }) => {
  const [formData, setFormData] = useState(() => {
    const isEditing = !!product;
    
    const data = isEditing ? { ...product } : {};

    data.productType = (data.productType === 'gate' || data.productType === 'Хаалга') ? 'Хаалга' : 'Хашаа';
    
    data.name = data.name || (data.productType === 'Хаалга' ? data.type : '') || '';
    data.prices = { no_installation: '', with_installation: '', ...data.prices };
    data.image = data.image || '';
    data.description = data.description || '';

    if (data.productType === 'Хашаа') {
        data.materials = {
            savx: { size: '', thickness: '', ...(data.materials?.savx || {}) },
            dai: { size: '', thickness: '', ...(data.materials?.dai || {}) },
            shon: { size: '', thickness: '', ...(data.materials?.shon || {}) },
        };
    } else {
        delete data.materials;
    }

    return data;
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'productType') {
      setFormData(prev => {
        const newState = { ...prev, productType: value };
        if (value === 'Хашаа') {
          newState.materials = {
            savx: { size: '', thickness: '' },
            dai: { size: '', thickness: '' },
            shon: { size: '', thickness: '' },
          };
        } else {
          delete newState.materials;
        }
        return newState;
      });
      return;
    }

    if (name.includes('.')) {
      const parts = name.split('.');
      if (parts.length === 3) {
        setFormData((prev) => ({
          ...prev,
          [parts[0]]: {
            ...prev[parts[0]],
            [parts[1]]: {
              ...prev[parts[0]]?.[parts[1]],
              [parts[2]]: value,
            },
          },
        }));
      } else if (parts.length === 2) {
        setFormData((prev) => ({
          ...prev,
          [parts[0]]: {
            ...prev[parts[0]],
            [parts[1]]: value,
          },
        }));
      }
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-lg max-h-screen overflow-y-auto">
        <h2 className="text-xl font-bold mb-4">{product ? 'Бүтээгдэхүүн засах' : 'Шинэ бүтээгдэхүүн'}</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="mb-2">
            <label className="font-medium">Төрөл</label>
            <select name="productType" value={formData.productType} onChange={handleChange} className="w-full border rounded p-2 mt-1">
              <option value="Хашаа">Хашаа</option>
              <option value="Хаалга">Хаалга</option>
            </select>
          </div>
          <div className="mb-2">
            <label className="font-medium">Нэр</label>
            <input type="text" name="name" placeholder="Нэр" value={formData.name || ''} onChange={handleChange} className="w-full border rounded p-2 mt-1" required />
          </div>
          {/* Price Inputs */}
          <div className="mb-2 grid grid-cols-2 gap-4">
            <div>
              <label className="font-medium">Үнэ (суулгалтгүй)</label>
              <input type="number" name="prices.no_installation" placeholder="Үнэ (суулгалтгүй)" value={formData.prices?.no_installation || ''} onChange={handleChange} className="w-full border rounded p-2 mt-1" />
            </div>
            <div>
              <label className="font-medium">Үнэ (суулгалттай)</label>
              <input type="number" name="prices.with_installation" placeholder="Үнэ (суулгалттай)" value={formData.prices?.with_installation || ''} onChange={handleChange} className="w-full border rounded p-2 mt-1" />
            </div>
          </div>
          {/* Material Inputs for fence only */}
          {formData.productType === 'Хашаа' && (
            <div className="mb-2 p-3 bg-gray-50 rounded border">
              <div className="font-semibold mb-2">Материалын үзүүлэлт</div>
              {['savx', 'dai', 'shon'].map((key) => (
                <div key={key} className="flex gap-2 items-center mb-2">
                  <span className="w-16">{key === 'savx' ? 'Савх' : key === 'dai' ? 'Дай' : 'Шон'}</span>
                  <input
                    type="text"
                    name={`materials.${key}.size`}
                    placeholder="Хэмжээ (ж: 15x15)"
                    value={formData.materials?.[key]?.size ?? ''}
                    onChange={handleChange}
                    className="border rounded p-2 flex-1"
                  />
                  <input
                    type="number"
                    name={`materials.${key}.thickness`}
                    placeholder="Зузаан (мм)"
                    value={formData.materials?.[key]?.thickness ?? ''}
                    onChange={handleChange}
                    className="border rounded p-2 w-28"
                  />
                </div>
              ))}
            </div>
          )}
          {/* Material Inputs for gate only */}
          {formData.productType === 'Хаалга' && formData.materials && (
            <div className="mb-2 p-3 bg-gray-50 rounded border">
              <div className="font-semibold mb-2">Материалын үзүүлэлт</div>
              {['frame', 'panel', 'support'].filter(key => formData.materials[key]).map((key) => (
                <div key={key} className="flex gap-2 items-center mb-2">
                  <span className="w-16">{key === 'frame' ? 'Хүрээ' : key === 'panel' ? 'Самбар' : 'Багана'}</span>
                  <input
                    type="text"
                    name={`materials.${key}.size`}
                    placeholder="Хэмжээ (ж: 40x40)"
                    value={formData.materials?.[key]?.size ?? ''}
                    onChange={handleChange}
                    className="border rounded p-2 flex-1"
                  />
                  <input
                    type="number"
                    name={`materials.${key}.thickness`}
                    placeholder="Зузаан (мм)"
                    value={formData.materials?.[key]?.thickness ?? ''}
                    onChange={handleChange}
                    className="border rounded p-2 w-28"
                  />
                </div>
              ))}
            </div>
          )}
          {/* Colors input for both types if colors exist */}
          {Array.isArray(formData.colors) && (
            <div className="mb-2 p-3 bg-gray-50 rounded border">
              <div className="font-semibold mb-2">Өнгө</div>
              {formData.colors.map((color, idx) => (
                <div key={idx} className="flex items-center gap-2 mb-1">
                  <input
                    type="text"
                    value={color}
                    onChange={e => {
                      const newColors = [...formData.colors];
                      newColors[idx] = e.target.value;
                      setFormData(prev => ({ ...prev, colors: newColors }));
                    }}
                    className="border rounded p-2 flex-1"
                    placeholder="Өнгөний код эсвэл нэр"
                  />
                  <button type="button" onClick={() => {
                    const newColors = formData.colors.filter((_, i) => i !== idx);
                    setFormData(prev => ({ ...prev, colors: newColors }));
                  }} className="text-red-500 hover:text-red-700">Устгах</button>
                </div>
              ))}
              <button type="button" onClick={() => setFormData(prev => ({ ...prev, colors: [...(prev.colors || []), ''] }))} className="mt-1 bg-green-100 hover:bg-green-200 text-green-800 font-semibold py-1 px-3 rounded">+ Өнгө нэмэх</button>
            </div>
          )}
          <div className="mb-2">
            <label className="font-medium">Зураг</label>
            <input type="file" accept="image/*" onChange={async (e) => {
              const file = e.target.files[0];
              if (!file) return;
              const formData = new FormData();
              formData.append('image', file);
              try {
                const res = await fetch(`${API_URL}/upload`, {
                  method: 'POST',
                  body: formData,
                });
                const data = await res.json();
                if (data.filename) {
                  setFormData(prev => ({ ...prev, image: data.filename }));
                } else {
                  alert('Зураг upload хийхэд алдаа гарлаа');
                }
              } catch (err) {
                alert('Сервертэй холбогдож чадсангүй');
              }
            }} className="w-full border rounded p-2 mt-1" />
            {formData.image && (
              <img src={"/images/" + formData.image} alt="preview" className="mt-2 max-h-40 rounded" />
            )}
          </div>
          <div className="mb-2">
            <label className="font-medium">Тайлбар</label>
            <textarea name="description" placeholder="Тайлбар" value={formData.description} onChange={handleChange} className="w-full border rounded p-2 mt-1" />
          </div>
          <div className="flex justify-end gap-4 pt-4">
            <button type="button" onClick={onCancel} className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded">Цуцлах</button>
            <button type="submit" className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">Хадгалах</button>
          </div>
        </form>
      </div>
    </div>
  );
};

function ProductManager() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // State for the modal form
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null); // null for new, or product object for editing

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const fences = await api.getFences();
      const gates = await api.getGates();
      const allProducts = [
        ...fences.map(f => ({ ...f, productType: 'fence' })),
        ...gates.map(g => ({ ...g, productType: 'gate' })),
      ];
      setProducts(allProducts);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleAddNew = () => {
    setEditingProduct(null); // Clear any existing editing data
    setIsModalOpen(true);
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setIsModalOpen(true);
  };
  
  const handleSave = async (productData) => {
    try {
      await api.saveProduct(productData);
      setIsModalOpen(false);
      fetchProducts();
    } catch (e) {
      alert(`Алдаа: ${e.message}`);
    }
  };

  const handleDelete = async (id, productType) => {
    if (window.confirm('Энэ бүтээгдэхүүнийг устгахдаа итгэлтэй байна уу?')) {
      try {
        await api.deleteProduct(id, productType);
        fetchProducts();
      } catch (e) {
        alert(`Алдаа: ${e.message}`);
      }
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Бүтээгдэхүүн Удирдах</h1>
        <button onClick={handleAddNew} className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
          + Шинэ бүтээгдэхүүн
        </button>
      </div>

      {isModalOpen && (
        <ProductForm 
          product={editingProduct}
          onSave={handleSave}
          onCancel={() => setIsModalOpen(false)}
        />
      )}

      {loading && <p>Уншиж байна...</p>}
      {error && <p className="text-red-500">{error}</p>}
      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="min-w-full">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="p-3 text-sm font-semibold tracking-wide text-left">Нэр</th>
              <th className="p-3 text-sm font-semibold tracking-wide text-left">Төрөл</th>
              <th className="p-3 text-sm font-semibold tracking-wide text-left">Үнэ (суулгалтгүй / суулгалттай)</th>
              <th className="p-3 text-sm font-semibold tracking-wide text-left">Үйлдэл</th>
            </tr>
          </thead>
          <tbody>
            {products.map(p => (
              <tr key={p._id} className="border-b hover:bg-gray-50">
                <td className="p-3 text-sm text-gray-700">{p.name || p.type}</td>
                <td className="p-3 text-sm text-gray-700">{p.productType === 'fence' ? 'Хашаа' : 'Хаалга'}</td>
                <td className="p-3 text-sm text-gray-700">
                  {p.prices?.no_installation?.toLocaleString()}₮
                  {p.prices?.with_installation ? ` / ${p.prices.with_installation.toLocaleString()}₮` : ''}
                </td>
                <td className="p-3 text-sm">
                  <button onClick={() => handleEdit(p)} className="text-blue-500 hover:text-blue-700 mr-2">Засах</button>
                  <button onClick={() => handleDelete(p._id, p.productType)} className="text-red-500 hover:text-red-700">Устгах</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ProductManager; 