import React, { useState } from "react";
import { FaWindowClose } from "react-icons/fa";
import { toast } from "react-toastify";

const BoxDetailsModal = ({ box, closeModal, handleUpdateBox }) => {
    const [status, setStatus] = useState(box.status);
    const [notes, setNotes] = useState(box.notes || "");

    const handleUpdate = async () => {
        try {
            await handleUpdateBox(box._id, { status, notes });
            closeModal();
        } catch (error) {
            console.error("Error updating box:", error);
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-3/4 max-w-2xl max-h-[90vh] overflow-auto">
                <div className="flex items-center justify-between">
                    <h3 className="text-xl font-semibold mb-6">Box Details</h3>
                    <button
                        onClick={() => closeModal()}
                        className="bg-red-500 p-2 rounded-full top-2 right-2 text-white"
                    >
                        <FaWindowClose />
                    </button>
                </div>

                <div className="space-y-2">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Box ID</label>
                        <div className="mt-1 p-4 bg-gray-50 rounded-md">{box._id}</div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Patient</label>
                        <div className="mt-1 p-4 bg-gray-50 rounded-md">{box.patientID.name}</div>
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Floor</label>
                            <div className="mt-1 p-4 bg-gray-50 rounded-md">{box.floor}</div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Room</label>
                            <div className="mt-1 p-4 bg-gray-50 rounded-md">{box.room}</div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Bed</label>
                            <div className="mt-1 p-4 bg-gray-50 rounded-md">{box.bed}</div>
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Meal Time</label>
                        <div className="mt-1 p-4 bg-gray-50 rounded-md">{box.mealTime}</div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Preparation</label>
                        <div className="mt-1 p-4 bg-gray-50 rounded-md">By: {box.preparation?.by?.name} | Status: <span className="p-1 bg-indigo-200 rounded-lg">{box.preparation.status}</span></div>
                    </div>

                    {box.deliveryTime && <div>
                        <label className="block text-sm font-medium text-gray-700">Delivery Time</label>
                        <div className="mt-1 p-4 bg-gray-50 rounded-md">{box.deliveryTime}</div>
                    </div>}

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Status</label>
                        <select
                            disabled={box.preparation.status === 'completed' ? false : true}
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                            className="mt-1 p-3 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        >
                            <option value="yet to be delivered">Yet to be Delivered</option>
                            <option value="delivered">Delivered</option>
                            <option value="delayed">Delayed</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Notes</label>
                        <textarea
                            value={notes}
                            onChange={(e) => setNotes(e.target.value)}
                            className="mt-1 p-3 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            rows="4"
                            placeholder="Enter any relevant notes here..."
                        ></textarea>
                    </div>
                </div>

                <div className="mt-6 flex justify-end gap-4">
                    <button
                        onClick={handleUpdate}
                        className="bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition"
                    >
                        Update
                    </button>
                    <button
                        onClick={closeModal}
                        className="bg-gray-600 text-white py-2 px-4 rounded-lg hover:bg-gray-700 transition"
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
};

export default BoxDetailsModal;
