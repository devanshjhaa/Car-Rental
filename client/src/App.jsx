import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import CarDetails from './pages/CarDetails';
import Cars from './pages/Cars';
import MyBookings from './pages/MyBookings';
import Layout from './pages/Owner/Layout';
import AddCar from './pages/Owner/AddCar';
import Dashboard from './pages/Owner/Dashboard';
import ManageBookings from './pages/Owner/ManagBookings';
import ManageCars from './pages/Owner/ManageCars';
import MainLayout from './components/MainLayout';
import Login from './components/Login';
import { useAppContext } from './context/AppContext';
import { Toaster } from 'react-hot-toast';

const App = () => {
const { showLogin, setShowLogin } = useAppContext();

  return (
    <>
      <Toaster/>
      {showLogin && <Login />}
      <Routes>
        <Route path="/" element={<MainLayout setShowLogin={setShowLogin} />}>
          <Route index element={<Home />} />
          <Route path="car-details/:id" element={<CarDetails />} />
          <Route path="cars" element={<Cars />} />
          <Route path="my-bookings" element={<MyBookings />} />
        </Route>
        <Route path="/owner" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="add-car" element={<AddCar />} />
          <Route path="manage-cars" element={<ManageCars />} />
          <Route path="manage-bookings" element={<ManageBookings />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
