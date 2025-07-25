import Movie from "../models/Movie.js"

// Create a new movie
export const createMovie = async (req, res) => {
    try {
        const movie = new Movie(req.body);
        const saved = await movie.save();
        res.status(201).json({ success: true, movie: saved });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
};

// Get all movies
export const getAllMovies = async (req, res) => {
    try {
        const movies = await Movie.find().sort({ createdAt: -1 });
        res.status(200).json({ success: true, movies });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
};

// Get a single movie
export const getMovieById = async (req, res) => {
    try {
        const movie = await Movie.findById(req.params.id);
        if (!movie) return res.status(404).json({ success: false, message: "Movie not found" });
        res.status(200).json({ success: true, movie });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
};

// Update movie
export const updateMovie = async (req, res) => {
    try {
        const updated = await Movie.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json({ success: true, movie: updated });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
};

// Delete movie
export const deleteMovie = async (req, res) => {
    try {
        await Movie.findByIdAndDelete(req.params.id);
        res.status(200).json({ success: true, message: "Movie deleted" });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
};
