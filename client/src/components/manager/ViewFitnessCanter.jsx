
import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import moment from "moment" // for formatting dates

const ViewFitnessCanter = () => {

    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);


    const fetchFitnessBookings = async () => {
        try {
            const token = localStorage.getItem("token");
            const res = await axios.get("http://localhost:8000/api/v1/club-booking", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            if (res.data.success) {

                setBookings(res.data.bookings)
            }



        } catch (err) {
            console.error(`Error fetching fitness bookings:, ${err}`);
            toast.error("Failed to load fitness bookings");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchFitnessBookings();
    }, []);


    return (
        <>
            <div className="p-6">
                <h2 className="text-2xl font-bold mb-4">Fitness Club Bookings</h2>

                {loading ? (
                    <p className="text-center text-gray-500">Loading...</p>
                ) : bookings.length === 0 ? (
                    <p className="text-center text-gray-500">No bookings available.</p>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
                            <thead className="bg-gray-100 text-gray-700 text-sm">
                                <tr>
                                    <th className="px-4 py-2 text-left">Club Name</th>
                                    <th className="px-4 py-2 text-left">User Name</th>
                                    <th className="px-4 py-2 text-left">Amount Paid</th>
                                    <th className="px-4 py-2 text-left">Join Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                {bookings.map((booking, idx) => (
                                    <tr key={idx} className="border-t hover:bg-gray-50">
                                        <td className="px-4 py-2">
                                            {booking.club_id?.club_name || "N/A"}
                                        </td>
                                        <td className="px-4 py-2">{booking.user_id?.name}</td>
                                        <td className="px-4 py-2 text-green-600 font-medium">
                                            ₹{booking.membership_fee}
                                        </td>
                                        <td className="px-4 py-2">
                                            {moment(booking.booking_date).format("DD MMM YYYY")}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

        </>
    )
}

export default ViewFitnessCanter