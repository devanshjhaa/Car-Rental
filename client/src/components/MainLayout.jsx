import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer'; // ✅ Make sure this is imported
import { Outlet } from 'react-router-dom';

const MainLayout = ({ setShowLogin }) => (
  <>
    <Navbar setShowLogin={setShowLogin} />
    <Outlet />
    <Footer /> {/* ✅ Re-add footer here */}
  </>
);

export default MainLayout;
