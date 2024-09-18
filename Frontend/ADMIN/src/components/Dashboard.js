import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import AdminNavbar from './AdminNavbar';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

const Dashboard = () => {
  const [adminName, setAdminName] = useState('');
  const [vendorLogos, setVendorLogos] = useState([]);
  const userId = localStorage.getItem('user_id');
  const navigate = useNavigate();

  const fetchAdminName = useCallback(async () => {
    try {
      const response = await axios.get(`http://localhost:8082/users/readOne/${userId}`);
      setAdminName(response.data.first_name);
    } catch (error) {
      console.error('Error fetching admin name', error);
    }
  }, [userId]);

  const fetchVendorLogos = useCallback(async () => {
    try {
      const response = await axios.get('http://localhost:8084/vendors/read');
      setVendorLogos(response.data.map(vendor => vendor.vendor_logo));
    } catch (error) {
      console.error('Error fetching vendor logos', error);
    }
  }, []);

  useEffect(() => {
    fetchAdminName();
    fetchVendorLogos();
  }, [fetchAdminName, fetchVendorLogos]);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };

  return (
    <div>
      <AdminNavbar />
      <div className="p-5 ">
        <h2 className="text-2xl font-bold mb-5">Welcome, {adminName}</h2>
        <div className="flex justify-center mb-5">
          <button 
            className="bg-[#5F7A61] text-white py-2 px-4 rounded mr-2 hover:bg-green-800"
            onClick={() => navigate('/add-vendor')}
          >
            Add Vendor
          </button>
          <button 
            className="bg-[#5F7A61] text-white py-2 px-4 rounded mr-2 hover:bg-green-800"
            onClick={() => navigate('/update-vendor')}
          >
            Update Vendor
          </button>
          <button 
            className="bg-[#5F7A61] text-white py-2 px-4 rounded mr-2 hover:bg-green-800"
            onClick={() => navigate('/show-vendors')}
          >
            Show Vendors
          </button>
          <button 
            className="bg-[#5F7A61] text-white py-2 px-4 rounded mr-2 hover:bg-green-800"
            onClick={() => navigate('/customers')}
          >
            Customer Details
          </button>
          <button 
            className="bg-[#5F7A61] text-white py-2 px-4 rounded hover:bg-green-800"
            onClick={() => navigate('/active-loans')}
          >
            Active Loans
          </button>
        </div>
        <section className="mt-5">
          <h3 className="text-xl font-semibold mb-3">Our Vendors</h3>
          <div className="overflow-hidden">
            <Slider {...settings} className="mb-5">
              {vendorLogos.map((logo, index) => (
                <div key={index} className="p-2">
                  <img src={logo} alt={`Vendor ${index}`} className="w-full h-auto" />
                </div>
              ))}
            </Slider>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Dashboard;
