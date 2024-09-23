import { useContext, useEffect, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types'; // Import PropTypes
import { AuthContext } from '../App'; // Import the AuthContext

const MasterLayout = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { isLoggedIn, handleLogout } = useContext(AuthContext); // Consume the login state and logout function
  const [activeLink, setActiveLink] = useState('/beranda');

  useEffect(() => {
    setActiveLink(location.pathname);
  }, [location]);

  const handleLoginClick = () => {
    navigate('/login'); // Redirect to login page
  };

  const handleLogoutClick = () => {
    handleLogout(); // Call the logout function
    window.location.reload(); // Refresh the page
  };

  return (
    <div className="flex flex-col min-h-screen h-full w-full bg-[#111827] text-gray-200">
      <header className="bg-none p-4 w-full">
        <div className="flex justify-between items-center px-6">
          <Link to="/beranda" className="text-teal-200 font-bold text-xl">SaktiLoan.</Link>
          <nav className="flex-1 flex justify-center space-x-20">
            <Link to="/beranda" className={`relative text-white no-underline hover:text-gray-300 pb-2 ${activeLink === '/beranda' ? 'border-active border-white' : ''}`}>Beranda</Link>
            <Link to="/layanan" className={`relative text-white no-underline hover:text-gray-300 pb-2 ${activeLink === '/layanan' ? 'border-active border-white' : ''}`}>Layanan</Link>
            <Link to="/proses-pinjaman" className={`relative text-white no-underline hover:text-gray-300 pb-2 ${activeLink === '/proses-pinjaman' ? 'border-active border-white' : ''}`}>Proses Pinjaman</Link>
            <Link to="/tentang-kami" className={`relative text-white no-underline hover:text-gray-300 pb-2 ${activeLink === '/tentang-kami' ? 'border-active border-white' : ''}`}>Tentang Kami</Link>
          </nav>

          <div className="flex items-center space-x-6">
            {isLoggedIn ? (
              <button
                className="bg-[#A5C9CA] text-black py-2 px-4 rounded-md cursor-pointer hover:bg-[#3A6A83]"
                onClick={handleLogoutClick} // Log the user out and refresh the page
              >
                Logout
              </button>
            ) : (
              <button
                className="bg-[#A5C9CA] text-black py-2 px-4 rounded-md cursor-pointer hover:bg-[#3A6A83]"
                onClick={handleLoginClick} // Redirect to login
              >
                Masuk
              </button>
            )}
          </div>
        </div>
      </header>

      <main className="flex-grow h-full px-6 py-8">
        {children}
      </main>

      <footer className="bg-[#2F3C4E] text-center p-8 w-full">
        <p>&copy; 2024 Saktiloan. All rights reserved.</p>
        <p className="text-sm mt-2">Powered by Blockchain Technology</p>
      </footer>
    </div>
  );
};

// Define prop types for validation
MasterLayout.propTypes = {
  children: PropTypes.node.isRequired, // Ensure children is passed and is a React node
};

export default MasterLayout;
