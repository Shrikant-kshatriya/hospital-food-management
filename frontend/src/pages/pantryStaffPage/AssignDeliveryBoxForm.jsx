import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const AssignDeliveryPopup = ({ order, deliveryPersonnel, closePopup, refreshOrders, mealTime }) => {
  const [selectedDeliveryPerson, setSelectedDeliveryPerson] = useState(null);

  const handleDeliveryChange = (e) => {
    setSelectedDeliveryPerson(deliveryPersonnel.find((person) => person._id === e.target.value));
  };

  const handleAssignDelivery = async () => {
    if (!selectedDeliveryPerson) {
      toast.error("Please select a delivery personnel.");
      return;
    }

    try {
        // check if box already exists
        const boxExists = await axios.get(`/orderBox?patientID=${order.patientID._id}&mealTime=${mealTime}`);
        if (boxExists.data.length > 0) {
          toast.error("Box already exists.");
          return;
        }
      // Create a new Box document for delivery
      await axios.post("/orderBox", {
        patientID: order.patientID._id,
        floor: order.patientID.floor,
        room: order.patientID.room,
        bed: order.patientID.bed,
        deliveryBy: selectedDeliveryPerson._id,
        mealTime: mealTime,
        preparation: {
            by: order.preparationBy._id
        },
      });
      toast.success("Delivery assigned successfully.");
      closePopup(); 
      refreshOrders(); 
    } catch (error) {
      console.error("Error assigning delivery:", error);
      toast.error("Failed to assign delivery.");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-[100]">
      <div className="bg-white p-6 rounded-lg shadow-lg w-3/4 max-w-2xl max-h-[90vh] overflow-auto">
        <h2 className="text-xl font-semibold mb-4">Assign Delivery Personnel for Order #{order._id}</h2>
        <p>Time: {mealTime}</p>
        
        {/* Dropdown for selecting delivery personnel */}
        <div className="mb-4">
          <label className="font-semibold text-lg">Select Delivery Personnel:</label>
          <select
            onChange={handleDeliveryChange}
            className="mt-2 p-2 rounded-lg w-full"
          >
            <option value="">Select Personnel</option>
            {deliveryPersonnel.map((person) => (
              <option key={person._id} value={person._id}>
                {person.name}
              </option>
            ))}
          </select>
        </div>

        {/* Buttons to close or submit */}
        <div className="flex justify-end gap-4">
          <button
            onClick={closePopup}
            className="bg-gray-500 text-white py-1 px-4 rounded-lg"
          >
            Close
          </button>
          <button
            onClick={handleAssignDelivery}
            className="bg-blue-600 text-white py-1 px-4 rounded-lg"
          >
            Assign Delivery
          </button>
        </div>
      </div>
    </div>
  );
};

export default AssignDeliveryPopup;
