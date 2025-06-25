import React, { useState } from 'react';
import OrderList from '../components/OrderList';
import ProductManager from '../components/ProductManager';

function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('orders');

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Админ Хуудас
          </h1>
        </div>
      </header>
      <div className="max-w-7xl mx-auto pt-6">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8 px-4 sm:px-6 lg:px-8" aria-label="Tabs">
            <button
              onClick={() => setActiveTab('orders')}
              className={`
                ${activeTab === 'orders'
                  ? 'border-green-500 text-green-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`
              }
            >
              Захиалгууд
            </button>
            <button
              onClick={() => setActiveTab('products')}
              className={`
                ${activeTab === 'products'
                  ? 'border-green-500 text-green-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`
              }
            >
              Бүтээгдэхүүн
            </button>
          </nav>
        </div>
      </div>
      <main>
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          {activeTab === 'orders' && <OrderList />}
          {activeTab === 'products' && <ProductManager />}
        </div>
      </main>
    </div>
  );
}

export default AdminDashboard; 