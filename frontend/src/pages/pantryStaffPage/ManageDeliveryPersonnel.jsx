import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaWindowClose } from 'react-icons/fa';
import axios from 'axios';

const DeliveryPersonnelManager = () => {
    const [showForm, setShowForm] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        role: 'delivery',
        phone: '',
    });
    const [deliveryPersonnel, setDeliveryPersonnel] = useState([]);

    const toggleForm = () => {
        setShowForm(!showForm);
        setIsEditing(false);
        setFormData({
            name: '',
            email: '',
            password: '',
            role: 'delivery',
            phone: '',
        });
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (!isEditing) {
                await axios.post('/deliveryPersonnel', formData);
                toast.success('Delivery personnel added successfully!');
            } else {
                await axios.patch(`/deliveryPersonnel/${formData._id}`, formData);
                toast.success('Delivery personnel updated successfully!');
            }
            fetchDeliveryPersonnel();
        } catch (error) {
            toast.error('Error managing delivery personnel');
            console.error(error);
        } finally {
            toggleForm();
        }
    };

    const handleEdit = (personnel) => {
        setFormData(personnel);
        setIsEditing(true);
        setShowForm(true);
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`/deliveryPersonnel/${id}`);
            toast.success('Delivery personnel deleted successfully!');
            fetchDeliveryPersonnel();
        } catch (error) {
            toast.error('Error deleting delivery personnel');
            console.error(error);
        }
    };

    const fetchDeliveryPersonnel = async () => {
        try {
            const response = await axios.get('/deliveryPersonnel');
            setDeliveryPersonnel(response.data);
        } catch (error) {
            toast.error('Error fetching delivery personnel');
            console.error(error);
        }
    };

    useEffect(() => {
        fetchDeliveryPersonnel();
    }, []);

    return (
        <div className="p-4">
            <ToastContainer />
            <button
                onClick={toggleForm}
                className="bg-indigo-600 text-white mb-3 py-2 px-4 rounded-lg shadow-md hover:bg-indigo-700 transition"
            >
                Add Delivery Personnel
            </button>

            {showForm && (
                <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-5xl max-h-[80vh] overflow-auto relative">
                        <button
                            onClick={toggleForm}
                            className="absolute bg-red-500 p-2 rounded-full top-2 right-2 text-white"
                        >
                            <FaWindowClose />
                        </button>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <h2 className="text-xl font-semibold mb-2">Delivery Personnel Details</h2>
                                <input
                                    type="text"
                                    name="name"
                                    placeholder="Name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 mb-2"
                                    required
                                />
                                {!isEditing && (
                                    <>
                                        <input
                                            type="email"
                                            name="email"
                                            placeholder="Email"
                                            value={formData.email}
                                            onChange={handleInputChange}
                                            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 mb-2"
                                            required
                                        />
                                        <input
                                            type="password"
                                            name="password"
                                            placeholder="Password"
                                            value={formData.password}
                                            onChange={handleInputChange}
                                            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 mb-2"
                                            required
                                        />
                                    </>
                                )}
                                <input
                                    type="text"
                                    name="phone"
                                    placeholder="Phone"
                                    value={formData.phone}
                                    onChange={handleInputChange}
                                    className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 mb-2"
                                    required
                                />
                            </div>
                            <button
                                type="submit"
                                className={`w-full text-white py-2 px-4 rounded-lg shadow-md transition mt-4 ${!isEditing ? "bg-indigo-600 hover:bg-indigo-700" : "bg-yellow-500 hover:bg-yellow-600"}`}
                            >
                                {isEditing ? "Edit" : "Submit"}
                            </button>
                        </form>
                    </div>
                </div>
            )}

            <div className="overflow-x-auto shadow-lg rounded-lg">
                <table className="min-w-full table-auto">
                    <thead>
                        <tr>
                            <th className="px-4 py-2 bg-indigo-100 text-indigo-800">S.No.</th>
                            <th className="px-4 py-2 bg-indigo-100 text-indigo-800">Name</th>
                            <th className="px-4 py-2 bg-indigo-100 text-indigo-800">Phone</th>
                            <th className="px-4 py-2 bg-indigo-100 text-indigo-800">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="text-center">
                        {deliveryPersonnel.map((personnel, index) => (
                            <tr key={personnel._id} className="hover:bg-indigo-50 border-b-4 border-b-white">
                                <td className="px-4 py-2 border-b">{index + 1}</td>
                                <td className="px-4 py-2 border-b">{personnel.name}</td>
                                <td className="px-4 py-2 border-b">{personnel.phone}</td>
                                <td className="px-4 py-2 border-b space-x-2 text-sm">
                                    <button
                                        onClick={() => handleEdit(personnel)}
                                        className="bg-indigo-600 text-white py-1 px-3 rounded-lg hover:bg-indigo-700 transition"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => handleDelete(personnel._id)}
                                        className="bg-red-600 text-white py-1 px-3 rounded-lg hover:bg-red-700 transition"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default DeliveryPersonnelManager;
