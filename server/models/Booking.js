import mongoose from "mongoose";
const { Schema, model, Types } = mongoose;

const bookingSchema = new Schema({
  car: { type: Types.ObjectId, ref: "Car", required: true },
  user: { type: Types.ObjectId, ref: "User", required: true },
  owner: { type: Types.ObjectId, ref: "User", required: true },
  pickupDate: { type: Date, required: true },
  returnDate: { type: Date, required: true },
  status: {
    type: String,
    enum: ["pending", "confirmed", "cancelled"],
    default: "pending",
  },
  price: { type: Number, required: true },
}, { timestamps: true });

const Booking = model("Booking", bookingSchema);
export default Booking;
