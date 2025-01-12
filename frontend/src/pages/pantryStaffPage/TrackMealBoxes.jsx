import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { useUser } from "../../context/UserContext";
import BoxDetailsModal from "./UpdateMealBox";
import "react-toastify/dist/ReactToastify.css";

const TrackMealBox = () => {
  const [boxes, setBoxes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedBox, setSelectedBox] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { user } = useUser();

  const fetchBoxes = async () => {
    try {
      const res = await axios.get(`/pantry/${user._id}`);
      const response = await axios.get(`/orderBox?preparationBy=${res.data._id}`);
      setBoxes(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching boxes:", error);
      toast.error("Failed to load meal boxes.");
    }
  };

  useEffect(() => {
    fetchBoxes();
  }, []);

  const handleDeleteBox = async (boxId) => {
     
      try {
        await axios.delete(`/orderBox/${boxId}`);
        toast.success("Box deleted successfully.");
        fetchBoxes();
      } catch (error) {
        console.error("Error deleting box:", error);
        toast.error("Failed to delete the box.");
      }
    
  };

  const handleViewBox = (box) => {
    setSelectedBox(box);
    setIsModalOpen(true);
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="p-4 space-y-6">
      <ToastContainer />
      <h2 className="text-2xl font-semibold">Track Meal Boxes</h2>
      {boxes.length === 0 ? (
        <p className="text-gray-600">No meal boxes available.</p>
      ) : (
        <div className="overflow-x-auto shadow-lg rounded-lg">
          <table className="min-w-full table-auto bg-white rounded-lg">
            <thead className="bg-indigo-100 text-center">
              <tr>
                <th className="px-4 py-2 border-b text-indigo-800">S.No.</th>
                <th className="px-4 py-2 border-b text-indigo-800">Box ID</th>
                <th className="px-4 py-2 border-b text-indigo-800">Patient</th>
                <th className="px-4 py-2 border-b text-indigo-800">Status</th>
                <th className="px-4 py-2 border-b text-indigo-800">Meal Time</th>
                <th className="px-4 py-2 border-b text-indigo-800">Delivery By</th>
                <th className="px-4 py-2 border-b text-indigo-800">Actions</th>
              </tr>
            </thead>
            <tbody className="text-center">
              {boxes.map((box, index) => (
                <tr key={box._id} className="hover:bg-indigo-50 border-b-4 border-b-white">
                  <td className="px-4 py-2">{index + 1}</td>
                  <td className="px-4 py-2">{box._id}</td>
                  <td className="px-4 py-2">{box.patientID.name}</td>
                  <td className="px-4 py-2">{box.status}</td>
                  <td className="px-4 py-2">{box.mealTime}</td>
                  <td className="px-4 py-2">{box.deliveryBy.name}</td>
                  <td className="px-4 py-2 flex items-center justify-center gap-2">
                    <button
                      onClick={() => handleViewBox(box)}
                      className="bg-blue-600 text-white py-1 px-3 rounded-lg hover:bg-blue-700 transition"
                    >
                      View
                    </button>
                    <button
                      onClick={() => handleDeleteBox(box._id)}
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
      )}

      {isModalOpen && selectedBox && (
        <BoxDetailsModal
          box={selectedBox}
          closeModal={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
};

export default TrackMealBox;
