// import { useEffect, useState } from "react";
// import axios from "axios";
// import toast from "react-hot-toast";
// import { useAuth } from "../../context/AuthContext";

// const PartyBookingPage = () => {
//     const { user } = useAuth();
//     const [halls, setHalls] = useState([]);
//     const [form, setForm] = useState({
//         hall_id: "",
//         date: "",
//         time: "",
//         guests: "",
//     });

//     const getHalls1 = async () => {
//         try {
//             const response = await axios.get("http://localhost:8000/api/v1/party-hall", {
//                 headers: {
//                     Authorization: `Bearer ${localStorage.getItem("token")}`,
//                 },
//             });
//             if (response.data.success) {
//                 setHalls(response.data.halls);
//                 console.log("Fetched halls:", response.data.halls);
//             }
//         } catch (error) {
//             toast.error("Failed to fetch party halls");
//             console.error(error);
//         }
//     };

//     useEffect(() => {
//         getHalls1();
//     }, []);

//     const handleChange = (e) => {
//         setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         try {
//             const payload = { ...form, user_id: user._id };
//             const { data } = await axios.post("http://localhost:8000/api/v1/party-booking/book", payload, {
//                 headers: {
//                     Authorization: `Bearer ${localStorage.getItem("token")}`,
//                 },
//             });
//             if (data.success) {
//                 toast.success("Booking successful!");
//                 setForm({ hall_id: "", date: "", time: "", guests: "" });
//             } else {
//                 toast.error("Booking failed");
//             }
//         } catch (err) {
//             toast.error("Booking failed");
//         }
//     };

//     return (
//         <div className="max-w-3xl mx-auto p-4 bg-white shadow-md rounded-xl mt-10">
//             <h2 className="text-2xl font-bold mb-6">Book a Party Hall</h2>
//             <form onSubmit={handleSubmit} className="space-y-4">
//                 <select
//                     name="hall_id"
//                     value={form.hall_id}
//                     onChange={handleChange}
//                     className="w-full border p-2 rounded"
//                     required
//                 >
//                     <option value="">Select Hall</option>
//                     {halls.map((hal) => (
//                         <option key={hal._id} value={hal._id}>
//                             {hal.name}
//                         </option>
//                     ))}
//                 </select>

//                 <input
//                     type="date"
//                     name="date"
//                     value={form.date}
//                     onChange={handleChange}
//                     className="w-full border p-2 rounded"
//                     required
//                 />

//                 <input
//                     type="time"
//                     name="time"
//                     value={form.time}
//                     onChange={handleChange}
//                     className="w-full border p-2 rounded"
//                     required
//                 />

//                 <input
//                     type="number"
//                     name="guests"
//                     placeholder="Number of Guests"
//                     value={form.guests}
//                     onChange={handleChange}
//                     className="w-full border p-2 rounded"
//                     required
//                 />

//                 <button
//                     type="submit"
//                     className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
//                 >
//                     Book Now
//                 </button>
//             </form>
//         </div>
//     );
// };


// export default PartyBookingPage;

import { useState } from "react"
import BookingPartyHall from './BookingPartyHall';
import BookingPartyHallHistory from './BookingPartyHallHistory';


const PartyBookingPage = () => {
    const [reload, setReload] = useState(false);

    const handleBooking = () => {
        setReload(prev => !prev); // trigger refresh
    };

    return (
        <div className="min-h-screen bg-gray-100 p-4">
            <BookingPartyHall onBooked={handleBooking} />
            <BookingPartyHallHistory key={reload} />
        </div>
    );
};

export default PartyBookingPage;




