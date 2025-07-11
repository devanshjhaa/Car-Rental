import React from 'react';
import Title from './Titles';
import { assets } from '../assets/assets';
import CarCard from './CarCard';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import {motion, scale} from'framer-motion'

const FeaturedSection = () => {
  const navigate = useNavigate();
  const { cars } = useAppContext();

  return (
    <motion.div 
    initial={{opacity:0,y:40}}
    whileInView={{opacity:1,y:0}}
    transition={{duration:1,ease:"easeOut"}}
    className='flex flex-col items-center py-24 px-5 md:px-16 lg:px-24 xl:px-32'>
    <motion.div
    initial={{opacity:0,y:20}}
    whileInView={{opacity:1,y:0}}
    transition={{duration:1,delay:0.5}}
    >   
          <Title
            title='Featured Vehicles'
            subTitle='Explore our selection of premium vehicles available for your next adventure'
      />
    </motion.div>  

      <motion.div 
      intial={{opacity:0,y:100}}
      whileInView={{opacity:1,y:0}}
      transition={{delay:0.5,duration:1}}
      className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10 w-full'>
        {cars.slice(0, 6).map((car) => (
          <motion.div
              intial={{opacity:0,scale:0.95}}
              whileInView={{opacity:1,scale:1}}
              transition={{duration:0.4,ease:"easeOut"}}
              >
              <CarCard  car={car} />
          </motion.div>

        ))}
      </motion.div>

      <motion.button
        initial={{opacity:0,y:20}}
        whileInView={{opacity:1,y:0}}
        transition={{delay:0.6,duration:0.4}}
        onClick={() => {
          navigate('/cars');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        className='flex items-center justify-center gap-2 px-6 py-2 border border-borderColor hover:bg-gray-50 rounded-md mt-12 cursor-pointer'
      >
        Explore all cars
        <img src={assets.arrow_icon} alt='arrow' />
      </motion.button>
    </motion.div>
  );
};

export default FeaturedSection;
