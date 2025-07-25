// controllers/bookingController.js
import Booking from "../models/Booking.js";
import Movie from "../models/Movie.js";

export const bookTicket = async (req, res) => {
    try {
        const { movie_id, show_time, category, quantity } = req.body;
        const user_id = req.user._id;

        const movie = await Movie.findById(movie_id);
        if (!movie) return res.status(404).json({ success: false, message: "Movie not found" });

        const price = movie.ticket_price[category.toLowerCase()];
        if (!price) return res.status(400).json({ success: false, message: "Invalid category" });

        const total_price = price * quantity;

        const booking = new Booking({
            user_id,
            movie_id,
            movie_name: movie.movie_name,
            show_time,
            category,
            quantity,
            total_price,
        });

        await booking.save();
        res.status(201).json({ success: true, message: "Booking successful", booking });
    } catch (error) {
        console.error("Booking Error:", error);
        res.status(500).json({ success: false, message: "Server Error" });
    }
};

export const getUserBookings = async (req, res) => {
    const user_id = req.user._id;
    try {
        const bookings = await Booking.find({ user_id: user_id }).populate("movie_id");
        res.json({ success: true, bookings });
    } catch (error) {
        console.error("Get Bookings Error:", error);
        res.status(500).json({ success: false, message: "Server Error" });
    }
};

export const getAllBookings = async (req, res) => {
    try {
        const booking = await Booking.find().populate("user_id");
        res.json({ success: true, booking });
    } catch (error) {
        console.error("Get Bookings Error:", error);
        res.status(500).json({ success: false, message: "Server Error" });
    }
};
