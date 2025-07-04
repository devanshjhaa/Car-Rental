import mongoose from "mongoose";
const { Schema, model, Types } = mongoose;

const carSchema = new Schema({
  owner: { type: Types.ObjectId, ref: "User", required: true }, 
  brand: { type: String, required: true },
  model: { type: String, required: true },
  image: { type: String },
  year: { type: Number, required: true },
  category: { type: String, required: true },
  seating_capacity: { type: Number, required: true },
  fuel_type: { type: String, required: true },
  transmission: { type: String, required: true },
  pricePerDay: { type: Number, required: true },
  location: { type: String, required: true },
  description: { type: String },
  isAvailable: { type: Boolean, default: true }
}, { timestamps: true });

export default model("Car", carSchema);

const Car=mongoose.model('Car',carSchema)
