// PopupComponent.jsx
import React from 'react';

const PopupComponent = ({ onClose, isSuccess, message }) => {
  const popupBgColor = isSuccess ? 'bg-green-500' : 'bg-red-500';
  const buttonBgColor = isSuccess ? 'bg-blue-500' : 'bg-red-500'; // Change button color for better contrast

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className={`bg-white p-8 rounded-md shadow-md ${popupBgColor}`}>
        <p className="text-lg font-semibold mb-4">{message}</p>
        <button
          onClick={onClose}
          className={`text-white px-4 py-2 rounded-md hover:bg-gray-600 focus:outline-none focus:ring focus:border-gray-300 ${buttonBgColor}`}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default PopupComponent;
