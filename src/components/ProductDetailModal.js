import React from 'react';

const ProductDetailModal = ({ product, onClose }) => {
  if (!product) return null;

  const isFence = product.productType === 'fence' || (product.materials && product.materials.savx);

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50 p-4"
      onClick={onClose}
    >
      <div 
        className="bg-white p-5 sm:p-6 rounded-lg shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-start mb-4">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-800">{product.name || product.type}</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-800 text-3xl leading-none">&times;</button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <img src={product.image} alt={product.name || product.type} className="w-full h-auto object-cover rounded-md shadow-md" />
          
          <div className="flex flex-col gap-4">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-lg font-semibold mb-2 text-gray-700">Үнийн мэдээлэл</h3>
              <p>Суулгалтгүй: <span className="font-bold text-green-600">{product.prices.no_installation.toLocaleString()}₮</span></p>
              <p>Суулгалттай: <span className="font-bold text-green-600">{product.prices.with_installation.toLocaleString()}₮</span></p>
            </div>

            {isFence && product.materials && (
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-lg font-semibold mb-2 text-gray-700">Материалын үзүүлэлт</h3>
                <ul className="list-disc list-inside text-sm space-y-1">
                  <li><span className="font-semibold">Савх:</span> {product.materials.savx.size} хэмжээ, {product.materials.savx.thickness}мм зузаан</li>
                  <li><span className="font-semibold">Дай:</span> {product.materials.dai.size} хэмжээ, {product.materials.dai.thickness}мм зузаан</li>
                  <li><span className="font-semibold">Шон:</span> {product.materials.shon.size} хэмжээ, {product.materials.shon.thickness}мм зузаан</li>
                </ul>
              </div>
            )}
            
            {product.description && (
              <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="text-lg font-semibold mb-2 text-gray-700">Нэмэлт тайлбар</h3>
                  <p className="text-sm text-gray-600">{product.description}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailModal; 