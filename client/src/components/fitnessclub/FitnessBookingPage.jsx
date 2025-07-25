// components/FitnessBookingPage.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useAuth } from "../../context/AuthContext"

const membershipPrices = {
    Silver: 500,
    Gold: 1000,
    Platinum: 1500,
};

const FitnessBookingPage = () => {
    const [clubs, setClubs] = useState([]);
    const [selectedClubId, setSelectedClubId] = useState("");
    const [selectedServices, setSelectedServices] = useState([]);
    const [membershipType, setMembershipType] = useState("");
    const { user } = useAuth()
    const selectedClub = clubs.find((club) => club._id === selectedClubId);

    const [clubData, setClubData] = useState([])

    useEffect(() => {
        const fetchBookings = async () => {


            try {

                const res = await axios.get(`http://localhost:8000/api/v1/club-booking/${user._id}`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                });
                setClubData(res.data.bookings);
            } catch (err) {
                console.error("Failed to fetch bookings", err);
            }

        };

        fetchBookings();
    }, []);

    useEffect(() => {
        const fetchClubs = async () => {
            try {

                const { data } = await axios.get(`http://localhost:8000/api/v1/fitness`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                });
                if (data.success) setClubs(data.clubs);
            } catch (err) {
                toast.error("Failed to fetch fitness clubs");
            }
        };
        fetchClubs();
    }, []);

    const toggleService = (service) => {
        setSelectedServices((prev) =>
            prev.includes(service)
                ? prev.filter((s) => s !== service)
                : [...prev, service]
        );
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!selectedClubId || !membershipType || selectedServices.length === 0) {
            return toast.error("Please fill all fields");
        }

        const payload = {
            club_id: selectedClubId,
            user_id: user._id,
            selected_services: selectedServices,
            membership_type: membershipType,
            membership_fee: membershipPrices[membershipType],
        };

        try {
            const response = await axios.post(
                "http://localhost:8000/api/v1/club-booking/add",
                payload,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                }
            );

            if (response.data.success) {
                toast.success("Fitness club booked!");
                setSelectedClubId("");
                setSelectedServices([]);
                setMembershipType("");

                // Immediately show the new booking on page without refresh
                setClubData((prev) => [...prev, response.data.booking]);
            }
        } catch (err) {
            toast.error("Booking failed");
        }
    };

    // const handleSubmit = async (e) => {
    //     e.preventDefault();

    //     if (!selectedClubId || !membershipType || selectedServices.length === 0) {
    //         return toast.error("Please fill all fields");
    //     }


    //     const payload = {
    //         club_id: selectedClubId,
    //         user_id: user._id,
    //         selected_services: selectedServices,
    //         membership_type: membershipType,
    //         membership_fee: membershipPrices[membershipType],
    //     };
    //     // alert(`Payload is ${JSON.stringify(payload)}`)
    //     try {
    //         const response = await axios.post(
    //             "http://localhost:8000/api/v1/club-booking/add",
    //             payload,
    //             {
    //                 headers: {
    //                     Authorization: `Bearer ${localStorage.getItem("token")}`,
    //                 },
    //             }
    //         );

    //         if (response.data.success) {
    //             toast.success("Fitness club booked!");
    //             setSelectedClubId("");
    //             setSelectedServices([]);
    //             setMembershipType("");
    //         }
    //     } catch (err) {
    //         toast.error("Booking failed");
    //     }
    // };

    return (
        <div className="max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-xl">
            <h2 className="text-2xl font-bold mb-4">Book Your Fitness Club</h2>

            <form onSubmit={handleSubmit} className="space-y-4">

                <select
                    className="w-full border p-2 rounded"
                    value={selectedClubId}
                    onChange={(e) => {
                        setSelectedClubId(e.target.value);
                        setSelectedServices([]);
                    }}
                >
                    <option value="">Select a Club</option>
                    {clubs.map((club) => (
                        <option key={club._id} value={club._id}>
                            {club.club_name}
                        </option>
                    ))}
                </select>

                {selectedClub && (
                    <div>
                        <h3 className="font-semibold mb-2">Services Offered</h3>
                        <div className="grid grid-cols-2 gap-2">
                            {selectedClub.services.map((service) => (
                                <label key={service} className="flex items-center gap-2">
                                    <input
                                        type="checkbox"
                                        checked={selectedServices.includes(service)}
                                        onChange={() => toggleService(service)}
                                    />
                                    <span>{service}</span>
                                </label>
                            ))}
                        </div>
                    </div>
                )}

                <div className="mt-4">
                    <h4 className="mb-2 font-medium">Membership Type</h4>
                    {["Silver", "Gold", "Platinum"].map((type) => (
                        <label key={type} className="block mb-1">
                            <input
                                type="radio"
                                name="membership"
                                value={type}
                                checked={membershipType === type}
                                onChange={(e) => setMembershipType(e.target.value)}
                            />
                            <span className="ml-2">
                                {type} - ₹{membershipPrices[type]}
                            </span>
                        </label>
                    ))}
                </div>

                <button
                    type="submit"
                    className="w-full py-2 bg-green-600 text-white rounded hover:bg-green-700"
                >
                    Book Now
                </button>
            </form>

            <div>
                <div className="max-w-3xl mx-auto mt-10">
                    <h2 className="text-xl font-bold mb-4">Your Booked Fitness Clubs</h2>
                    {clubData.map((booking) => (
                        <div
                            key={booking._id}
                            className="bg-white p-4 shadow rounded mb-4 border"
                        >
                            <h3 className="text-lg font-semibold">{booking.club_name}</h3>
                            <p className="text-sm text-gray-600">
                                Membership: {booking.membership_type} (₹{booking.membership_fee})
                            </p>

                            <p className="text-xs text-gray-500">
                                Booked on: {new Date(booking.booking_date).toLocaleString()}
                            </p>
                            {/* 
                             */}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default FitnessBookingPage;
