import React, { useEffect, useState } from 'react';

const api = {
  getOrders: async () => {
    const res = await fetch('http://localhost:5000/orders');
    if (!res.ok) throw new Error('Failed to fetch orders');
    return res.json();
  },
  updateOrderStatus: async (id, status) => {
    const res = await fetch(`http://localhost:5000/orders/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status }),
    });
    if (!res.ok) throw new Error('Failed to update order status');
    return res.json();
  },
};

function OrderList() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchOrders = () => {
    setLoading(true);
    api.getOrders()
      .then(setOrders)
      .catch(e => setError(e.message))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleUpdateStatus = (id, status) => {
    api.updateOrderStatus(id, status)
      .then(() => {
        // Refresh the list after update
        fetchOrders();
      })
      .catch(e => {
        alert(`Алдаа: ${e.message}`);
      });
  };

  const getStatusClass = (status) => {
    switch (status) {
      case 'approved': return 'bg-green-100 text-green-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-yellow-100 text-yellow-800';
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Захиалгын жагсаалт</h1>
      {loading && <p>Уншиж байна...</p>}
      {error && <p className="text-red-500">{error}</p>}
      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="min-w-full">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="p-3 text-sm font-semibold tracking-wide text-left">Огноо</th>
              <th className="p-3 text-sm font-semibold tracking-wide text-left">Захиалагч</th>
              <th className="p-3 text-sm font-semibold tracking-wide text-left">Утас</th>
              <th className="p-3 text-sm font-semibold tracking-wide text-left">Төрөл</th>
              <th className="p-3 text-sm font-semibold tracking-wide text-left">Нийт үнэ</th>
              <th className="p-3 text-sm font-semibold tracking-wide text-left">Статус</th>
              <th className="p-3 text-sm font-semibold tracking-wide text-left">Үйлдэл</th>
            </tr>
          </thead>
          <tbody>
            {orders.map(order => (
              <tr key={order._id} className="border-b hover:bg-gray-50">
                <td className="p-3 text-sm text-gray-700">{new Date(order.createdAt).toLocaleDateString()}</td>
                <td className="p-3 text-sm text-gray-700">{order.name}</td>
                <td className="p-3 text-sm text-gray-700">{order.phone}</td>
                <td className="p-3 text-sm text-gray-700">{order.itemType === 'fence' ? 'Хашаа' : 'Хаалга'}</td>
                <td className="p-3 text-sm text-gray-700">{order.totalPrice?.toLocaleString()}₮</td>
                <td className="p-3 text-sm">
                  <span className={`p-1.5 text-xs font-medium uppercase tracking-wider rounded-lg ${getStatusClass(order.status)}`}>
                    {order.status}
                  </span>
                </td>
                <td className="p-3 text-sm text-gray-700">
                  {order.status === 'pending' && (
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleUpdateStatus(order._id, 'approved')}
                        className="bg-green-500 hover:bg-green-600 text-white px-2 py-1 rounded"
                      >
                        Батлах
                      </button>
                      <button
                        onClick={() => handleUpdateStatus(order._id, 'rejected')}
                        className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded"
                      >
                        Цуцлах
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default OrderList; 