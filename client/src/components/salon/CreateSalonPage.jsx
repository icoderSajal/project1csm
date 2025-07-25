import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate, Link } from "react-router-dom";

const CreateSalonPage = () => {
    const [form, setForm] = useState({
        salon_name: "",
        opening_time: "",
        closing_time: "",
        specialist_haircut: "",
        specialist_manicure: "",
    });
    const [loading, setLoading] = useState(false)

    const [services, setServices] = useState([{ name: "", price: "" }]);
    const navigate = useNavigate()
    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleServiceChange = (i, field, val) => {
        const updated = [...services];
        updated[i][field] = val;
        setServices(updated);
    };

    const addService = () => setServices([...services, { name: "", price: "" }]);


    const handleSubmit = async (e) => {
        e.preventDefault();

        const token = localStorage.getItem("token");
        if (!token) return toast.error("User not authenticated");

        // Validate services
        for (let s of services) {
            if (!s.name || !s.price) {
                return toast.error("All services must have a name and price.");
            }
        }

        try {
            const payload = {
                ...form,
                opening_time: new Date(`1970-01-01T${form.opening_time}`), // convert to Date
                closing_time: new Date(`1970-01-01T${form.closing_time}`), // convert to Date
                services: services.map((s) => ({
                    name: s.name,
                    price: Number(s.price),
                })),
            };

            console.log("Payload:", payload);

            const res = await axios.post(
                `http://localhost:8000/api/v1/salon/add`,
                payload,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json"
                    }
                }
            );

            if (res.data.success) {
                toast.success("Salon Created Successfully");
                setForm({
                    salon_name: "",
                    opening_time: "",
                    closing_time: "",
                    specialist_haircut: "",
                    specialist_manicure: "",
                });
                setServices([{ name: "", price: "" }]);
                navigate(`/admin-dashboard/salons`)
            } else {
                toast.error("Failed to create salon");
            }

        } catch (err) {
            console.error("Error:", err.response?.data || err.message);
            toast.error(`Error creating salon: ${err.response?.data?.message || err.message}`);
        }
    };


    return (
        <div className="max-w-2xl mx-auto p-6 bg-amber-50 rounded-2xl">
            <h1 className="text-xl font-bold mb-4">Create Salon</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <input type="text" name="salon_name" placeholder="Salon Name" value={form.salon_name} onChange={handleChange} className="w-full border p-2 rounded" required />
                <div className="flex gap-2">
                    <input type="time" name="opening_time" value={form.opening_time} onChange={handleChange} className="border p-2 w-full rounded" required />
                    <input type="time" name="closing_time" value={form.closing_time} onChange={handleChange} className="border p-2 w-full rounded" required />
                </div>
                <input type="text" name="specialist_haircut" placeholder="Haircut Specialist" value={form.specialist_haircut} onChange={handleChange} className="w-full border p-2 rounded" />
                <input type="text" name="specialist_manicure" placeholder="Manicure Specialist" value={form.specialist_manicure} onChange={handleChange} className="w-full border p-2 rounded" />

                <div>
                    <h2 className="font-semibold">Services</h2>
                    {services.map((service, i) => (
                        <div key={i} className="flex gap-2 mb-2">
                            <input type="text" placeholder="Service Name" value={service.name} onChange={(e) => handleServiceChange(i, "name", e.target.value)} className="border p-2 w-full rounded" />
                            <input type="number" placeholder="Price" value={service.price} onChange={(e) => handleServiceChange(i, "price", e.target.value)} className="border p-2 w-32 rounded" />
                        </div>
                    ))}
                    <button type="button" onClick={addService} className="text-blue-600 text-sm">+ Add Service</button>
                </div>
                <div className="flex justify-end gap-4 items-center mt-5">



                    <button
                        type="submit"
                        disabled={loading}
                        className="bg-teal-500 text-white px-6 py-2 font-bold rounded-lg hover:bg-teal-800 transition duration-300  perfectcase"
                    >
                        {loading ? (
                            <>
                                <svg
                                    className="animate-spin h-5 w-5 text-white"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                >
                                    <circle
                                        className="opacity-25"
                                        cx="12"
                                        cy="12"
                                        r="10"
                                        stroke="currentColor"
                                        strokeWidth="4"
                                    ></circle>
                                    <path
                                        className="opacity-75"
                                        fill="currentColor"
                                        d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                                    ></path>
                                </svg>
                                Loading...
                            </>
                        ) : (
                            "Save"
                        )}

                    </button>
                    <Link

                        className="bg-teal-500 text-white px-6 py-2 font-bold rounded-lg hover:bg-teal-800 transition duration-300  perfectcase"
                        to="/admin-dashboard/salons"
                    >
                        Back
                    </Link>

                </div>


            </form>
        </div>
    );
};

export default CreateSalonPage;
