import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";



const ViewSalons = () => {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchBookings = async () => {
        try {

            const token = localStorage.getItem("token");
            const res = await axios.get("http://localhost:8000/api/v1/booking-salon", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            if (res.data.success) {

                setBookings(res.data.bookings)
            }

        } catch (error) {
            console.error("Failed to fetch bookings", error);
            toast.error("Failed to load salon bookings");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchBookings();
    }, []);
    return (
        <>
            <div className="p-6">
                <h2 className="text-2xl font-bold mb-4">Salon Bookings</h2>

                {loading ? (
                    <div className="text-center text-gray-500">Loading...</div>
                ) : bookings.length === 0 ? (
                    <div className="text-center text-gray-500">No bookings found.</div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
                            <thead className="bg-gray-100">
                                <tr>
                                    <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">Salon Name</th>
                                    <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">User Name</th>
                                    <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">Appointment Date</th>
                                    <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">Slot</th>
                                    <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">Services Booked</th>
                                    <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">Total Amount</th>
                                </tr>
                            </thead>
                            <tbody>
                                {bookings.map((booking, index) => (
                                    <tr key={index} className="border-b hover:bg-gray-50">
                                        <td className="px-4 py-2">{booking.salon_name}</td>
                                        <td className="px-4 py-2">{booking.user_name}</td>
                                        <td className="px-4 py-2">{booking.appointment_date}</td>
                                        <td className="px-4 py-2">{booking.slot}</td>
                                        <td className="px-4 py-2">
                                            <ul className="list-disc pl-4">
                                                {booking.services_booked.map((service, idx) => (
                                                    <li key={idx}>{service}</li>
                                                ))}
                                            </ul>
                                        </td>
                                        <td className="px-4 py-2 font-semibold text-green-600">₹{booking.total_amount}</td>
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

export default ViewSalons
