import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { assets } from '../assets/assets';
import { useAppContext } from '../context/AppContext';
import { toast } from 'react-hot-toast';
import {motion} from 'framer-motion'

const CarDetails = () => {
  const { id } = useParams();
  const {
    cars,
    axios,
    pickupDate,
    setPickupDate,
    returnDate,
    setReturnDate
  } = useAppContext();

  const navigate = useNavigate();
  const [car, setCar] = useState(null);

  useEffect(() => {
    if (cars && cars.length > 0) {
      const selectedCar = cars.find(car => car._id === id);
      setCar(selectedCar);
    }
  }, [id, cars]);

  const handleBookingSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post('/api/bookings/create', {
        car: id,
        pickupDate,
        returnDate
      });

      if (data.success) {
        toast.success(data.message);
        navigate('/my-bookings');
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message || 'Something went wrong');
    }
  };

  if (!car) return <div className="text-center mt-16">Loading...</div>;

  return (
    <div className="px-6 md:px-16 lg:px-24 xl:px-32 mt-12">
      {/* Back button */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-gray-500 hover:text-gray-700 mb-6"
      >
        <img src={assets.arrow_icon} alt="back" className="rotate-180 w-4 h-4 opacity-60" />
        Back to all cars
      </button>

      <motion.div 
      initial={{opacity:0,y:20}}
      animate={{opacity:1,y:0}}
      transition={{duration:0.6}}    
      className="grid grid-cols-1 md:grid-cols-3 gap-10 items-start">
        {/* Left side: Car image + description */}
        <div className="md:col-span-2">
          <motion.img
            initial={{scale:0.98,opacity:0}}
            animate={{scale:1,opacity:1}}
            transition={{duration:0.6}}    
            src={car.image}
            alt={car.model}
            className="w-full rounded-2xl mb-6 max-h-[420px] object-cover shadow-md"
          />
          <h1 className="text-2xl font-semibold mb-1">{car.brand} {car.model}</h1>
          <p className="text-gray-500 text-sm mb-4">{car.year} • {car.category}</p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6 text-sm text-gray-700">
            <div className="flex items-center gap-2">
              <img src={assets.users_icon} className="h-4" />
              {car.seating_capacity} Seats
            </div>
            <div className="flex items-center gap-2">
              <img src={assets.fuel_icon} className="h-4" />
              {car.fuel_type}
            </div>
            <div className="flex items-center gap-2">
              <img src={assets.car_icon} className="h-4" />
              {car.transmission}
            </div>
            <div className="flex items-center gap-2">
              <img src={assets.location_icon} className="h-4" />
              {car.location}
            </div>
          </div>

          <div>
            <h2 className="text-lg font-medium mb-2">Description</h2>
            <p className="text-gray-600 text-sm leading-relaxed">
              The {car.model} is a premium {car.category.toLowerCase()} perfect for city drives and long trips.
              Enjoy luxury, performance, and comfort all in one ride.
            </p>
          </div>
        </div>

        {/* Right side: Booking box */}
        <motion.div 
        initial={{opacity:0,y:30}}
        animate={{opacity:1,y:0}}
        transition={{duration:0.6}}    
        className="border border-gray-200 p-6 rounded-xl shadow-md w-full">
          <h2 className="text-2xl font-semibold mb-1">₹{car.pricePerDay}</h2>
          <p className="text-gray-500 text-sm mb-6">per day</p>

          <form onSubmit={handleBookingSubmit} className="space-y-4">
            <div>
              <label className="text-sm block mb-1">Pickup Date</label>
              <input
                value={pickupDate}
                onChange={(e) => setPickupDate(e.target.value)}
                type="date"
                name="pickupDate"
                className="w-full px-3 py-2 border border-gray-300 rounded"
                required
              />
            </div>
            <div>
              <label className="text-sm block mb-1">Return Date</label>
              <input
                value={returnDate}
                onChange={(e) => setReturnDate(e.target.value)}
                type="date"
                name="returnDate"
                className="w-full px-3 py-2 border border-gray-300 rounded"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
            >
              Book Now
            </button>
            <p className="text-gray-400 text-xs mt-2 text-center">
              No credit card required to reserve
            </p>
          </form>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default CarDetails;
