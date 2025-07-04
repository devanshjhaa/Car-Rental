import express from "express";
import "dotenv/config";
import cors from "cors";
import connectDB from "./configs/db.js";

// ✅ Routers (make sure file names and paths are exact)
import userRouter from "./routes/userRoutes.js";
import ownerRouter from "./routes/ownerRoutes.js";
import bookingRouter from "./routes/BookingRoutes.js"; // ✅ lowercase 'b' for consistency

const app = express();

// 🌐 Connect to MongoDB
await connectDB();

// 🔧 Middleware
app.use(cors());
app.use(express.json());

// ✅ Base Test Route
app.get("/", (req, res) => res.send("Server is running"));

// 🧭 API Routes
app.use("/api/user", userRouter);
app.use("/api/owner", ownerRouter);
app.use("/api/bookings", bookingRouter); // plural bookings

// 🚀 Start the Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
