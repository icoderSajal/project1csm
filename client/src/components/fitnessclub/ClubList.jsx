

import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'


import toast from "react-hot-toast";
import { format } from "date-fns"

import axios from "axios";


const ClubList = () => {
  const [clubs, setClus] = useState([])
  const navigate = useNavigate()
  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/v1/fitness", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (response.data.success) {
        setClus(response.data.clubs);
      }
    } catch (error) {
      toast.error("Failed to fetch menus");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.delete(
        `http://localhost:8000/api/v1/fitness/${id}`,
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
        <h1 className="text-4xl text-teal-100 font-bold">Fitness Master</h1>
        <button
          onClick={() => navigate("/admin-dashboard/club/add")}
          className="bg-teal-600 font-semibold text-white py-2.5 px-6 rounded hover:bg-teal-900 hover:ring-2 transition-all duration-300"
        >
          + Add Menu
        </button>
      </div>


      {/* Table */}
      <div className="flex justify-center px-4 ">
        <div className="w-full max-w-5xl">
          {clubs.length > 0 ? (
            <table className="w-full text-sm text-left text-gray-700  rounded-xl overflow-hidden shadow-md">
              <thead className="text-xs uppercase bg-gray-100 text-gray-800">
                <tr>
                  <th className="px-6 py-4">#</th>
                  <th className="px-6 py-4">Salon Name</th>
                  <th className="px-6 py-4">Opening Time</th>
                  <th className="px-6 py-4">Closing Time</th>
                  <th className="px-6 py-4 text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {clubs.map((cul, index) => (
                  <tr
                    key={cul._id}
                    className={`${index % 2 === 0 ? "bg-white" : "bg-gray-50"
                      } hover:bg-gray-100 transition-all`}
                  >
                    <td className="px-6 py-4">{index + 1}</td>
                    <td className="px-6 py-4">{cul.club_name} </td>
                    <td className="px-6 py-4">{cul.opening_time} -AM

                    </td>
                    <td className="px-6 py-4">{cul.closing_time} -PM</td>

                    <td className="px-6 py-4 text-center space-x-3">
                      <button
                        onClick={() => navigate(`/admin-dashboard/club/${cul._id}`)}

                        className="bg-green-600 hover:bg-green-800 text-white px-4 py-1.5 rounded"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(cul._id)}
                        className="bg-red-600 hover:bg-red-800 text-white px-4 py-1.5 rounded"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="text-center text-gray-600 mt-6">
              No Data available.
            </div>
          )}
        </div>
      </div>

    </div>
  )
}

export default ClubList
