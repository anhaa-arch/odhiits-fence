import React from 'react';
import { Link } from 'react-router-dom';

function FenceCard({ fence }) {
  if (!fence) {
    return (
      <div className="h-full bg-white rounded-lg shadow-md p-4 flex items-center justify-center">
        <p className="text-red-500">Хашааны мэдээлэл алга байна.</p>
      </div>
    );
  }

  const { id, name, image, pricePerM2, hasMesh, recommended, specs } = fence;
  const linkTo = `/fences/${id}`;

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
            {name || 'Нэргүй хашаа'}
          </Link>
        </h3>
        {pricePerM2 && (
          <p className="text-xl font-bold text-green-600 mb-4">
            {`${pricePerM2.toLocaleString()}₮ / м²`}
          </p>
        )}
        {/* Badges */}
        <div className="mt-auto flex flex-col space-y-2">
          {hasMesh && (
            <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">Матаастай</span>
          )}
          {recommended && (
            <span className="inline-block bg-green-100 text-green-800 text-xs px-2 py-1 rounded">Санал болгох</span>
          )}
          {/* Specs */}
          <ul className="text-sm text-gray-600 list-disc list-inside">
            {specs.map((s, i) => (
              <li key={i}>{s}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default FenceCard;