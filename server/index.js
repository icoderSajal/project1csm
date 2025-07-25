
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import departmentRoutes from "./routes/departmentRoutes.js";
import employeeRoutes from "./routes/employeeRoutes.js";


import foodmenuRoutes from "./routes/foodmenuRoutes.js"
import itemRoutes from "./routes/itemRoutes.js";
import movieRoutes from "./routes/movieRoutes.js"
import orderRoutes from "./routes/orderRoutes.js"
//import paymentRoutes from "./routes/paymentRoutes.js"
import salonRoutes from "./routes/salonRoutes.js"
import fitnessRoutes from "./routes/fitenessRoutes.js"
import partyHallRoutes from "./routes/partyhallRoutes.js"
import bookingRoutes from "./routes/bookingRoutes.js"
import salonBookingRoutes from "./routes/salonBookingRoutes.js"
import fitnessBookingRoutes from "./routes/fitnessBookingRoutes.js"
import partyBookingRoutes from "./routes/partyBookingRoutes.js"



//dotenv configuration
dotenv.config();

// declare the server
const server = express();
//database connect function
connectDB();

//middleware
server.use(express.json());
server.use(cors());
server.use(express.static("public/uploads"));

//test route
server.get("/demo", (eeq, res) => {
  res.send("server running");
});

//routes

server.use("/api/v1/auth", authRoutes);
server.use("/api/v1/department", departmentRoutes);
server.use("/api/v1/employee", employeeRoutes);
server.use("/api/v1/menu", foodmenuRoutes);
server.use("/api/v1/items", itemRoutes)
server.use("/api/v1/movies", movieRoutes);
server.use("/api/v1/orders", orderRoutes)
//server.use("/api/v1/payment", paymentRoutes)
server.use("/api/v1/salon", salonRoutes)
server.use("/api/v1/fitness", fitnessRoutes)
server.use("/api/v1/party-hall", partyHallRoutes)
server.use("/api/v1/booking", bookingRoutes)
server.use("/api/v1/booking-salon", salonBookingRoutes)
server.use("/api/v1/club-booking", fitnessBookingRoutes)
server.use("/api/v1/party-booking", partyBookingRoutes);

//dotenv variables
const port = process.env.PORT;
const mode = process.env.MODE;




//server listen or running
server.listen(process.env.PORT, () => {
  console.log(`${mode} server runnning on Port ${port}`);
});
