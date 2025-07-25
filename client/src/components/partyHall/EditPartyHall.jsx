import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";

const EditPartyHall = () => {
    const [form, setForm] = useState({
        hall_name: "",
        location: "",
        capacity: "",

    });

    const [amenities, setAmenities] = useState([{ name: "", price: "" }]);
    const navigate = useNavigate();
    const { id } = useParams();

    // Fetch existing salon data
    useEffect(() => {
        const fetchHall = async () => {
            try {
                const res = await axios.get(`http://localhost:8000/api/v1/party-hall/${id}`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                });
                if (res.data.success) {
                    const hall = res.data.hall;
                    setForm({
                        hall_name: hall.hall_name,

                        location: hall.location,
                        capacity: hall.capacity,

                    });
                    setAmenities(hall.amenities || []);
                }
            } catch (error) {
                toast.error("Failed to load salon");
            }
        };

        fetchHall();
    }, [id]);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleServiceChange = (i, field, val) => {
        const updated = [...amenities];
        updated[i][field] = val;
        setAmenities(updated);
    };


    const addAmenities = () => setAmenities([...amenities, { name: "", price: "" }]);


    const handleSubmit = async (e) => {
        e.preventDefault();

        const token = localStorage.getItem("token");
        if (!token) return toast.error("User not authenticated");

        for (let a of amenities) {
            if (!a.name || !a.price) {
                return toast.error("All services must have a name and price.");
            }
        }

        try {
            const payload = {
                ...form,

                amenities: amenities.map((a) => ({
                    name: a.name,
                    price: Number(a.price),
                })),
            };

            const res = await axios.put(
                `http://localhost:8000/api/v1/party-hall/${id}`,
                payload,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                }
            );

            if (res.data.success) {
                toast.success("Party Hall Updated Successfully");

                navigate("/admin-dashboard/party-halls");

            } else {
                toast.error("Failed to update salon");
            }

        } catch (err) {
            console.error(err);
            toast.error("Error updating hall");
        }
    };

    return (
        <div className="max-w-2xl mx-auto p-6 bg-amber-50 rounded-2xl">
            <h1 className="text-xl font-bold mb-4">Update Salon</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <input type="text" name="hall_name" placeholder="Party Hall Name" value={form.hall_name} onChange={handleChange} className="w-full border p-2 rounded" required />
                <input type="text" name="location" placeholder="Party Hall Location" value={form.location} onChange={handleChange} className="w-full border p-2 rounded" required />

                <input type="number" name="capacity" placeholder="Person Capacity" value={form.capacity} onChange={handleChange} className="w-full border p-2 rounded" />

                <div>
                    <h2 className="font-semibold">Amenities</h2>
                    {amenities.map((amenitie, i) => (
                        <div key={i} className="flex gap-2 mb-2">
                            <input type="text" placeholder="Service Name" value={amenitie.name} onChange={(e) => handleServiceChange(i, "name", e.target.value)} className="border p-2 w-full rounded" />
                            <input type="number" placeholder="Price" value={amenitie.price} onChange={(e) => handleServiceChange(i, "price", e.target.value)} className="border p-2 w-32 rounded" />
                        </div>
                    ))}
                    <button type="button" onClick={addAmenities} className="text-blue-600 text-sm">+ Add Service</button>
                </div>

                <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Update</button>
                {"  "}
                <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded" onClick={() => navigate("/admin-dashboard/party-halls")}>Back</button>

            </form>
        </div>
    );
};

export default EditPartyHall;
