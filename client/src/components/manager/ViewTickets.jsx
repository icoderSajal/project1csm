import axios from 'axios';
import React, { useState, useEffect } from 'react'
import toast from 'react-hot-toast';
import { format } from "date-fns"


const ViewTickets = () => {
  const [tickets, setTickets] = useState([])
  //
  const fetchTickets = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("http://localhost:8000/api/v1/booking", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.data.success) {

        setTickets(res.data.booking)
      }

    } catch (error) {
      toast.error("Failed to load tickets");
    }
  };

  useEffect(() => {
    fetchTickets()
  }, [])


  return (
    <>
      <div className="p-5">
        <div className="text-center">
          <h3 className="text-4xl font-bold text-center text-teal-300 mb-8">
            Resort Movie Ticket List
          </h3>
        </div>
      </div>
      <div className="flex justify-center px-4 ">
        <div className="w-full max-w-5xl">
          {tickets.length > 0 ? (

            <table className="w-full text-sm text-left text-gray-700  rounded-xl overflow-hidden shadow-md">
              <thead className="text-xs uppercase bg-gray-100 text-gray-800">

                <tr>
                  <th className="px-6 py-4">#</th>
                  <th className="px-6 py-4">Movie Name</th>
                  <th className="px-6 py-4">User ID</th>
                  <th className="px-6 py-4">Show Time</th>
                  <th className="px-6 py-4">Qty.</th>
                  <th className="px-6 py-4">Price</th>
                  <th className="px-6 py-4">BookedAt</th>


                </tr>
              </thead>
              <tbody>
                {tickets.map((tick, index) => (
                  <tr key={tick._id} className={`${index % 2 === 0 ? "bg-white" : "bg-gray-50"
                    } hover:bg-gray-100 transition-all`}
                  >
                    <td className="px-4 py-2">{index + 1}</td>
                    <td className="px-4 py-2">{tick.movie_name}</td>
                    <td className="px-4 py-2">{tick.user_id.name}</td>
                    <td className="px-4 py-2">
                      {tick.show_time}
                    </td>
                    <td className="px-4 py-2 ">{tick.quantity}</td>
                    <td className="px-4 py-2 font-semibold">
                      ₹{tick.total_price}
                    </td>

                    <td className="px-4 py-2">
                      {format(new Date(tick.booked_at), "dd MMM yyyy, hh:mm a")}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>


          ) : (
            <div className="text-center text-gray-600 mt-6">
              No orders available.
            </div>
          )}
        </div>
      </div>

    </>
  )
}

export default ViewTickets