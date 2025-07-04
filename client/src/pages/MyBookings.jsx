import React, { useEffect, useState } from 'react';
import { assets } from '../assets/assets';
import Title from '../components/Owner/Title';
import { useAppContext } from '../context/AppContext';
import { motion } from 'framer-motion';
import { toast } from 'react-hot-toast';

const MyBookings = () => {
  const { axios, user, currency } = useAppContext();
  const [bookings, setBookings] = useState([]);

  const fetchMybookings = async () => {
    try {
      const { data } = await axios.get('/api/bookings/user');
      if (data.success) {
        setBookings(data.bookings);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message || 'Failed to fetch bookings');
    }
  };

  useEffect(() => {
    user && fetchMybookings();
  }, [user]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="px-6 md:px-16 lg:px-24 xl:px-32 2xl:px-48 mt-16 text-sm max-w-7xl"
    >
      <Title
        title="My Bookings"
        subTitle="View and manage your all car bookings"
        align="left"
      />

      <div className="space-y-6 mt-10">
        {bookings.map((booking, index) => (
          <motion.div
            key={booking._id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.4 }}
            className="grid grid-cols-1 md:grid-cols-4 items-center gap-6 p-6 border border-gray-200 rounded-xl shadow-sm bg-white"
          >
            {/* Car Image */}
            <div className="md:col-span-1">
              <img
                src={booking.car.image}
                alt={`${booking.car.brand} ${booking.car.model}`}
                className="rounded-lg w-full h-auto aspect-video object-cover"
              />
            </div>

            {/* Car Info + Rental Info */}
            <div className="md:col-span-2 space-y-2">
              {/* Booking ID & Status */}
              <div className="flex items-center gap-3">
                <span className="text-sm bg-gray-100 px-3 py-1.5 rounded">
                  Booking #{index + 1}
                </span>
                <span
                  className={`text-xs font-medium px-3 py-1 rounded-full ${
                    booking.status === 'confirmed'
                      ? 'bg-green-100 text-green-700'
                      : 'bg-red-100 text-red-600'
                  }`}
                >
                  {booking.status}
                </span>
              </div>

              {/* Rental Dates */}
              <div className="flex items-start gap-2 text-gray-600">
                <img
                  src={assets.calendar_icon_colored}
                  alt="calendar"
                  className="w-4 h-4 mt-1"
                />
                <div>
                  <p>Rental Period</p>
                  <p className="font-medium text-black">
                    {booking.pickupDate.split('T')[0]} to{' '}
                    {booking.returnDate.split('T')[0]}
                  </p>
                </div>
              </div>

              {/* Pickup Location */}
              <div className="flex items-start gap-2 text-gray-600">
                <img
                  src={assets.location_icon_colored}
                  alt="location"
                  className="w-4 h-4 mt-1"
                />
                <div>
                  <p>Pick-up Location</p>
                  <p className="font-medium text-black">
                    {booking.car.location}
                  </p>
                </div>
              </div>

              {/* Car Name */}
              <div>
                <p className="text-lg font-semibold">
                  {booking.car.brand} {booking.car.model}
                </p>
                <p className="text-gray-500">
                  {booking.car.year} • {booking.car.category} •{' '}
                  {booking.car.location}
                </p>
              </div>
            </div>

            {/* Price & Date */}
            <div className="md:col-span-1 text-right text-sm text-gray-500 space-y-2">
              <p>Total Price</p>
              <p className="text-2xl font-semibold text-blue-600">
                {currency}
                {booking.price}
              </p>
              <p>Booked on {booking.createdAt.split('T')[0]}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default MyBookings;
