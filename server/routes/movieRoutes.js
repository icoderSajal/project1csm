import express from "express";
import {
    createMovie,
    getAllMovies,
    getMovieById,
    updateMovie,
    deleteMovie
} from "../controller/movieController.js"
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// Movie CRUD routes
router.post("/add", authMiddleware, createMovie);           // Create movie
router.get("/", authMiddleware, getAllMovies);           // Read all movies
router.get("/:id", authMiddleware, getMovieById);        // Read single movie
router.put("/:id", authMiddleware, updateMovie);         // Update movie
router.delete("/:id", authMiddleware, deleteMovie);      // Delete movie

export default router;
