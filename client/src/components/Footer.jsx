import React from 'react';
import { assets } from '../assets/assets';
import {Link} from 'react-router-dom'

const Footer = () => {
  return (
    <div className='px-6 md:px-16 lg:px-24 xl:px-32 mt-60 text-sm text-gray-500'>
      {/* Top section */}
      <div className='flex flex-wrap justify-between items-start gap-8 md:gap-6 border-borderColor border-b pb-10'>
        <div className='max-w-xs'>
          <img src={assets.logo} alt="logo" className='h-8 md:h-9' />
          <p className='mt-3'>
            Premium car rental service with a wide selection of luxury and everyday vehicles for all your driving needs.
          </p>
          <div className='flex items-center gap-3 mt-6'>
            <a href="#"><img src={assets.facebook_logo} className='w-5 h-5' alt="Facebook" /></a>
            <a href="#"><img src={assets.instagram_logo} className='w-5 h-5' alt="Instagram" /></a>
            <a href="#"><img src={assets.twitter_logo} className='w-5 h-5' alt="Twitter" /></a>
            <a href="#"><img src={assets.gmail_logo} className='w-5 h-5' alt="Gmail" /></a>
          </div>
        </div>

        <div>
          <h2 className='text-base font-medium text-gray-800 uppercase'>Quick Links</h2>
          <ul className='mt-3 flex flex-col gap-1.5'>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/cars">Browse Cars</Link></li>
            <li><Link to="/owner">List your Car</Link></li>
            <li><Link to="/">About Us</Link></li>
          </ul>
        </div>

        <div>
          <h2 className='text-base font-medium text-gray-800 uppercase'>Resources</h2>
          <ul className='mt-3 flex flex-col gap-1.5'>
            <li><a href="#">Help Center</a></li>
            <li><a href="#">Terms of Service</a></li>
            <li><a href="#">Privacy Policy</a></li>
            <li><a href="#">Insurance</a></li>
          </ul>
        </div>

        <div>
          <h2 className='text-base font-medium text-gray-800 uppercase'>Contact</h2>
          <ul className='mt-3 flex flex-col gap-1.5'>
            <li><a href="#">1234 Drive</a></li>
            <li><a href="#">SF CA</a></li>
            <li><a href="#">+1 65465465441</a></li>
            <li><a href="#">info@gmail.com</a></li>
          </ul>
        </div>
      </div>

      {/* Bottom bar */}
      <div className='mt-8 border-t border-gray-300 pt-5 flex flex-col md:flex-row gap-2 items-center justify-between'>
        <p>© {new Date().getFullYear()} Brand. All rights reserved.</p>
        <ul className='flex items-center gap-4'>
          <li><a href="#">Privacy</a></li>
          <li>|</li>
          <li><a href="#">Terms</a></li>
          <li>|</li>
          <li><a href="#">Cookies</a></li>
        </ul>
      </div>
    </div>
  );
};

export default Footer;
