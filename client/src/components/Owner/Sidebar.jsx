import React, { useState } from 'react';
import { assets, ownerMenuLinks } from '../../assets/assets';
import { NavLink, useLocation } from 'react-router-dom';
import { useAppContext } from '../../context/AppContext';
import toast from 'react-hot-toast';

const Sidebar = () => {
  const { user, axios, fetchUser } = useAppContext();
  const location = useLocation();
  const [image, setImage] = useState(null);

  const updateImage = async () => {
    try {
      const formData = new FormData();
      formData.append('image', image);

      const { data } = await axios.post('/api/owner/update-image', formData);
      if (data.success) {
        fetchUser();
        toast.success(data.message);
        setImage(null);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="relative min-h-screen md:flex flex-col items-center pt-8 w-full md:w-60 border-r border-borderColor text-sm bg-white">
      {/* Profile Image Upload */}
      <div className="group relative w-24 h-24">
        <label htmlFor="image">
          <img
            src={
              image
                ? URL.createObjectURL(image)
                : user?.image ||
                  'https://w7.pngwing.com/pngs/332/1014/png-transparent-attorney-boss-business-people-businessman-lawyer-owner-person-business-persons-flat-icon.png'
            }
            alt={`${user?.name || 'User'}'s profile`}
            className="w-24 h-24 object-cover rounded-full cursor-pointer mx-auto border border-gray-300"
          />
          <input
            type="file"
            id="image"
            accept="image/*"
            hidden
            onChange={(e) => setImage(e.target.files[0])}
          />
          <div className="absolute hidden top-0 right-0 left-0 bottom-0 bg-black/10 rounded-full group-hover:flex items-center justify-center cursor-pointer">
            <img src={assets.edit_icon} alt="Edit" />
          </div>
        </label>
      </div>

      {/* Save button */}
      {image && (
        <button
          onClick={updateImage}
          className="mt-2 flex items-center gap-1 text-blue-600 hover:underline"
        >
          Save <img src={assets.check_icon} width={13} alt="Check" />
        </button>
      )}

      {/* User Name */}
      <p className="mt-2 text-base font-medium text-gray-700 max-md:hidden">
        {user?.name || 'Loading...'}
      </p>

      {/* Navigation Links */}
      <div className="w-full mt-6">
        {ownerMenuLinks.map((link, index) => (
          <NavLink
            key={index}
            to={link.path}
            className={`relative flex items-center gap-2 w-full py-3 pl-4 transition-colors ${
              link.path === location.pathname
                ? 'bg-blue-50 text-blue-600 font-medium'
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            <img
              src={link.path === location.pathname ? link.coloredIcon : link.icon}
              alt={`${link.name} icon`}
              className="w-5 h-5"
            />
            <span className="max-md:hidden">{link.name}</span>
            {link.path === location.pathname && (
              <div className="bg-blue-600 w-1.5 h-8 rounded-l absolute right-0"></div>
            )}
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
