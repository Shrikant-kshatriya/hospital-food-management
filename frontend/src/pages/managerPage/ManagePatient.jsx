import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { FaWindowClose } from "react-icons/fa";
import { FaClipboardList } from 'react-icons/fa6';
import { toast, ToastContainer } from 'react-toastify';
import FoodchartForm from './FoodChartForm';
import { IoFastFoodSharp } from 'react-icons/io5';
import MealOrderAssignForm from './MealAssignForm';

function PatientManager() {
    // -------------------------meal preparation 
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [selectedPatient, setSelectedPatient] = useState(null);

    const handleCloseForm = () => {
        setIsFormOpen(false);
        setSelectedPatient(null);
    };
    const handleOpenForm = (patient) => {
        setSelectedPatient(patient);
        setIsFormOpen(true);
    };


    // ---------------------------foodchart
    const [isFoodchartOpen, setIsFoodchartOpen] = useState(false);
    const [currentFoodchartData, setCurrentFoodchartData] = useState(null);
    const [patient, setPatient] = useState(null);

    const handleFoodchartOpen = (patient) => {
        if (patient.foodchart) {
            setCurrentFoodchartData(patient.foodchart);
        }
        setPatient(patient);
        setIsFoodchartOpen(true);
    };

    const handleFoodchartClose = () => {
        setIsFoodchartOpen(false);
        setCurrentFoodchartData(null);
        setPatient(null);
    };

    const handleFoodchartSubmit = async (updatedData, patient) => {
        try {
            if (!patient.foodchart) {
                console.log({ patientID: patient._id, ...updatedData })
                const response = await axios.post(`/patients/foodChart`, { patientID: patient._id, ...updatedData });
                toast.success('Food chart updated successfully');
            } else {
                const response = await axios.patch(`/patients/foodChart/${updatedData._id}`, updatedData);
                toast.success('Food chart updated successfully');
            }
            fetchPatients();
            handleFoodchartClose();
        } catch (error) {
            toast.error('Error updating food chart:', error);
        } finally {
            setIsFoodchartOpen(false);
        }
    };

    // -----------------------------patients
    const [patients, setPatients] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        address: "",
        phone: "",
        emergencyContact: { name: "", phone: "" },
        age: "",
        gender: "",
        diseases: [],
        allergies: [],
        floor: "",
        room: "",
        bed: "",
        discharged: false
    });
    const [diseaseInput, setDiseaseInput] = useState("");
    const [allergyInput, setAllergyInput] = useState("");

    const fetchPatients = async () => {
        try {
            const response = await axios.get('/patients');
            setPatients(response.data);
        } catch (error) {
            toast.error('Error fetching patients:', error);
        }
    };
    useEffect(() => {
        fetchPatients();
    }, []);

    const toggleForm = () => {
        setShowForm(!showForm)
        setIsEditing(false);
        setFormData({
            name: "",
            address: "",
            phone: "",
            emergencyContact: { name: "", phone: "" },
            age: "",
            gender: "",
            diseases: [],
            allergies: [],
            floor: "",
            room: "",
            bed: "",
            discharged: false
        });
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (name.includes("emergencyContact")) {
            const [key, subKey] = name.split(".");
            setFormData({
                ...formData,
                [key]: {
                    ...formData[key],
                    [subKey]: value
                }
            });
        } else {
            setFormData({
                ...formData,
                [name]: value
            });
        }
    };

    const addDisease = () => {
        if (diseaseInput.trim()) {
            setFormData({ ...formData, diseases: [...formData.diseases, diseaseInput.trim()] });
            setDiseaseInput("");
        }
    };

    const removeDisease = (index) => {
        const updatedDiseases = formData.diseases.filter((_, i) => i !== index);
        setFormData({ ...formData, diseases: updatedDiseases });
    };

    const addAllergy = () => {
        if (allergyInput.trim()) {
            setFormData({ ...formData, allergies: [...formData.allergies, allergyInput.trim()] });
            setAllergyInput("");
        }
    };

    const removeAllergy = (index) => {
        const updatedAllergies = formData.allergies.filter((_, i) => i !== index);
        setFormData({ ...formData, allergies: updatedAllergies });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (isEditing) {
                await axios.patch(`/patients/${formData._id}`, formData);
            } else {
                await axios.post('/patients', formData);
            }
            toast.success(isEditing ? 'Patient updated successfully' : 'Patient added successfully');
            toggleForm();
            fetchPatients();
        } catch (error) {
            toast.error('Error saving patient:', error);
        }
        setShowForm(false);
    };

    const handleEdit = (patient) => {
        setIsEditing(true);
        setFormData(patient);
        setShowForm(true);
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`/patients/${id}`);
            toast.success('Patient deleted successfully');
            fetchPatients();
        } catch {
            toast.error('Error deleting patient');
        }
    };

    const handleDischarge = async (id) => {
        try {
            await axios.patch(`/patients/${id}`, { discharged: true });
            toast.success('Patient discharged successfully');
            fetchPatients();
        } catch {
            toast.error('Error discharging patient');
        }
    }

    return (
        <div className="p-4">
            <ToastContainer />
            <button
                onClick={toggleForm}
                className="bg-indigo-600 text-white mb-3 py-2 px-4 rounded-lg shadow-md hover:bg-indigo-700 transition"
            >
                Add Patient
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
                                <h2 className="text-xl font-semibold mb-2">Patient Details</h2>
                                <input
                                    type="text"
                                    name="name"
                                    placeholder="Name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 mb-2"
                                    required
                                />
                                <input
                                    type="text"
                                    name="address"
                                    placeholder="Address"
                                    value={formData.address}
                                    onChange={handleInputChange}
                                    className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 mb-2"
                                    required
                                />
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

                            <div>
                                <h2 className="text-xl font-semibold mb-2">Emergency Contact</h2>
                                <input
                                    type="text"
                                    name="emergencyContact.name"
                                    placeholder="Emergency Contact Name"
                                    value={formData.emergencyContact.name}
                                    onChange={handleInputChange}
                                    className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 mb-2"
                                    required
                                />
                                <input
                                    type="text"
                                    name="emergencyContact.phone"
                                    placeholder="Emergency Contact Phone"
                                    value={formData.emergencyContact.phone}
                                    onChange={handleInputChange}
                                    className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 mb-2"
                                    required
                                />
                            </div>

                            <div>
                                <h2 className="text-xl font-semibold mb-2">Additional Information</h2>
                                <input
                                    type="number"
                                    name="age"
                                    placeholder="Age"
                                    value={formData.age}
                                    onChange={handleInputChange}
                                    className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 mb-2"
                                    required
                                />
                                <select
                                    name="gender"
                                    value={formData.gender}
                                    onChange={handleInputChange}
                                    className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 mb-2"
                                    required
                                >
                                    <option value="">Select...</option>
                                    <option value="male">Male</option>
                                    <option value="female">Female</option>
                                    <option value="other">Other</option>
                                </select>

                                <div>
                                    <h2 className="text-lg font-medium mt-4">Diseases</h2>
                                    <div className="bg-slate-50 flex items-center gap-2">
                                        {formData.diseases.map((disease, index) => (
                                            <div key={index} className="flex items-center m-1 justify-between gap-1 p-2 text-sm bg-gray-200 rounded-lg">
                                                <span>{disease}</span>
                                                <button
                                                    type="button"
                                                    onClick={() => removeDisease(index)}
                                                    className="text-red-500"
                                                >
                                                    &times;
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="flex items-center space-x-2 mb-2">
                                        <input
                                            type="text"
                                            placeholder="Add Disease"
                                            value={diseaseInput}
                                            onChange={(e) => setDiseaseInput(e.target.value)}
                                            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                        />
                                        <button
                                            type="button"
                                            onClick={addDisease}
                                            className="bg-indigo-600 text-white py-1 px-4 rounded-lg shadow-md hover:bg-indigo-700 transition"
                                        >
                                            Add
                                        </button>
                                    </div>
                                </div>

                                <div>
                                    <h2 className="text-lg font-medium mt-4">Allergies</h2>
                                    <div className="bg-slate-50 flex items-center gap-2">
                                        {formData.allergies.map((allergy, index) => (
                                            <div key={index} className="flex items-center justify-between gap-1 p-2 m-1 text-sm bg-gray-200 rounded-lg">
                                                <span>{allergy}</span>
                                                <button
                                                    type="button"
                                                    onClick={() => removeAllergy(index)}
                                                    className="text-red-500"
                                                >
                                                    &times;
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="flex items-center space-x-2 mb-2">
                                        <input
                                            type="text"
                                            placeholder="Add Allergy"
                                            value={allergyInput}
                                            onChange={(e) => setAllergyInput(e.target.value)}
                                            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                        />
                                        <button
                                            type="button"
                                            onClick={addAllergy}
                                            className="bg-indigo-600 text-white py-1 px-4 rounded-lg shadow-md hover:bg-indigo-700 transition"
                                        >
                                            Add
                                        </button>
                                    </div>

                                </div>
                            </div>

                            <div>
                                <h2 className="text-xl font-semibold mb-2">Room Information</h2>
                                <input
                                    type="text"
                                    name="floor"
                                    placeholder="Floor (e.g. FG, F1, F2, F3)"
                                    value={formData.floor}
                                    onChange={handleInputChange}
                                    className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 mb-2"
                                    required
                                />
                                <input
                                    type="number"
                                    name="room"
                                    placeholder="Room (1 - 10)"
                                    max={10}
                                    min={1}
                                    value={formData.room}
                                    onChange={handleInputChange}
                                    className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 mb-2"
                                    required
                                />
                                <input
                                    type="number"
                                    name="bed"
                                    placeholder="Bed (1 -5)"
                                    min={1}
                                    max={5}
                                    value={formData.bed}
                                    onChange={handleInputChange}
                                    className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 mb-2"
                                    required
                                />
                            </div>

                            <button
                                type="submit"
                                className={`w-full text-white py-2 px-4 rounded-lg shadow-md transition mt-4 ${!isEditing ? "bg-indigo-600 hover:bg-indigo-700" : "bg-yellow-500 hover:bg-yellow-600"}`}
                            >
                                {isEditing ? "Editing" : "Submit"}
                            </button>
                        </form>
                    </div>
                </div>
            )}

            <div className="overflow-x-auto shadow-lg rounded-lg">
                <table className="min-w-full table-auto">
                    <thead className='text-center'>
                        <tr>
                            <th className="px-4 py-2 bg-indigo-100 text-indigo-800">S.No.</th>
                            <th className="px-4 py-2 bg-indigo-100 text-indigo-800">Name</th>
                            <th className="px-4 py-2 bg-indigo-100 text-indigo-800">Age</th>
                            <th className="px-4 py-2 bg-indigo-100 text-indigo-800">Phone</th>
                            <th className="px-4 py-2 bg-indigo-100 text-indigo-800">Room</th>
                            <th className="px-4 py-2 bg-indigo-100 text-indigo-800">Food Chart</th>
                            <th className="px-4 py-2 bg-indigo-100 text-indigo-800">Food Preparation</th>
                            <th className="px-4 py-2 bg-indigo-100 text-indigo-800">Discharged</th>
                            <th className="px-4 py-2 bg-indigo-100 text-indigo-800">Actions</th>
                        </tr>
                    </thead>
                    <tbody className='text-center'>
                        {patients?.reverse().map((patient, index) => (
                            <tr key={patient._id} className="hover:bg-indigo-50 border-b-4 border-b-white">
                                <td className="px-4 py-2 border-b">{index + 1}</td>
                                <td className="px-4 py-2 border-b">{patient.name}</td>
                                <td className="px-4 py-2 border-b">{patient.age}</td>
                                <td className="px-4 py-2 border-b">{patient.phone}</td>
                                <td className="px-4 py-2 border-b">Floor: {patient.floor}<br />Room: {patient.room}<br />Bed: {patient.bed}</td>
                                <td className="px-4 py-2 border-b"><FaClipboardList onClick={() => handleFoodchartOpen(patient)} className='mx-auto m-2 w-8 h-8 cursor-pointer text-indigo-500' /></td>
                                <td className="px-4 py-2 border-b"><IoFastFoodSharp onClick={() => handleOpenForm(patient)} className='mx-auto m-2 w-8 h-8 cursor-pointer text-indigo-500' /></td>
                                <td className={`px-4 py-2 border-b ${patient.discharged ? 'bg-blue-200' : 'bg-red-100'}`}>{patient.discharged ? "Yes" : "No"}</td>
                                <td className="px-4 py-2 border-b space-x-2 text-sm">
                                    <button
                                        onClick={() => handleEdit(patient)}
                                        className="bg-indigo-600 text-white py-1 px-3 rounded-lg hover:bg-indigo-700 transition"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => handleDelete(patient._id)}
                                        className="bg-red-600 text-white py-1 px-3 rounded-lg hover:bg-red-700 transition"
                                    >
                                        Delete
                                    </button>
                                    <button
                                        onClick={() => handleDischarge(patient._id)}
                                        className="bg-green-600 text-white py-1 px-3 rounded-lg hover:bg-red-700 transition"
                                    >
                                        Discharge
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <FoodchartForm
                isOpen={isFoodchartOpen}
                onClose={handleFoodchartClose}
                onSubmit={handleFoodchartSubmit}
                initialData={currentFoodchartData}
                patient={patient}
            />
            <MealOrderAssignForm
                isOpen={isFormOpen}
                onClose={handleCloseForm}
                patient={selectedPatient}
            />

        </div>
    );
}

export default PatientManager;
