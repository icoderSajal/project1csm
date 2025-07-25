import { useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useAuth } from "../../context/AuthContext";


const BookingSalon = ({ onBooked }) => {
    const [salons, setSalons] = useState([]);
    const [selectedSalonId, setSelectedSalonId] = useState("");
    const [selectedServices, setSelectedServices] = useState([]);
    const [date, setDate] = useState('');
    const [slot, setSlot] = useState('');

    const { user } = useAuth();
    const selectedSalon = salons.find((salon) => salon._id === selectedSalonId);

    // Fetch all salons
    useEffect(() => {
        const fetchSalons = async () => {
            try {
                const res = await axios.get("http://localhost:8000/api/v1/salon", {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                });
                if (res.data.success) {
                    setSalons(res.data.salons);
                } else {
                    toast.error("Failed to load salons.");
                }
            } catch (err) {
                console.error("Salon fetch error:", err);
                toast.error("Error fetching salons.");
            }
        };
        fetchSalons();
    }, []);

    // Toggle service selection
    const toggleService = (service) => {
        const exists = selectedServices.find(s => s._id === service._id);
        if (exists) {
            setSelectedServices(prev => prev.filter(s => s._id !== service._id));
        } else {
            setSelectedServices(prev => [...prev, service]);
        }
    };

    // Total cost calculation
    const getTotalPrice = () => {
        return selectedServices.reduce((acc, s) => acc + s.price, 0);
    };

    // Submit form
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validation
        if (!selectedSalonId || !date || !slot || selectedServices.length === 0) {
            return toast.error("All fields are required.");
        }


        const payload = {
            salon_id: selectedSalonId,
            user_id: user._id,
            selected_services: selectedServices,
            appointment_date: date,
            slot: slot,
        };

        console.log("📦 Booking Payload:", payload);

        try {
            const res = await axios.post("http://localhost:8000/api/v1/booking-salon/booking", payload, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                    "Content-Type": "application/json"
                },
            });

            if (res.data.success) {
                toast.success("Booking successful!");
                onBooked?.(); // Optional callback

                // Reset form
                setSelectedSalonId('');
                setSelectedServices([]);
                setDate('');
                setSlot('');
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
            <form onSubmit={handleSubmit} className="space-y-4 bg-amber-50 p-6 rounded-xl shadow-md">
                <h2 className="text-xl font-bold text-gray-800">Book Your Appointment</h2>

                <select
                    className="w-full border p-2 rounded"
                    value={selectedSalonId}
                    onChange={(e) => {
                        setSelectedSalonId(e.target.value);
                        setSelectedServices([]);
                    }}
                >
                    <option value="">Select a Salon</option>
                    {salons.map((salon) => (
                        <option key={salon._id} value={salon._id}>
                            {salon.salon_name}
                        </option>
                    ))}
                </select>

                {selectedSalon && (
                    <div>
                        <h3 className="font-semibold mb-2">Available Services</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            {selectedSalon.services.map((service) => (
                                <label key={service._id} className="flex items-center gap-2">
                                    <input
                                        type="checkbox"
                                        checked={selectedServices.some(s => s._id === service._id)}
                                        onChange={() => toggleService(service)}
                                        className="form-checkbox text-indigo-600"
                                    />
                                    <span>{service.name} - ₹{service.price}</span>
                                </label>
                            ))}
                        </div>
                    </div>
                )}

                {selectedServices.length > 0 && (
                    <div className="bg-indigo-100 p-3 rounded mt-4">
                        <h4 className="font-medium">Selected Services:</h4>
                        <ul className="list-disc pl-5 text-sm text-gray-800">
                            {selectedServices.map((s) => (
                                <li key={s._id}>{s.name} - ₹{s.price}</li>
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
                    value={slot}
                    onChange={(e) => setSlot(e.target.value)}
                />

                <button
                    type="submit"
                    className="w-full py-2 font-semibold text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition"
                >
                    Book Now
                </button>
            </form>
        </div>
    );
};

export default BookingSalon;
