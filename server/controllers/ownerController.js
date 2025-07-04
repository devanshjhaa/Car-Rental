import fs from "fs";
import Car from "../models/Car.js";
import Booking from "../models/Booking.js";
import imagekit from "../configs/imagekit.js";

// ADD CAR
export const addCar = async (req, res) => {
  try {
    const { _id } = req.user;
    const car = JSON.parse(req.body.carData);
    const imageFile = req.file;

    if (!imageFile) {
      return res.json({ success: false, message: "Car image is required" });
    }

    const fileBuffer = fs.readFileSync(imageFile.path);
    const response = await imagekit.upload({
      file: fileBuffer,
      fileName: imageFile.originalname,
      folder: "/cars",
    });

    const optimizedImageUrl = imagekit.url({
      path: response.filePath,
      transformation: [
        { width: "1200" },
        { quality: "auto" },
        { format: "webp" },
      ],
    });

    const newCar = new Car({
      ...car,
      owner: _id,
      image: optimizedImageUrl,
    });

    await newCar.save();
    res.json({ success: true, message: "Car added successfully.", car: newCar });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// DELETE CAR
export const deleteCar = async (req, res) => {
  try {
    const { _id } = req.user;
    const { carId } = req.body;

    const car = await Car.findById(carId);
    if (!car) {
      return res.json({ success: false, message: "Car not found" });
    }

    if (car.owner.toString() !== _id.toString()) {
      return res.json({ success: false, message: "Unauthorized" });
    }

    await Car.findByIdAndDelete(carId);
    res.json({ success: true, message: "Car deleted successfully" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// TOGGLE AVAILABILITY
export const toggleCarAvailability = async (req, res) => {
  try {
    const { _id } = req.user;
    const { carId } = req.body;

    const car = await Car.findById(carId);
    if (!car) {
      return res.json({ success: false, message: "Car not found" });
    }

    if (car.owner.toString() !== _id.toString()) {
      return res.json({ success: false, message: "Unauthorized" });
    }

    car.isAvailable = !car.isAvailable;
    await car.save();

    res.json({ success: true, message: "Availability toggled", isAvailable: car.isAvailable });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// GET OWNER CARS
export const getOwnerCars = async (req, res) => {
  try {
    const { _id } = req.user;
    const cars = await Car.find({ owner: _id });
    res.json({ success: true, cars });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// GET DASHBOARD DATA
export const getDashboardData = async (req, res) => {
  try {
    const { _id, role } = req.user;

    if (role !== "owner") {
      return res.json({ success: false, message: "Unauthorized" });
    }

    const cars = await Car.find({ owner: _id });
    const bookings = await Booking.find({ owner: _id }).populate("car").sort({ createdAt: -1 });

    const pendingBookings = bookings.filter((b) => b.status === "pending");
    const confirmedBookings = bookings.filter((b) => b.status === "confirmed");

    const monthlyRevenue = confirmedBookings.reduce((acc, b) => acc + b.price, 0);

    const dashboardData = {
      totalCars: cars.length,
      totalBookings: bookings.length,
      pendingBookings: pendingBookings.length,
      completedBookings: confirmedBookings.length,
      recentBookings: bookings.slice(0, 3),
      monthlyRevenue,
    };

    res.json({ success: true, dashboardData, cars });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// CHANGE ROLE TO OWNER
export const changeRoleOwner = async (req, res) => {
  try {
    const user = req.user;

    if (user.role === "owner") {
      return res.json({ success: true, message: "Already an owner" });
    }

    user.role = "owner";
    await user.save();

    res.json({ success: true, message: "You are now registered as an owner!" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};
// Optional: Update owner profile image
export const updateUserImage = async (req, res) => {
  try {
    const { _id } = req.user;
    const imageFile = req.file;

    if (!imageFile) {
      return res.json({ success: false, message: "No image provided" });
    }

    const fileBuffer = fs.readFileSync(imageFile.path);
    const response = await imagekit.upload({
      file: fileBuffer,
      fileName: imageFile.originalname,
      folder: "/profile-pics",
    });

    const optimizedImageUrl = imagekit.url({
      path: response.filePath,
      transformation: [
        { width: "400" },
        { quality: "auto" },
        { format: "webp" },
      ],
    });

    const user = await user.findByIdAndUpdate(_id, { image: optimizedImageUrl }, { new: true });

    res.json({ success: true, message: "Image updated", user });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};
