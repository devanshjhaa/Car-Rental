import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { assets } from '../assets/assets';
import { useAppContext } from '../context/AppContext';
import { toast } from 'react-hot-toast';
import {motion} from 'framer-motion'

const menuLinks = [
  { name: 'Home', path: '/' },
  { name: 'Cars', path: '/cars' },
  { name: 'My Bookings', path: '/my-bookings' },
];

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const {
    user,
    isOwner,
    setShowLogin,
    logout,
    axios,
    fetchUser,
  } = useAppContext();

  const handleOwnerClick = async () => {
    if (!user) {
      toast.error('Please login first');
      setShowLogin(true);
      return;
    }

    if (!isOwner) {
      try {
        const { data } = await axios.post('/api/owner/change-role');
        if (data.success) {
          toast.success(data.message || 'You are now an owner!');
          await fetchUser(); // ⬅ refresh user and isOwner
          navigate('/owner');
        } else {
          toast.error(data.message || 'Failed to become owner');
        }
      } catch (error) {
        toast.error(error?.response?.data?.message || error.message || 'Something went wrong');
      }
    } else {
      navigate('/owner'); // Already owner, go to dashboard
    }
    setOpen(false);
  };

  return (
    <motion.div 
    intial={{y:-20,opacity:0}}
    animate={{y:0,opacity:1}}
    transition={{duration:0.5}}
    className="relative flex items-center justify-between px-6 py-4 shadow-sm bg-white z-50">
      {/* Logo */}
      <Link to="/" className="flex items-center gap-2">
        <motion.img whileHover={{scale:1.05}} src={assets.logo} alt="logo" className="h-8" />
        <span className="text-xl font-semibold text-gray-700"></span>
      </Link>

      {/* Mobile menu toggle */}
      <button className="sm:hidden" onClick={() => setOpen(!open)}>
        <img src={open ? assets.close_icon : assets.menu_icon} alt="menu" className="h-6 w-6" />
      </button>

      {/* Menu */}
      <div
        className={`${
          open ? 'max-sm:flex' : 'max-sm:hidden'
        } flex-col sm:flex sm:flex-row sm:static absolute top-16 left-0 w-full sm:w-auto bg-white sm:bg-transparent px-6 sm:px-0 z-10 shadow sm:shadow-none transition-all duration-300`}
      >
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-8 text-gray-600">
          {/* Nav links */}
          {menuLinks.map((link, index) => (
            <Link
              key={index}
              to={link.path}
              className={`hover:text-blue-600 transition-colors ${
                location.pathname === link.path ? 'font-semibold text-black' : ''
              }`}
              onClick={() => setOpen(false)}
            >
              {link.name}
            </Link>
          ))}

          {/* Search Bar (desktop only) */}
          <div className="hidden lg:flex items-center text-sm gap-2 border border-borderColor px-3 rounded-full max-w-56">
            <input
              type="text"
              className="py-1.5 w-full bg-transparent outline-none placeholder-gray-500"
              placeholder="Search cars..."
            />
            <img src={assets.search_icon} alt="search" className="w-4 h-4" />
          </div>

          {/* Owner or Dashboard button */}
          {user && (
            <button
              onClick={handleOwnerClick}
              className="cursor-pointer text-sm text-blue-600 border border-blue-600 px-4 py-1.5 rounded hover:bg-blue-600 hover:text-white focus:outline-none transition-all"
            >
              {isOwner ? 'Dashboard' : 'Owner?'}
            </button>
          )}

          {/* Auth Buttons */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 mt-4 sm:mt-0">
            {!user ? (
              <button
                onClick={() => {
                  setShowLogin(true);
                  setOpen(false);
                }}
                className="cursor-pointer px-6 py-2 bg-blue-600 hover:bg-blue-700 transition-all text-white rounded-lg text-sm"
              >
                Login
              </button>
            ) : (
              <button
                onClick={() => {
                  logout();
                  setOpen(false);
                }}
                className="cursor-pointer px-6 py-2 bg-red-500 hover:bg-red-600 transition-all text-white rounded-lg text-sm"
              >
                Logout
              </button>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Navbar;
