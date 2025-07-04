import { useContext, useEffect, useState } from "react";
import { createContext } from "react";
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const navigate = useNavigate();
  const currency = import.meta.env.VITE_CURRENCY;

  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);
  const [isOwner, setIsOwner] = useState(null);
  const [pickupDate, setPickupDate] = useState(null);
  const [returnDate, setReturnDate] = useState(null);

  const [cars, setCars] = useState([]); // ✅ fixed: initialized as an array
  const [showLogin, setShowLogin] = useState(false);

  // ✅ Fetch logged in user data
  const fetchUser = async () => {
    try {
      console.log('🔐 Sending request with auth header:', axios.defaults.headers.common['Authorization']);

      const { data } = await axios.get('/api/user/data');

      console.log('✅ Response from /api/user/data:', data);

      if (data.success) {
        setUser(data.user);
        setIsOwner(data.user.role === 'owner');
      } else {
        navigate('/');
      }
    } catch (error) {
      console.error('❌ fetchUser error:', error.response?.data || error.message);
      toast.error(error.message);
    }
  };



  // ✅ Fetch all cars
  const fetchCars = async () => {
    try {
      const { data } = await axios.get('/api/user/cars');
      data.success ? setCars(data.cars) : toast.error(data.message);
    } catch (error) {
      toast.error(error.message);
    }
  };

  // ✅ Logout
  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
    setIsOwner(false);
    axios.defaults.headers.common['Authorization'] = '';
    toast.success('You have been logged out');
  };

  // ✅ Load token from localStorage
useEffect(() => {
  const storedToken = localStorage.getItem('token');

  if (storedToken) {
    // ✅ Set token in state and axios default headers FIRST
    setToken(storedToken);
    axios.defaults.headers.common['Authorization'] = `Bearer ${storedToken}`;
    console.log('✅ Axios header set to:', axios.defaults.headers.common['Authorization']);

    // ✅ THEN call fetchUser and fetchCars
    fetchUser();
    fetchCars();
  }
}, []);


  // ✅ If token exists, fetch user and set auth header
  useEffect(() => {
    if (token) {
      const formattedToken = token.startsWith('Bearer ') ? token : `Bearer ${token}`;
      axios.defaults.headers.common['Authorization'] = formattedToken;

      console.log('✅ Axios Authorization header set to:', formattedToken); // Debug

      fetchUser();
      fetchCars();
    }
  }, [token]);




  // ✅ Context value
  const value = {
    navigate,
    currency,
    axios,
    user,
    setUser,
    token,
    setToken,
    isOwner,
    setIsOwner,
    fetchUser,
    showLogin,
    setShowLogin,
    logout,
    fetchCars,
    cars,
    setCars,
    pickupDate,
    setPickupDate,
    returnDate,
    setReturnDate
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  return useContext(AppContext);
};
console.log('Saved token:', localStorage.getItem('token'));
