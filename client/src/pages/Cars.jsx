import React, { useEffect, useState } from 'react';
import { assets } from '../assets/assets';
import CarCard from '../components/CarCard';
import { useSearchParams } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { toast } from 'react-hot-toast';
import {motion} from 'framer-motion'

const Cars = () => {
  const [searchParams] = useSearchParams();
  const pickupLocation = searchParams.get('pickupLocation');
  const pickupDate = searchParams.get('pickupDate');
  const returnDate = searchParams.get('returnDate');

  const { cars, axios } = useAppContext();
  const isSearchData = pickupLocation && pickupDate && returnDate;

  const [filteredCars, setFilteredCars] = useState([]);
  const [input, setInput] = useState('');

  //  Filter cars based on search input
  const applyFilter = () => {
    if (input.trim() === '') {
      setFilteredCars(cars);
    } else {
      const filtered = cars.filter((car) =>
        `${car.brand} ${car.model} ${car.description || ''}` 
          .toLowerCase()
          .includes(input.toLowerCase())
      );
      setFilteredCars(filtered);
    }
  };

  // 🚘 Check availability via backend API
  const searchCarAvailability = async () => {
    try {
      const { data } = await axios.post('/api/bookings/check-availability', {
        location: pickupLocation,
        pickupDate,
        returnDate,
      });

      if (data.success) {
        if (data.availableCars.length === 0) {
          toast('No cars available');
        }
        setFilteredCars(data.availableCars);
      } else {
        toast.error(data.message || 'Failed to check availability');
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  //  On mount or cars update
  useEffect(() => {
    if (isSearchData) {
      searchCarAvailability();
    } else {
      setFilteredCars(cars);
    }
  }, [cars, isSearchData]);

  //  filter on input change
  useEffect(() => {
    if (!isSearchData) {
      applyFilter();
    }
  }, [input, cars]);

  return (
    <motion.div 
    initial={{opacity:0,y:30}}
    animate={{opacity:1,y:30}}
    transition={{duration:0.6,ease:"easeOut"}}
    className='bg-[#f3f6f9] py-20 px-4'>
      {/* Header */}
      <motion.div 
      initial={{opacity:0,y:20}}
      animate={{opacity:1,y:0}}
      transition={{delay:0.3,duration:0.6}}
      className='flex flex-col items-center text-center'>
        <h2 className='text-2xl md:text-3xl font-bold text-gray-800'>Available Cars</h2>
        <p className='text-gray-500 text-sm mt-2'>
          Browse our selection of premium vehicles available for your next adventure
        </p>

        {/* Search Bar */}
        <div className='flex items-center bg-white px-4 mt-6 w-full max-w-xl h-12 rounded-full shadow-md'>
          <img src={assets.search_icon} alt="search" className='w-4 h-4 mr-2 opacity-60' />
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder='Search by make, model, or features'
            className='w-full h-full outline-none text-gray-600 placeholder:text-sm'
          />
          <img src={assets.filter_icon} alt="filter" className='w-4 h-4 ml-2 opacity-60' />
        </div>
      </motion.div>

      {/* Car Grid */}
      <motion.div 
      initial={{opacity:0}}
      animate={{opacity:1}}
      transition={{delay:0.6,duration:0.6}}      
      className='px-6 md:px-16 lg:px-24 xl:px-32 mt-10'>
        <p className='text-gray-600 text-sm'>Showing {filteredCars.length} Cars</p>

        {filteredCars.length === 0 ? (
          <p className="text-center text-gray-400 mt-10">No cars found</p>
        ) : (
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-4 xl:px-20 max-w-7xl mx-auto'>
            {filteredCars.map((car, index) => (
              <motion.div 
              initial={{opacity:0,y:20}}
              animate={{opacity:1,y:0}}
              transition={{delay:0.1,duration:0.4}}
              key={car._id || index}>
                <CarCard car={car} />
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>
    </motion.div>
  );
};

export default Cars;
