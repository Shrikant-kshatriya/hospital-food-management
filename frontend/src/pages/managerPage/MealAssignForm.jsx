import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { FaWindowClose } from "react-icons/fa";

const MealOrderAssignForm = ({ isOpen, onClose, patient }) => {
    const [formData, setFormData] = useState({
        preparationBy: "",
    });
    const [pantryStaffList, setPantryStaffList] = useState([]);
    const [orderData, setOrderData] = useState(null);
    const [loading, setLoading] = useState(true);

    const fetchPantryStaffList = async () => {
        try {
            const res = await axios.get('/pantry');
            setPantryStaffList(res.data);
        } catch (error) {
            console.error(error);
        }
    }

    const fetchMealOrder = async () => {
        try {
            const res = await axios.get(`/orders`, { params: { patientID: patient._id } });
            if(res.data.length > 0) {
                setOrderData(res.data[0]);
                setFormData({ ...formData, preparationBy: orderData.preparationBy})
            }else {
                setOrderData(null);
                setFormData({ preparationBy: '' });
            }
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        try {
            fetchPantryStaffList();
            fetchMealOrder();
            setLoading(false);
        } catch (err) {
            toast.error(err);
        }
    }, [patient]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        try {
            e.preventDefault();
            const method = orderData ? 'patch' : 'post';
            const url = orderData ? `/orders/${orderData._id}` : '/orders';
            const res = await axios[method](url, {
                ...formData,
                patientID: patient._id,
            });
            toast.success('Meal order Assigned successfully');
        } catch {
            toast.error('Failed to save meal order');
        } finally {
            onClose();
        }

    };

    const handleDelete = async () => {
        try {
            const res = await axios.delete(`/orders/${orderData._id}`);
            toast.success('Meal order deleted successfully');
        } catch (error) {
            toast.error('Failed to delete meal order');
        } finally {
            onClose();
        }
        
    };

    if (!isOpen) return null;
    if (loading) return <div>Loading...</div>;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-3/4 max-w-4xl max-h-[90vh] overflow-auto">
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold mb-4">Assign Meal Order</h2>
                    <button
                        onClick={() => onClose()}
                        className=" bg-red-500 p-2 rounded-full  text-white"
                    >
                        <FaWindowClose />
                    </button>

                </div>

                {!patient.foodchart ? (
                    <p>Please create a foodchart for the patient first.</p>
                ) : (
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            Patient Floor : <span className="p-2 px-3 rounded-lg bg-green-300">{patient.floor}</span>
                        </div>

                        <div>
                            <label className="block mb-1 font-semibold">Pantry Staff Assigned:</label>
                            <select
                                name="preparationBy"

                                value={formData.preparationBy}
                                onChange={handleInputChange}
                                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            >
                                <option value="" disabled>
                                    Select Pantry Staff
                                </option>
                                {pantryStaffList.map((staff) => (
                                    <option key={staff._id} value={staff._id}>
                                        {staff.location} : {staff.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="flex justify-end space-x-2">
                            {orderData && (
                                <button
                                    type="button"
                                    onClick={handleDelete}
                                    className="bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition"
                                >
                                    Delete
                                </button>
                            )}
                            <button
                                type="submit"
                                className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition"
                            >
                                {orderData ? "Update" : "Assign"}
                            </button>
                        </div>
                    </form>
                )}
            </div>
        </div>
    );
};

export default MealOrderAssignForm;
