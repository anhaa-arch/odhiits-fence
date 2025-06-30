import React, { useEffect, useState } from 'react';
import API_URL from '../api/config';

const OrderList = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/orders`);
      const data = await res.json();
      setOrders(data);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleUpdateStatus = async (id, status) => {
    try {
      const res = await fetch(`${API_URL}/orders/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      });
      if (res.ok) {
        // Refresh the list after update
        await fetchOrders();
      } else {
        throw new Error('Алдаа: Өгөгдлийн ачааллаа');
      }
    } catch (e) {
      alert(`Алдаа: ${e.message}`);
    }
  };

  const getStatusClass = (status) => {
    switch (status) {
      case 'approved': return 'bg-green-100 text-green-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-yellow-100 text-yellow-800';
    }
  };

  // Modal for order details
  const OrderDetailModal = ({ order, onClose }) => {
    if (!order) return null;
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" onClick={onClose}>
        <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-lg relative" onClick={e => e.stopPropagation()}>
          <button className="absolute top-2 right-3 text-2xl text-gray-500 hover:text-gray-800" onClick={onClose}>&times;</button>
          <h2 className="text-xl font-bold mb-4">Захиалгын дэлгэрэнгүй</h2>
          <div className="space-y-2 text-sm">
            <div><b>Огноо:</b> {new Date(order.createdAt).toLocaleString()}</div>
            <div><b>Нэр:</b> {order.name}</div>
            <div><b>Утас:</b> {order.phone}</div>
            <div><b>Төрөл:</b> {order.itemType === 'fence' ? 'Хашаа' : 'Хаалга'}</div>
            <div><b>Суулгалт:</b> {order.install === 'yes' ? 'Суулгалттай' : 'Суулгалтгүй'}</div>
            {order.itemType === 'fence' && (
              <>
                <div><b>Газрын урт:</b> {order.length} м</div>
                <div><b>Газрын өргөн:</b> {order.width} м</div>
                <div><b>Периметр:</b> {order.perimeter} м</div>
              </>
            )}
            {order.itemType === 'gate' && (
              <div><b>Хаалганы урт:</b> {order.gateLength} м</div>
            )}
            <div><b>Өндөр:</b> {order.height} м</div>
            <div><b>Нийт м²:</b> {order.totalSqm}</div>
            <div><b>1 м² үнэ:</b> {order.unitPrice?.toLocaleString()}₮</div>
            <div><b>Нийт үнэ:</b> <span className="font-bold text-green-700">{order.totalPrice?.toLocaleString()}₮</span></div>
            <div><b>Тайлбар:</b> {order.comment || '-'}</div>
            <div><b>Статус:</b> <span className={`p-1.5 text-xs font-medium uppercase tracking-wider rounded-lg ${getStatusClass(order.status)}`}>{order.status}</span></div>
          </div>
        </div>
      </div>
    );
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
                  <span className={`p-1.5 text-xs font-medium uppercase tracking-wider rounded-lg ${getStatusClass(order.status)}`}>{order.status}</span>
                </td>
                <td className="p-3 text-sm text-gray-700">
                  <div className="flex gap-2">
                    <button
                      onClick={() => setSelectedOrder(order)}
                      className="bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 rounded"
                    >
                      Дэлгэрэнгүй
                    </button>
                    {order.status === 'pending' && (
                      <>
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
                      </>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {selectedOrder && <OrderDetailModal order={selectedOrder} onClose={() => setSelectedOrder(null)} />}
    </div>
  );
}

export default OrderList; 