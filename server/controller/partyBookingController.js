
import PartyBooking from "../models/PartyBooking.js";

export const createPartyBooking = async (req, res) => {
    try {
        const { hall_id,
            user_id,
            selected_services,
            date,
            time, } = req.body;

        if (!hall_id || !user_id || !selected_services?.length || !date || !time) {
            return res.status(400).json({ success: false, message: "All fields are required." });
        }

        const booking = await PartyBooking.create({
            hall_id,
            user_id,
            selected_services,
            date,
            time,
        });

        res.status(201).json({ success: true, booking });
    } catch (error) {
        console.error("Booking error:", error);
        res.status(500).json({ success: false, message: "Booking failed", error: error.message });
    }
};

export const getUserPartyBookings = async (req, res) => {
    try {
        const bookings = await PartyBooking.find({ user_id: req.params.userId })
            .populate("hall_id", "hall_name")
            .sort({ createdAt: -1 });

        res.json({ success: true, bookings });
    } catch (error) {
        res.status(500).json({ success: false, message: "Failed to fetch bookings" });
    }
};

export const getAllPartyBookings = async (req, res) => {
    try {
        const bookings = await PartyBooking.aggregate([
            {
                $lookup: {
                    from: "partyhalls", // collection name in MongoDB (lowercase plural)
                    localField: "hall_id",
                    foreignField: "_id",
                    as: "partyhall"
                }
            },
            { $unwind: "$partyhall" },
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
                    hall_name: "$partyhall.hall_name",
                    user_name: "$user.name",
                    date: 1,
                    time: 1,
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

}

