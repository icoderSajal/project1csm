

import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'


import toast from "react-hot-toast";
import { format } from "date-fns"

import axios from "axios";

import { Link } from "react-router-dom"

const PartHallList = () => {
    const [partyHalls, setPartyHalls] = useState([])
    const [halls, setHalls] = useState([]);
    const navigate = useNavigate()
    const fetchData = async () => {
        try {
            const response = await axios.get("http://localhost:8000/api/v1/party-hall", {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });
            if (response.data.success) {
                setPartyHalls(response.data.halls);
            }
        } catch (error) {
            toast.error("Failed to fetch menus");
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const fetchPartyHalls = async () => {
        try {
            const res = await axios.get("http://localhost:8000/api/v1/party-hall", {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });
            if (res.data.success) {
                setHalls(res.data.halls);
            } else {
                toast.error("Failed to fetch party halls");
            }
        } catch (error) {
            toast.error("API Error while fetching halls");
            console.error("Error:", error);
        }
    };

    useEffect(() => {
        fetchPartyHalls();
    }, []);


    const handleDelete = async (id) => {
        try {
            const token = localStorage.getItem("token");
            const res = await axios.delete(
                `http://localhost:8000/api/v1/party-hall/${id}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            if (res.data.success) {
                toast.success("Menu deleted");
                fetchData();
            }
        } catch (error) {
            toast.error("Failed to delete menu");
        }
    };

    return (
        <div>
            <div className="flex  justify-between mx-20 mt-10 mb-6">
                <h1 className="text-4xl text-teal-100 font-bold">Party Hall Master</h1>
                <button
                    onClick={() => navigate("/admin-dashboard/party-hall/add")}
                    className="bg-teal-600 font-semibold text-white py-2.5 px-6 rounded hover:bg-teal-900 hover:ring-2 transition-all duration-300"
                >
                    + Add Menu
                </button>
            </div>


            {/* Table */}
            <div className="flex justify-center px-4 ">
                <div className="w-full max-w-5xl">
                    {halls.length > 0 ? (
                        <table className="w-full text-sm text-left text-gray-700  rounded-xl overflow-hidden shadow-md">

                            <thead className="text-xs uppercase bg-gray-100 text-gray-800">
                                <tr>
                                    <th className="px-6 py-4">#</th>

                                    <th className="px-6 py-4">Name</th>
                                    <th className="px-6 py-4">Location</th>
                                    <th className="px-6 py-4">Capacity</th>


                                    <th className="px-6 py-4">Availability</th>
                                    <th className="px-6 py-4">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {halls.map((hall, index) => (
                                    <tr
                                        key={hall._id}
                                        className={`${index % 2 === 0 ? "bg-white" : "bg-gray-50"
                                            } hover:bg-gray-100 transition-all`}

                                    >
                                        <td className="px-4 py-2">{index + 1}</td>
                                        <td className="px-4 py-2">{hall.hall_name}</td>
                                        <td className="px-4 py-2">{hall.location}</td>
                                        <td className="px-4 py-2">{hall.capacity}</td>

                                        <td className="py-3 px-4">
                                            {hall.available
                                                ? <span className="text-green-600 font-semibold">Yes</span>
                                                : <span className="text-red-600 font-semibold">No</span>}
                                        </td>
                                        <td className="px-6 py-4 text-center space-x-3 flex justify-center items-center gap-2">
                                            <button
                                                onClick={() => navigate(`/admin-dashboard/party-hall/${hall._id}`)}

                                                className="bg-green-600 hover:bg-green-800 text-white px-4 py-1.5 rounded"
                                            >
                                                Edit
                                            </button>
                                            <button
                                                onClick={() => handleDelete(hall._id)}
                                                className="bg-red-600 hover:bg-red-800 text-white px-4 py-1.5 rounded"
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                                {halls.length === 0 && (
                                    <tr>
                                        <td colSpan="7" className="text-center py-4 text-gray-500">
                                            No party halls found.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    ) : (
                        <div className="text-center text-gray-600 mt-6">
                            No menus available.
                        </div>
                    )}
                </div>


            </div>

        </div>
    )
}

export default PartHallList

