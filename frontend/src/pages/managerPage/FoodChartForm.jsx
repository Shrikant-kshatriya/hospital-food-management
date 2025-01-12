import React, { useState, useEffect } from "react";

const FoodchartForm = ({ isOpen, onClose, onSubmit, initialData, patient }) => {
  const [formData, setFormData] = useState({
    morning: { instructions: [], ingredients: [], nutritionalValue: 0, servingSize: "medium" },
    evening: { instructions: [], ingredients: [], nutritionalValue: 0, servingSize: "medium" },
    night: { instructions: [], ingredients: [], nutritionalValue: 0, servingSize: "medium" },
  });

  const [instructionInput, setInstructionInput] = useState("");
  const [ingredientInput, setIngredientInput] = useState("");

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    } else {
      setFormData({
        morning: { instructions: [], ingredients: [], nutritionalValue: 0, servingSize: "medium" },
        evening: { instructions: [], ingredients: [], nutritionalValue: 0, servingSize: "medium" },
        night: { instructions: [], ingredients: [], nutritionalValue: 0, servingSize: "medium" },
      });
    }
  }, [initialData]);
  

  const handleInputChange = (e, meal, field) => {
    setFormData({
      ...formData,
      [meal]: {
        ...formData[meal],
        [field]: e.target.value,
      },
    });
  };

  const handleAddInstruction = (meal) => {
    if (instructionInput.trim()) {
      setFormData({
        ...formData,
        [meal]: {
          ...formData[meal],
          instructions: [...formData[meal].instructions, instructionInput],
        },
      });
      setInstructionInput("");
    }
  };

  const handleAddIngredient = (meal) => {
    if (ingredientInput.trim()) {
      setFormData({
        ...formData,
        [meal]: {
          ...formData[meal],
          ingredients: [...formData[meal].ingredients, ingredientInput],
        },
      });
      setIngredientInput("");
    }
  };

  const handleRemoveItem = (meal, field, index) => {
    const updatedList = formData[meal][field].filter((_, i) => i !== index);
    setFormData({
      ...formData,
      [meal]: {
        ...formData[meal],
        [field]: updatedList,
      },
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData, patient);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-3/4 max-w-4xl max-h-[90vh] overflow-auto">
        <h2 className="text-xl font-semibold mb-4">Manage Foodchart</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {["morning", "evening", "night"].map((meal) => (
            <div key={meal}>
              <h3 className="text-lg font-semibold capitalize">{meal} Meal</h3>
              <div className="space-y-2">
                <div>
                  <label className="block mb-1 font-semibold">Instructions</label>
                  <div className="flex items-center gap-2">
                  {formData[meal].instructions.map((instruction, index) => (
                    <div key={index} className="flex items-center mb-2 p-1 rounded-lg bg-blue-200">
                      <span className="">{instruction}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveItem(meal, "instructions", index)}
                        className="ml-2 text-red-600"
                      >
                        &times;
                      </button>
                    </div>
                  ))}
                  </div>
                  <div className="flex items-center space-x-2 mb-2">
                    <input
                      type="text"
                      placeholder="Add Instruction e.g.(No salt, less sugar)"
                      value={instructionInput}
                      onChange={(e) => setInstructionInput(e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                    <button
                      type="button"
                      onClick={() => handleAddInstruction(meal)}
                      className="bg-indigo-600 text-white py-1 px-4 rounded-lg shadow-md hover:bg-indigo-700 transition"
                    >
                      Add
                    </button>
                  </div>
                </div>
                <div>
                  <label className="block mb-1 font-semibold">Ingredients</label>
                  <div className="flex items-center gap-2">
                  {formData[meal].ingredients.map((ingredient, index) => (
                    <div key={index} className="flex items-center mb-2 bg-green-200 rounded-lg p-1">
                      <span className="">{ingredient}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveItem(meal, "ingredients", index)}
                        className="ml-2 text-red-600"
                      >
                        &times;
                      </button>
                    </div>
                  ))}
                  </div>
                  <div className="flex items-center space-x-2 mb-2">
                    <input
                      type="text"
                      placeholder="Add Ingredient e.g. (rice, carrot, etc.)"
                      value={ingredientInput}
                      onChange={(e) => setIngredientInput(e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                    <button
                      type="button"
                      onClick={() => handleAddIngredient(meal)}
                      className="bg-indigo-600 text-white py-1 px-4 rounded-lg shadow-md hover:bg-indigo-700 transition"
                    >
                      Add
                    </button>
                  </div>
                </div>
                <input
                  type="number"
                  placeholder="Nutritional Value"
                  value={formData[meal].nutritionalValue}
                  onChange={(e) => handleInputChange(e, meal, "nutritionalValue")}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <select
                  value={formData[meal].servingSize}
                  onChange={(e) => handleInputChange(e, meal, "servingSize")}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="large">Large</option>
                  <option value="medium">Medium</option>
                  <option value="small">Small</option>
                </select>
              </div>
            </div>
          ))}
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-600 text-white py-2 px-4 rounded-lg hover:bg-gray-700 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FoodchartForm;
