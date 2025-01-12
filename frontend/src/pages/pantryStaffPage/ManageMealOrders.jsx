import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { useUser } from "../../context/UserContext";
import { FaShippingFast } from "react-icons/fa";
import AssignDeliveryPopup from "./AssignDeliveryBoxForm";

const MealOrderMonitor = () => {
    const [mealOrders, setMealOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [updatedPreparation, setUpdatedPreparation] = useState({});
    const [updatedIssue, setUpdatedIssue] = useState("");
    const [deliveryPersonnel, setDeliveryPersonnel] = useState([]);
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [mealTime, setMealTime] = useState('');
    const { user } = useUser();

    // delivery personnel
    const fetchDeliveryPersonnel = async () => {
        try {
            const res = await axios.get("/deliveryPersonnel");
            setDeliveryPersonnel(res.data);
        } catch (error) {
            console.error("Error fetching delivery personnel:", error);
            toast.error("Failed to load delivery personnel.");
        }
    };
    // meal order monitor
    const fetchMealOrders = async () => {
        try {
            const res = await axios.get(`/pantry/${user._id}`);
            const response = await axios.get(`/orders?preparationBy=${res.data._id}`);
            setMealOrders(response.data);
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
            setUpdatedPreparation(res.data.preparation);
            setUpdatedIssue(res.data.issues);
            setIsModalOpen(true);
        } catch (error) {
            console.error("Error fetching order details:", error);
            toast.error("Failed to fetch order details.");
        }
    };

    const updateOrderStatus = async () => {
        try {
            await axios.patch(`/orders/${selectedOrder._id}`, {
                preparation: updatedPreparation,
                issues: updatedIssue,
            });
            toast.success("Order updated successfully.");
            setIsModalOpen(false);
            fetchMealOrders();
        } catch (error) {
            console.error("Error updating order:", error);
            toast.error("Failed to update the order.");
        }
    };

    const handlePreparationChange = (mealType, value) => {
        setUpdatedPreparation((prev) => ({
            ...prev,
            [mealType]: value,
        }));
    };

    const handleIssueChange = (e) => {
        setUpdatedIssue(e.target.value);
    };

    useEffect(() => {
        fetchMealOrders();
        fetchDeliveryPersonnel();
    }, []);

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

                        <div className="flex items-start gap-24 justify-between px-3">
                            {/* Display Preparation Status */}
                            <div className="mt-4 flex-grow">
                                <h3 className="font-semibold text-lg">Preparation Status:</h3>
                                <div className="space-y-4">
                                    {["morning", "evening", "night"].map((mealType) => (
                                        <div key={mealType} className="flex items-center justify-start gap-4">
                                            <label className="font-semibold capitalize">{mealType} Prepared:</label>
                                            <select
                                                value={updatedPreparation[mealType] || selectedOrder.preparation[mealType]}
                                                onChange={(e) => handlePreparationChange(mealType, e.target.value)}
                                                className="px-4 py-2 rounded-lg"
                                            >
                                                <option value="Pending">Pending</option>
                                                <option value="In-Progress">In-Progress</option>
                                                <option value="Completed">Completed</option>
                                            </select>
                                            {selectedOrder.preparation[mealType] === 'In-Progress' && 
                                            <button
                                                onClick={() => { setIsPopupOpen(true); setMealTime(mealType);}}
                                                className="bg-blue-600 mx-auto mt-1 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition justify-self-end"
                                            >
                                                <FaShippingFast className="mx-auto"/>
                                            </button>}
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Display Delivery Status */}
                            <div className="mt-4">
                                <h3 className="font-semibold text-lg">Delivery Status:</h3>
                                <div className="space-y-4">
                                    {["morning", "evening", "night"].map((mealType) => (
                                        <div key={mealType} className="flex items-center justify-between gap-4">
                                            <label className="font-semibold capitalize">{mealType} Delivered:</label>
                                            <span
                                                className={`px-4 py-2 rounded-lg ${selectedOrder.delivery[mealType] ? 'bg-green-400' : 'bg-red-400'}`}
                                            >
                                                {selectedOrder.delivery[mealType] ? "Delivered" : "Not Delivered"}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="mt-4">
                            <h3 className="font-semibold text-lg">Update Issue:</h3>
                            <textarea
                                value={updatedIssue}
                                onChange={handleIssueChange}
                                className="border p-2 rounded-lg w-full"
                                rows="2"
                            />
                        </div>
                        <div className="flex justify-end mt-6 gap-4">
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="bg-gray-500 text-white py-1 px-4 rounded-lg"
                            >
                                Close
                            </button>
                            <button
                                onClick={updateOrderStatus}
                                className="bg-blue-600 text-white py-1 px-4 rounded-lg hover:bg-blue-700"
                            >
                                Update Order
                            </button>
                        </div>
                    </div>
                </div>
            )}
            {/* Popup Component */}
            {isPopupOpen && selectedOrder && (
                <AssignDeliveryPopup
                    order={selectedOrder}
                    deliveryPersonnel={deliveryPersonnel}
                    closePopup={() => setIsPopupOpen(false)}
                    refreshOrders={fetchMealOrders}
                    mealTime={mealTime}
                />
            )}
        </div>
    );
};

export default MealOrderMonitor;
