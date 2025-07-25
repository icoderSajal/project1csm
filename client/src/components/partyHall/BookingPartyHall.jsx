// import { useState, useEffect } from 'react';
// import axios from 'axios';
// import toast from 'react-hot-toast';
// import { useAuth } from "../../context/AuthContext";


// const BookingPartyHall = ({ onBooked }) => {
//     const [salons, setSalons] = useState([]);
//     const [selectedSalonId, setSelectedSalonId] = useState("");
//     const [selectedServices, setSelectedServices] = useState([]);
//     const [date, setDate] = useState('');
//     const [slot, setSlot] = useState('');

//     const { user } = useAuth();
//     const selectedSalon = salons.find((salon) => salon._id === selectedSalonId);

//     // Fetch all salons
//     useEffect(() => {
//         const fetchSalons = async () => {
//             try {
//                 const res = await axios.get("http://localhost:8000/api/v1/party-hall", {
//                     headers: {
//                         Authorization: `Bearer ${localStorage.getItem("token")}`,
//                     },
//                 });
//                 if (res.data.success) {
//                     setSalons(res.data.halls);
//                 } else {
//                     toast.error("Failed to load salons.");
//                 }
//             } catch (err) {
//                 console.error("Salon fetch error:", err);
//                 toast.error("Error fetching salons.");
//             }
//         };
//         fetchSalons();
//     }, []);

//     // Toggle service selection
//     const toggleService = (service) => {
//         const exists = selectedServices.find(s => s._id === service._id);
//         if (exists) {
//             setSelectedServices(prev => prev.filter(s => s._id !== service._id));
//         } else {
//             setSelectedServices(prev => [...prev, service]);
//         }
//     };

//     // Total cost calculation
//     const getTotalPrice = () => {
//         return selectedServices.reduce((acc, s) => acc + s.price, 0);
//     };

//     // Submit form
//     const handleSubmit = async (e) => {
//         e.preventDefault();

//         // Validation
//         if (!selectedSalonId || !date || !slot || selectedServices.length === 0) {
//             return toast.error("All fields are required.");
//         }


//         const payload = {
//             salon_id: selectedSalonId,
//             user_id: user._id,
//             selected_services: selectedServices,
//             appointment_date: date,
//             slot: slot,
//         };

//         console.log("📦 Booking Payload:", payload);

//         try {
//             const res = await axios.post("http://localhost:8000/api/v1/party-booking/booking", payload, {
//                 headers: {
//                     Authorization: `Bearer ${localStorage.getItem("token")}`,
//                     "Content-Type": "application/json"
//                 },
//             });

//             if (res.data.success) {
//                 toast.success("Booking successful!");
//                 onBooked?.(); // Optional callback

//                 // Reset form
//                 setSelectedSalonId('');
//                 setSelectedServices([]);
//                 setDate('');
//                 setSlot('');
//             } else {
//                 toast.error(res.data.message || "Booking failed.");
//             }
//         } catch (err) {
//             console.error("Booking Error:", err.response || err);
//             toast.error(err.response?.data?.message || "Booking request failed.");
//         }
//     };

//     return (
//         <div className="max-w-xl mx-auto p-6 bg-white rounded-xl shadow-md">
//             <form onSubmit={handleSubmit} className="space-y-4 bg-amber-50 p-6 rounded-xl shadow-md">
//                 <h2 className="text-xl font-bold text-gray-800">Book Your Appointment</h2>

//                 <select
//                     className="w-full border p-2 rounded"
//                     value={selectedSalonId}
//                     onChange={(e) => {
//                         setSelectedSalonId(e.target.value);
//                         setSelectedServices([]);
//                     }}
//                 >
//                     <option value="">Select a Hall</option>
//                     {salons.map((salon) => (
//                         <option key={salon._id} value={salon._id}>
//                             {salon.hall_name}
//                         </option>
//                     ))}
//                 </select>

//                 {selectedSalon && (
//                     <div>
//                         <h3 className="font-semibold mb-2">Available Services</h3>
//                         <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
//                             {selectedSalon.services.map((service) => (
//                                 <label key={service._id} className="flex items-center gap-2">
//                                     <input
//                                         type="checkbox"
//                                         checked={selectedServices.some(s => s._id === service._id)}
//                                         onChange={() => toggleService(service)}
//                                         className="form-checkbox text-indigo-600"
//                                     />
//                                     <span>{service.name} - ₹{service.price}</span>
//                                 </label>
//                             ))}
//                         </div>
//                     </div>
//                 )}

//                 {selectedServices.length > 0 && (
//                     <div className="bg-indigo-100 p-3 rounded mt-4">
//                         <h4 className="font-medium">Selected Services:</h4>
//                         <ul className="list-disc pl-5 text-sm text-gray-800">
//                             {selectedServices.map((s) => (
//                                 <li key={s._id}>{s.name} - ₹{s.price}</li>
//                             ))}
//                         </ul>
//                         <div className="font-bold mt-2">Total: ₹{getTotalPrice()}</div>
//                     </div>
//                 )}

//                 <input
//                     type="date"
//                     className="w-full px-4 py-2 border rounded-lg"
//                     value={date}
//                     onChange={(e) => setDate(e.target.value)}
//                 />

//                 <input
//                     type="time"
//                     className="w-full px-4 py-2 border rounded-lg"
//                     value={slot}
//                     onChange={(e) => setSlot(e.target.value)}
//                 />

//                 <button
//                     type="submit"
//                     className="w-full py-2 font-semibold text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition"
//                 >
//                     Book Now
//                 </button>
//             </form>
//         </div>
//     );
// };

// export default BookingPartyHall;


import { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useAuth } from "../../context/AuthContext";

const BookingPartyHall = ({ onBooked }) => {
    const [halls, setHalls] = useState([]);
    const [selectedHallId, setSelectedHallId] = useState("");
    const [selectedAmenities, setSelectedAmenities] = useState([]);
    const [date, setDate] = useState("");
    const [time, setTime] = useState("");

    const { user } = useAuth();

    const selectedHall = halls.find((hall) => hall._id === selectedHallId);

    // Fetch all party halls
    useEffect(() => {
        const fetchHalls = async () => {
            try {
                const res = await axios.get("http://localhost:8000/api/v1/party-hall", {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                });

                if (res.data.success) {
                    setHalls(res.data.halls);
                } else {
                    toast.error("Failed to load halls.");
                }
            } catch (err) {
                console.error("Error fetching halls:", err);
                toast.error("Error loading party halls.");
            }
        };

        fetchHalls();
    }, []);

    // Toggle amenity selection
    const toggleAmenity = (amenity) => {
        const exists = selectedAmenities.find((a) => a.name === amenity.name);
        if (exists) {
            setSelectedAmenities((prev) =>
                prev.filter((a) => a.name !== amenity.name)
            );
        } else {
            setSelectedAmenities((prev) => [...prev, amenity]);
        }
    };

    // Total cost calculation
    const getTotalPrice = () => {
        return selectedAmenities.reduce((acc, a) => acc + a.price, 0);
    };

    // Handle submit
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!selectedHallId || !date || !time || selectedAmenities.length === 0) {
            return toast.error("All fields are required.");
        }

        const payload = {
            hall_id: selectedHallId,
            user_id: user._id,
            selected_services: selectedAmenities,
            date,
            time,
        };

        console.log("📦 Booking Payload:", payload);

        try {
            const res = await axios.post("http://localhost:8000/api/v1/party-booking/booking", payload, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                    "Content-Type": "application/json"
                },
            });

            if (res.data.success) {
                toast.success("Party hall booked successfully!");
                onBooked?.();

                // Reset form
                setSelectedHallId("");
                setSelectedAmenities([]);
                setDate("");
                setTime("");
            } else {
                toast.error(res.data.message || "Booking failed.");
            }
        } catch (err) {
            console.error("Booking Error:", err.response || err);
            toast.error(err.response?.data?.message || "Booking request failed.");
        }
    };

    return (
        <div className="max-w-xl mx-auto p-6 bg-white rounded-xl shadow-md">
            <form onSubmit={handleSubmit} className="space-y-4 bg-blue-50 p-6 rounded-xl shadow-md">
                <h2 className="text-xl font-bold text-gray-800">Book a Party Hall</h2>

                <select
                    className="w-full border p-2 rounded"
                    value={selectedHallId}
                    onChange={(e) => {
                        setSelectedHallId(e.target.value);
                        setSelectedAmenities([]);
                    }}
                >
                    <option value="">Select a Hall</option>
                    {halls.map((hall) => (
                        <option key={hall._id} value={hall._id}>
                            {hall.hall_name} - {hall.location} (Capacity: {hall.capacity})
                        </option>
                    ))}
                </select>

                {selectedHall && (
                    <div>
                        <h3 className="font-semibold mb-2">Available Amenities</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            {selectedHall.amenities.map((amenity, index) => (
                                <label key={index} className="flex items-center gap-2">
                                    <input
                                        type="checkbox"
                                        checked={selectedAmenities.some((a) => a.name === amenity.name)}
                                        onChange={() => toggleAmenity(amenity)}
                                        className="form-checkbox text-indigo-600"
                                    />
                                    <span>{amenity.name} - ₹{amenity.price}</span>
                                </label>
                            ))}
                        </div>
                    </div>
                )}

                {selectedAmenities.length > 0 && (
                    <div className="bg-green-100 p-3 rounded mt-4">
                        <h4 className="font-medium">Selected Amenities:</h4>
                        <ul className="list-disc pl-5 text-sm text-gray-800">
                            {selectedAmenities.map((a, i) => (
                                <li key={i}>{a.name} - ₹{a.price}</li>
                            ))}
                        </ul>
                        <div className="font-bold mt-2">Total: ₹{getTotalPrice()}</div>
                    </div>
                )}

                <input
                    type="date"
                    className="w-full px-4 py-2 border rounded-lg"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                />

                <input
                    type="time"
                    className="w-full px-4 py-2 border rounded-lg"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                />

                <button
                    type="submit"
                    className="w-full py-2 font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition"
                >
                    Book Party Hall
                </button>
            </form>
        </div>
    );
};

export default BookingPartyHall;

