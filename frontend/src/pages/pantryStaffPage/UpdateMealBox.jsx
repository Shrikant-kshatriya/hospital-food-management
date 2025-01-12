import React from "react";
import { FaWindowClose } from "react-icons/fa";

const BoxDetailsModal = ({ box, closeModal }) => {
  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md relative">
        <button
          onClick={closeModal}
          className="absolute bg-red-500 p-2 rounded-full top-2 right-2 text-white"
        >
          <FaWindowClose />
        </button>
        <h3 className="text-xl font-semibold mb-4">Box Details</h3>
        <div className="space-y-2">
          <p><strong>Box ID:</strong> {box._id}</p>
          <p><strong>Patient ID:</strong> {box.patientID.name}</p>
          <p className="rounded-md bg-indigo-100 py-2"><strong>Status:</strong> {box.status}</p>
          <p><strong>Meal Time:</strong> {box.mealTime}</p>
          <p><strong>Floor:</strong> {box.floor}</p>
          <p><strong>Room:</strong> {box.room}</p>
          <p><strong>Bed:</strong> {box.bed}</p>
          <p className="rounded-md bg-blue-100 py-2"><strong>Preparation Status:</strong> {box.preparation.status}</p>
          <p><strong>Notes:</strong> {box.notes}</p>
          <p><strong>Preparation By:</strong> {box.preparation.by.name}</p>
          <p><strong>Delivery By:</strong> {box.deliveryBy.name}</p>
          <p><strong>Delivery Time:</strong> {box.deliveryTime ? new Date(box.deliveryTime).toLocaleString() : 'N/A'}</p>
        </div>
        <button
          onClick={closeModal}
          className="bg-gray-600 text-white mt-4 py-2 px-6 rounded-lg hover:bg-gray-700 transition"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default BoxDetailsModal;
