// controllers/fitnessBookingController.js
import FitnessBooking from "../models/FitnessBooking.js"
import Fitness from "../models/Fitness.js";
import mongoose from "mongoose";

export const createFitnessBooking = async (req, res) => {
  try {
    const booking = await FitnessBooking.create(req.body);
    res.status(201).json({ success: true, booking });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};





export const getBookingsByUserId = async (req, res) => {
  const userId = req.params.userId;

  try {
    const bookings = await FitnessBooking.aggregate([
      {
        $match: {
          user_id: new mongoose.Types.ObjectId(userId),
        },
      },
      {
        $lookup: {
          from: "fitnesses", // collection name derived from model 'Fitness'
          localField: "club_id",
          foreignField: "_id",
          as: "clubDetails",
        },
      },
      {
        $unwind: "$clubDetails",
      },
      {
        $project: {
          _id: 1,
          club_name: "$clubDetails.club_name",
          membership_fee: 1,
          booking_date: 1,
        },
      },
      {
        $sort: {
          booking_date: -1,
        },
      },
    ]);

    res.status(200).json({ success: true, bookings });
  } catch (error) {
    console.error("Error fetching user bookings:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

export const getAllClubsBooking = async (req, res) => {


  try {
    //const bookings = await FitnessBooking.find().populate("user_id")

    const bookings = await FitnessBooking.find()
      .populate("user_id", "name email")        // optional: only select necessary fields
      .populate("club_id", "club_name");

    res.status(200).json({ success: true, bookings });
  } catch (error) {
    console.error("Error fetching user bookings:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

