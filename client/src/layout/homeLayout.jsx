import { useContext, useEffect, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import { AuthContext } from '../App';

// Komponen Header
const Header = ({ isLoggedIn, handleLoginClick, handleLogoutClick, activeLink }) => (
  <header className="bg-none p-4 w-full">
    <div className="flex justify-between items-center px-6">
      <Link to="/beranda" className="text-teal-200 font-bold text-xl">SaktiLoan.</Link>
      <nav className="flex-1 flex justify-center space-x-20">
        <NavLink to="/beranda" active={activeLink === '/beranda'}>Beranda</NavLink>
        <NavLink to="/layanan" active={activeLink === '/layanan'}>Layanan</NavLink>
        <NavLink to="/proses-pinjaman" active={activeLink === '/proses-pinjaman'}>Proses Pinjaman</NavLink>
        <NavLink to="/tentang-kami" active={activeLink === '/tentang-kami'}>Tentang Kami</NavLink>
      </nav>
      <div className="flex items-center space-x-6">
        {isLoggedIn ? (
          <Button onClick={handleLogoutClick}>Keluar</Button>
        ) : (
          <Button onClick={handleLoginClick}>Masuk</Button>
        )}
      </div>
    </div>
  </header>
);

// Komponen NavLink
const NavLink = ({ to, active, children }) => (
  <Link
    to={to}
    className={`relative text-white no-underline hover:text-gray-300 pb-2 ${
      active ? 'border-active border-white' : ''
    }`}
  >
    {children}
  </Link>
);

// Komponen Button
const Button = ({ onClick, children }) => (
  <button
    className="bg-[#A5C9CA] text-black py-2 px-4 rounded-md cursor-pointer hover:bg-[#3A6A83]"
    onClick={onClick}
  >
    {children}
  </button>
);

// Komponen Footer
const Footer = () => (
  <footer className="bg-[#2F3C4E] text-center p-8 w-full">
    <p>&copy; 2024 Saktiloan. All rights reserved.</p>
    <p className="text-sm mt-2">Powered by Blockchain Technology</p>
  </footer>
);

// Komponen LogoutConfirmation
const LogoutConfirmation = ({ onConfirm, onCancel }) => (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
    <div className="bg-white p-6 rounded-lg">
      <h2 className="text-xl font-bold mb-4 text-black">Konfirmasi Logout</h2>
      <p className="mb-4 text-black">Apakah Anda yakin ingin keluar?</p>
      <div className="flex justify-end space-x-4">
        <Button onClick={onCancel}>Batal</Button>
        <Button onClick={onConfirm}>Keluar</Button>
      </div>
    </div>
  </div>
);

// Komponen Utama MasterLayout
const HomeLayout = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { isLoggedIn, handleLogout } = useContext(AuthContext);
  const [activeLink, setActiveLink] = useState('/beranda');
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  useEffect(() => {
    setActiveLink(location.pathname);
  }, [location]);

  const handleLoginClick = () => {
    navigate('/login');
  };

  const handleLogoutClick = () => {
    setShowLogoutConfirm(true);
  };

  const confirmLogout = () => {
    handleLogout();
    setShowLogoutConfirm(false);
    navigate('/beranda');
  };

  const cancelLogout = () => {
    setShowLogoutConfirm(false);
  };

  return (
    <div className="flex flex-col min-h-screen h-full w-full bg-[#111827] text-gray-200">
      <Header
        isLoggedIn={isLoggedIn}
        handleLoginClick={handleLoginClick}
        handleLogoutClick={handleLogoutClick}
        activeLink={activeLink}
      />
      <main className="flex-grow h-full px-6 py-8">
        {children}
      </main>
      <Footer />
      {showLogoutConfirm && (
        <LogoutConfirmation onConfirm={confirmLogout} onCancel={cancelLogout} />
      )}
    </div>
  );
};

// PropTypes
HomeLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

Header.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  handleLoginClick: PropTypes.func.isRequired,
  handleLogoutClick: PropTypes.func.isRequired,
  activeLink: PropTypes.string.isRequired,
};

NavLink.propTypes = {
  to: PropTypes.string.isRequired,
  active: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired,
};

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};

LogoutConfirmation.propTypes = {
  onConfirm: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};

export default HomeLayout;