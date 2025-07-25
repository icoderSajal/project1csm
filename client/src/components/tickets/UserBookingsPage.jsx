// UserBookingsPage.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";


const UserBookingsPage = () => {
    const [bookings, setBookings] = useState([]);
    const { user } = useAuth();

    useEffect(() => {
        const fetchBookings = async () => {
            try {
                const res = await axios.get(
                    `http://localhost:8000/api/v1/booking/${user._id}`,
                    {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem("token")}`,
                        },
                    }
                );
                setBookings(res.data.bookings);
            } catch (error) {
                console.error("Error fetching bookings:", error);
            }
        };

        fetchBookings();
    }, [user._id]);

    return (
        <div className="min-h-screen bg-[0000] backdrop-blur p-6">
            <h2 className="text-2xl font-bold mb-4">My Bookings</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {bookings.map((booking) => (
                    <div key={booking._id} className="rounded-lg p-4 shadow bg-gradient-to-br from-blue-200 to-blue-800">
                        <h3 className="text-xl font-semibold">{booking.movie_name}</h3>
                        <p><strong>Show Time:</strong> {booking.show_time}</p>
                        <p><strong>Category:</strong> {booking.category}</p>
                        <p><strong>Tickets:</strong> {booking.quantity}</p>
                        <p><strong>Total:</strong> ₹{booking.total_price}</p>
                        <p className="text-gray-500 text-sm">
                            Booked At: {new Date(booking.booked_at).toLocaleString()}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default UserBookingsPage;
