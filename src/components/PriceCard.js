// Price card component

import React from 'react';

function PriceCard({ title, price, features, isSelected = false, onSelect }) {
  return (
    <div
      className={`
        bg-white rounded-lg shadow-lg p-6 cursor-pointer
        ${isSelected ? 'ring-2 ring-green-500 transform scale-105' : ''}
        transition-all duration-300 hover:shadow-xl
      `}
      onClick={onSelect}
    >
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold text-gray-800 mb-4">{title}</h3>
        <div className="text-4xl font-bold text-green-600">{price}</div>
      </div>
      
      <ul className="space-y-4">
        {features.map((feature, index) => (
          <li key={index} className="flex items-center">
            <svg 
              className="w-5 h-5 text-green-500 mr-3" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth="2" 
                d="M5 13l4 4L19 7"
              />
            </svg>
            <span className="text-gray-600">{feature}</span>
          </li>
        ))}
      </ul>
      
      <button 
        className={`
          w-full mt-8 py-3 px-6 rounded-lg font-bold transition duration-300
          ${isSelected
            ? 'bg-green-600 text-white hover:bg-green-500' 
            : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
          }
        `}
        onClick={(e) => {
          e.stopPropagation();
          onSelect?.();
        }}
      >
        {isSelected ? 'Сонгогдсон' : 'Сонгох'}
      </button>
    </div>
  );
}

export default PriceCard; 