import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";

const MealOrderMonitor = () => {
  const [mealOrders, setMealOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState(null); 
  const [isModalOpen, setIsModalOpen] = useState(false);  

  const fetchMealOrders = async () => {
    try {
      const res = await axios.get("/orders");
      setMealOrders(res.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching meal orders:", error);
      toast.error("Failed to load meal orders.");
    }
  };

  const fetchOrderDetails = async (orderId) => {
    try {
      const res = await axios.get(`/orders/${orderId}`);
      setSelectedOrder(res.data);
      setIsModalOpen(true); 
    } catch (error) {
      console.error("Error fetching order details:", error);
      toast.error("Failed to fetch order details.");
    }
  };

  useEffect(() => {
    fetchMealOrders();
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case 'Completed':
        return 'bg-green-400';
      case 'In-Progress':
        return 'bg-yellow-400';
      case 'Pending':
        return 'bg-red-400';
      default:
        return 'bg-gray-300';
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="space-y-6">
        <ToastContainer />
      <h2 className="text-2xl font-semibold">Meal Order Monitoring</h2>
      {mealOrders.length === 0 ? (
        <p>No meal orders available.</p>
      ) : (
        <div className="space-y-4">
          {mealOrders.map((order, index) => (
            <div key={order._id} className="bg-white p-4 rounded-lg shadow-md flex items-center justify-between">
              <div className="flex-grow flex gap-2">
                <span className="font-semibold pr-2 border-r-2 border-r-black">Order #{index + 1}</span>
                <span className="font-semibold">Patient: {order.patientID.name}</span>
                <span>Location: Floor-{order.patientID.floor}, Room-{order.patientID.room}, Bed-{order.patientID.bed}</span>
              </div>
              <div className="mt-2">
                <button
                  onClick={() => fetchOrderDetails(order._id)}
                  className="bg-blue-600 text-white py-1 px-4 rounded-lg hover:bg-blue-700 transition"
                >
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal for order details */}
      {isModalOpen && selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-3/4 max-w-4xl max-h-[90vh] overflow-auto">
            <h2 className="text-xl font-semibold mb-4">Order Details for #{selectedOrder._id}</h2>
            <div className="flex items-center gap-2">
              <h3 className="font-semibold text-lg">Patient Name:</h3>
              <p>{selectedOrder.patientID.name}</p>
            </div>
            <div className="mt-4">
              <h3 className="font-semibold text-lg">Foodchart Details:</h3>
              {/* Morning Meal */}
              <div className="bg-gray-100 p-4 rounded-lg shadow-sm mb-4">
                <h4 className="font-semibold text-lg">Morning Meal</h4>
                <ul className="list-disc pl-5">
                  {selectedOrder.foodchart.morning.ingredients.map((ingredient, index) => (
                    <li key={index}>{ingredient}</li>
                  ))}
                </ul>
                <p><strong>Instructions:</strong> {selectedOrder.foodchart.morning.instructions.join(", ")}</p>
                <p><strong>Nutritional Value:</strong> {selectedOrder.foodchart.morning.nutritionalValue} kcal</p>
                <p><strong>Serving Size:</strong> {selectedOrder.foodchart.morning.servingSize}</p>
              </div>

              {/* Evening Meal */}
              <div className="bg-gray-100 p-4 rounded-lg shadow-sm mb-4">
                <h4 className="font-semibold text-lg">Evening Meal</h4>
                <ul className="list-disc pl-5">
                  {selectedOrder.foodchart.evening.ingredients.map((ingredient, index) => (
                    <li key={index}>{ingredient}</li>
                  ))}
                </ul>
                <p><strong>Instructions:</strong> {selectedOrder.foodchart.evening.instructions.join(", ")}</p>
                <p><strong>Nutritional Value:</strong> {selectedOrder.foodchart.evening.nutritionalValue} kcal</p>
                <p><strong>Serving Size:</strong> {selectedOrder.foodchart.evening.servingSize}</p>
              </div>

              {/* Night Meal */}
              <div className="bg-gray-100 p-4 rounded-lg shadow-sm">
                <h4 className="font-semibold text-lg">Night Meal</h4>
                <ul className="list-disc pl-5">
                  {selectedOrder.foodchart.night.ingredients.map((ingredient, index) => (
                    <li key={index}>{ingredient}</li>
                  ))}
                </ul>
                <p><strong>Instructions:</strong> {selectedOrder.foodchart.night.instructions.join(", ")}</p>
                <p><strong>Nutritional Value:</strong> {selectedOrder.foodchart.night.nutritionalValue} kcal</p>
                <p><strong>Serving Size:</strong> {selectedOrder.foodchart.night.servingSize}</p>
              </div>
            </div>

            <div className="mt-4 flex items-center gap-2">
              <h3 className="font-semibold text-lg">Pantry Staff:</h3>
              <p>{selectedOrder.preparationBy.name} - {selectedOrder.preparationBy.location}</p>
            </div>
            <div className="mt-4">
              <h3 className="font-semibold text-lg">Issues:</h3>
              <p>{selectedOrder.issues || "No issues reported"}</p>
            </div>
            <div className="mt-4">
              <h3 className="font-semibold text-lg">Preparation Status:</h3>
              <div className="flex space-x-4">
                <div className={`p-2 rounded-lg ${getStatusColor(selectedOrder.preparation.morning)}`}>
                  <span>Morning: {selectedOrder.preparation.morning}</span>
                </div>
                <div className={`p-2 rounded-lg ${getStatusColor(selectedOrder.preparation.evening)}`}>
                  <span>Evening: {selectedOrder.preparation.evening}</span>
                </div>
                <div className={`p-2 rounded-lg ${getStatusColor(selectedOrder.preparation.night)}`}>
                  <span>Night: {selectedOrder.preparation.night}</span>
                </div>
              </div>
            </div>
            <div className="mt-4">
              <h3 className="font-semibold text-lg">Delivery Status:</h3>
              <div className="flex space-x-4">
                <div className={`p-2 rounded-lg ${selectedOrder.delivery.morning ? 'bg-green-400' : 'bg-red-400'}`}>
                  <span>Morning: {selectedOrder.delivery.morning ? "Delivered" : "Not Delivered"}</span>
                </div>
                <div className={`p-2 rounded-lg ${selectedOrder.delivery.evening ? 'bg-green-400' : 'bg-red-400'}`}>
                  <span>Evening: {selectedOrder.delivery.evening ? "Delivered" : "Not Delivered"}</span>
                </div>
                <div className={`p-2 rounded-lg ${selectedOrder.delivery.night ? 'bg-green-400' : 'bg-red-400'}`}>
                  <span>Night: {selectedOrder.delivery.night ? "Delivered" : "Not Delivered"}</span>
                </div>
              </div>
            </div>
            <div className="flex justify-end mt-4">
              <button
                onClick={() => setIsModalOpen(false)}
                className="bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MealOrderMonitor;
