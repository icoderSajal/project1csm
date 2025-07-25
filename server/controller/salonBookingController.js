import BookingSalon from "../models/BookingSalon.js";

export const createBooking = async (req, res) => {
    try {
        const { salon_id, user_id, selected_services, appointment_date, slot } = req.body;

        if (!salon_id || !user_id || !selected_services?.length || !appointment_date || !slot) {
            return res.status(400).json({ success: false, message: "All fields are required." });
        }

        const booking = await BookingSalon.create({
            salon_id,
            user_id,
            selected_services,
            appointment_date,
            slot,
        });

        res.status(201).json({ success: true, booking });
    } catch (error) {
        console.error("Booking error:", error);
        res.status(500).json({ success: false, message: "Booking failed", error: error.message });
    }
}

// GET: User's booking history (optional)
export const getBookingsByUser = async (req, res) => {
    try {
        const bookings = await BookingSalon.find({ user_id: req.params.userId })
            .populate("salon_id", "salon_name")
            .sort({ createdAt: -1 });

        res.json({ success: true, bookings });
    } catch (error) {
        res.status(500).json({ success: false, message: "Failed to fetch bookings" });
    }
}


export const getAllBookings = async (req, res) => {
    try {
        const bookings = await BookingSalon.aggregate([
            {
                $lookup: {
                    from: "salons", // collection name in MongoDB (lowercase plural)
                    localField: "salon_id",
                    foreignField: "_id",
                    as: "salon"
                }
            },
            { $unwind: "$salon" },
            {
                $lookup: {
                    from: "users", // collection name in MongoDB (lowercase plural)
                    localField: "user_id",
                    foreignField: "_id",
                    as: "user"
                }
            },
            { $unwind: "$user" },
            {
                $addFields: {
                    total_amount: {
                        $sum: "$selected_services.price"
                    },
                    services_booked: {
                        $map: {
                            input: "$selected_services",
                            as: "service",
                            in: "$$service.name"
                        }
                    }
                }
            },
            {
                $project: {
                    _id: 0,
                    salon_name: "$salon.salon_name",
                    user_name: "$user.name",
                    appointment_date: 1,
                    slot: 1,
                    services_booked: 1,
                    total_amount: 1
                }
            },
            {
                $sort: { createdAt: -1 } // latest bookings first
            }
        ]);

        res.status(200).json({ success: true, bookings });
    } catch (error) {
        console.error("Error fetching salon booking details:", error);
        res.status(500).json({ success: false, message: "Server Error" });
    }
};
