// Fence card component

import React from 'react';
import { Link } from 'react-router-dom';

function FenceCard({ product }) {
  // Ensure product is not null or undefined
  if (!product || !product._id) {
    return (
      <div className="h-full bg-white rounded-lg shadow-md p-4 flex items-center justify-center">
        <p className="text-red-500">Бүтээгдэхүүний мэдээлэл алга байна.</p>
      </div>
    );
  }

  const { _id, name, image, price, productType } = product;
  
  // Validate productType and construct the link
  const isValidType = productType === 'fence' || productType === 'gate';
  const linkTo = isValidType ? `/${productType}s/${_id}` : '/';

  return (
    <div className="h-full bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden flex flex-col">
   <Link to={linkTo} className="block group">
  <div className="h-[300px] w-full overflow-hidden">
    <img 
      src={image || '/images/fence1.jpg'} 
      alt={name} 
      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" 
    />
  </div>
</Link>

      <div className="p-4 flex flex-col flex-grow">
        <h3 className="text-lg font-semibold text-gray-800 mb-2 truncate">
          <Link to={linkTo} className="hover:text-green-600 transition-colors">
            {name || 'Нэргүй бүтээгдэхүүн'}
          </Link>
        </h3>
        {price && (
          <p className="text-xl font-bold text-green-600 mb-4">
            {`${price.toLocaleString()}₮`}
          </p>
        )}
        <div className="mt-auto grid grid-cols-2 gap-2">
          <Link 
            to={isValidType ? `/order?type=${productType}&id=${_id}` : '/order'}
            className="text-center bg-green-600 text-white font-semibold py-2 px-3 rounded-lg hover:bg-green-700 transition-all duration-300 text-sm"
          >
            Худалдан авах
          </Link>
          <Link 
            to={linkTo} 
            className="text-center bg-gray-100 text-gray-800 hover:bg-gray-200 font-semibold py-2 px-3 rounded-lg transition-all duration-300 text-sm"
          >
            Дэлгэрэнгүй
          </Link>
        </div>
      </div>
    </div>
  );
}

export default FenceCard; 