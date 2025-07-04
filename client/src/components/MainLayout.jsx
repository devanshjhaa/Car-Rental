import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import { Outlet } from 'react-router-dom';

const MainLayout = ({ setShowLogin }) => (
  <>
    <Navbar setShowLogin={setShowLogin} />
    <Outlet />
    <Footer /> {}
  </>
);

export default MainLayout;
