

import React, { useState } from "react";
import toast from "react-hot-toast"
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";



const CreateClub = () => {
  const [formData, setFormData] = useState({
    club_name: "",
    services: [],
    opening_time: "",
    closing_time: "",
    specialist_trainer1: "",
    specialist_trainer2: "",
  });
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const serviceOptions = [
    "Body Buliding",
    "Weight Training",
    "Gymnastic",
    "Yoga",
    "Meditation",
    "Self Defence",
  ];

  const handleCheckboxChange = (service) => {
    setFormData((prev) => {
      const isChecked = prev.services.includes(service);
      const updatedServices = isChecked
        ? prev.services.filter((s) => s !== service)
        : [...prev.services, service];
      return { ...prev, services: updatedServices };
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };




  const handleSubmit = async (e) => {

    e.preventDefault();
    const { club_name, services, opening_time, closing_time } = formData;

    if (!club_name || services.length === 0 || !opening_time || !closing_time) {
      toast.error("Please fill all required fields.");
      return;
    }
    try {
      const response = await axios.post(
        `http://localhost:8000/api/v1/fitness/add`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.data.success) {
        toast.success("Club Added");
        navigate("/admin-dashboard/clubs");
      }
    } catch (error) {
      if (error.response && !error.response.data.success) {
        toast.error(error.response.data.error);
      }
    }
  };


  return (
    <div className="min-h-screen bg-[0000] backdrop-blur flex items-center justify-center px-4 py-8 rounded-2xl" >
      <div className="bg-[0000] backdrop-blur p-8 rounded-2xl shadow-lg w-full max-w-2xl">
        <h2 className="text-2xl font-bold text-center text-pink-100 mb-6">
          Create New Fitness Club
        </h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Salon Name */}
          <div>
            <label className="block font-medium text-gray-700 mb-1">
              Club Name<span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="club_name"
              value={formData.club_name}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg"
              placeholder="Fitness Club Name"
              required
            />
          </div>

          {/* Services Selection */}
          <div>
            <label className="block font-medium text-gray-700 mb-1">
              Services Offered<span className="text-red-500">*</span>
            </label>
            <div className="grid grid-cols-2 gap-2">
              {serviceOptions.map((service) => (
                <label key={service} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={formData.services.includes(service)}
                    onChange={() => handleCheckboxChange(service)}
                  />
                  <span>{service}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Opening Time */}
          <div className="flex flex-col md:flex-row gap-4">
            <div className="w-full">
              <label className="block font-medium text-gray-700 mb-1">
                Opening Time<span className="text-red-500">*</span>
              </label>
              <input
                type="time"
                name="opening_time"
                value={formData.opening_time}
                onChange={handleChange}
                className="w-full p-2 border rounded-lg"
                required
              />
            </div>

            {/* Closing Time */}
            <div className="w-full">
              <label className="block font-medium text-gray-700 mb-1">
                Closing Time<span className="text-red-500">*</span>
              </label>
              <input
                type="time"
                name="closing_time"
                value={formData.closing_time}
                onChange={handleChange}
                className="w-full p-2 border rounded-lg"
                required
              />
            </div>
          </div>

          {/* Haircut Specialist */}
          <div>
            <label className="block font-medium text-gray-700 mb-1">
              Specialist Name
            </label>
            <input
              type="text"
              name="specialist_trainer1"
              value={formData.specialist_trainer1}
              onChange={handleChange}
              placeholder="e.g. Alex Johnson"
              className="w-full p-2 border rounded-lg"
            />
          </div>

          {/* Manicure Specialist */}
          <div>
            <label className="block font-medium text-gray-700 mb-1">
              Specialist Name
            </label>
            <input
              type="text"
              name="specialist_trainer2"
              value={formData.specialist_trainer2}
              onChange={handleChange}
              placeholder="e.g. Emily Clark"
              className="w-full p-2 border rounded-lg"
            />
          </div>

          {/* Submit */}
          <div className="flex justify-end gap-4 items-center mt-5">
            <button
              type="submit"
              disabled={loading}
              className="bg-teal-500 text-white px-6 py-2 font-bold rounded-lg hover:bg-teal-800 transition duration-300  perfectcase"
            >
              {loading ? (
                <>
                  <svg
                    className="animate-spin h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                    ></path>
                  </svg>
                  Loading...
                </>
              ) : (
                "Create Club"
              )}
            </button>
            <Link
              className="bg-teal-500 text-white px-6 py-2 font-bold rounded-lg hover:bg-teal-800 transition duration-300  perfectcase"
              to="/admin-dashboard/clubs"
            >
              Back
            </Link>
          </div>


        </form>
      </div>
    </div>
  );
};

export default CreateClub;

