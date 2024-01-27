// PopupComponent.jsx
import React from 'react';

const PopupComponent = ({ onClose }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-8 rounded-md shadow-md">
        <p className="text-lg font-semibold mb-4">Congratulations! Your registration was successful.</p>
        <button
          onClick={onClose}
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default PopupComponent;
