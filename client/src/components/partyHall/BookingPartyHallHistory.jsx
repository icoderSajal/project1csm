import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useAuth } from "../../context/AuthContext";
const BookingPartyHallHistory = () => {
    const [bookings, setBookings] = useState([]);
    const { user } = useAuth();

    useEffect(() => {
        if (!user?._id) {
            toast.error("User not found");
            return;
        }

        const fetchBookings = async () => {
            try {
                const res = await axios.get(`http://localhost:8000/api/v1/party-booking/${user._id}`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                });

                if (res.data.success) {
                    setBookings(res.data.bookings);
                } else {
                    toast.error("Failed to load bookings");
                }
            } catch (error) {
                console.error("Error fetching bookings:", error);
                toast.error("Error fetching bookings");
            }
        };

        fetchBookings();
    }, [user]);

    if (!bookings.length) {
        return (
            <div className="max-w-3xl mx-auto mt-8 p-4 text-center text-gray-600">
                No bookings found.
            </div>
        );
    }

    return (
        <div className="max-w-3xl mx-auto mt-8 p-6 bg-white rounded-xl shadow-md">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Your Bookings</h2>
            <div className="space-y-4">
                {bookings.map((booking) => (
                    <div
                        key={booking._id}
                        className="bg-amber-50 border border-amber-200 rounded-lg p-4 shadow-sm"
                    >
                        <h3 className="text-lg font-semibold text-indigo-700">
                            {booking.salon_id?.salon_name}
                        </h3>
                        <p className="text-sm text-gray-600">
                            Booking Details: <strong>{booking.date}</strong> at <strong>{booking.time}</strong>
                        </p>
                        <div className="mt-2">
                            <h4 className="font-medium text-gray-700">Services:</h4>
                            <ul className="list-disc list-inside text-sm text-gray-800">
                                {booking.selected_services.map((service, index) => (
                                    <li key={index}>{service.name} - ₹{service.price}</li>
                                ))}
                            </ul>
                        </div>
                        <p className="text-right mt-2 text-sm text-gray-500">
                            Booked on {new Date(booking.createdAt).toLocaleString()}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default BookingPartyHallHistory;
