// src/layout/masterLayout.js
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link, useLocation } from 'react-router-dom';

const MasterLayout = ({ children }) => {
  const location = useLocation();
  const [activeLink, setActiveLink] = useState('/');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    setActiveLink(location.pathname);
  }, [location]);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const navLinks = [
    { to: "/penjamin", label: "Penjamin" },
    { to: "/peminjam", label: "Peminjam" },
    { to: "/riwayat-transaksi", label: "Riwayat Transaksi" }
  ];

  return (
    <div className="flex flex-col min-h-screen h-full w-full bg-[#111827] text-gray-200">
      <header className="bg-none p-4 w-full">
        <div className="flex justify-between items-center px-4 sm:px-6">
          <Link to="/" className="text-teal-200 font-bold text-lg sm:text-xl">SaktiLoan.</Link>
          
          {/* Navbar for larger screens */}
          <nav className="hidden sm:flex sm:flex-1 sm:justify-center sm:space-x-10 lg:space-x-20">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`relative text-white no-underline hover:text-gray-300 pb-2 ${
                  activeLink === link.to ? 'border-active border-white' : ''
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Profil and Saldo for larger screens */}
          <div className="hidden sm:flex items-center space-x-4 sm:space-x-6">
            <Link
              to="/profil"
              className={`text-white no-underline hover:text-gray-300 pb-2 ${
                activeLink === '/profil' ? 'border-active border-white' : ''
              }`}
            >
              Profil
            </Link>
            <button className="bg-[#A5C9CA] text-black py-1.5 px-3 sm:py-2 sm:px-4 rounded-md cursor-pointer hover:bg-[#3A6A83]">
              Saldo
            </button>
          </div>

          {/* Hamburger button for small screens */}
          <button 
            className="sm:hidden text-white focus:outline-none" 
            onClick={toggleSidebar}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
          </button>
        </div>
      </header>

      {/* Sidebar for smaller screens */}
      <div 
        className={`fixed inset-0 z-40 bg-black bg-opacity-50 transform ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } transition-transform duration-300 ease-in-out sm:hidden`}
      >
        <div className="bg-[#1f2937] w-64 h-full p-4">
          <button 
            className="text-white mb-4 focus:outline-none" 
            onClick={toggleSidebar}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Profil link at the top of the sidebar */}
          <Link
            to="/profil"
            className={`block text-white no-underline hover:text-gray-300 mb-6 ${
              activeLink === '/profil' ? 'border-l-4 border-white pl-2' : ''
            }`}
            onClick={toggleSidebar} // Close sidebar on link click
          >
            Profil
          </Link>

          {/* Navigation links inside sidebar */}
          <nav className="flex flex-col space-y-4">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`text-white no-underline hover:text-gray-300 ${
                  activeLink === link.to ? 'border-l-4 border-white pl-2' : ''
                }`}
                onClick={toggleSidebar} // Close sidebar on link click
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>

      <main className="flex-grow h-full px-4 sm:px-6 py-8">
        {/* Konten dinamis akan muncul di sini */}
        {children}
      </main>

      <footer className="bg-[#2F3C4E] text-center p-4 sm:p-6 w-full">
        <p className="text-sm sm:text-base">&copy; 2024 SaktiLoan. All rights reserved.</p>
        <p className="text-xs sm:text-sm mt-2">Powered by Blockchain Technology</p>
      </footer>
    </div>
  );
};

MasterLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default MasterLayout;
