import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link, useLocation } from 'react-router-dom';

// Komponen Header
const Header = ({ activeLink, toggleSidebar, navLinks }) => (
  <header className="bg-none p-4 w-full">
    <div className="flex justify-between items-center px-4 sm:px-6">
      <Link to="/" className="text-teal-200 font-bold text-lg sm:text-xl">SaktiLoan.</Link>

      {/* Navbar for larger screens */}
      <nav className="hidden sm:flex sm:flex-1 sm:justify-center sm:space-x-10 lg:space-x-20">
        {navLinks.map((link) => (
          <NavLink key={link.to} to={link.to} active={activeLink === link.to}>
            {link.label}
          </NavLink>
        ))}
      </nav>

      {/* Profil and Saldo for larger screens */}
      <div className="hidden sm:flex items-center space-x-4 sm:space-x-6">
        <NavLink to="/profil" active={activeLink === '/profil'}>
          Profil
        </NavLink>
        <Button className="bg-[#A5C9CA] text-black py-1.5 px-3 sm:py-2 sm:px-4" onClick={() => {}}>
          Saldo
        </Button>
      </div>

      {/* Hamburger button for small screens */}
      <Button className="sm:hidden text-white" onClick={toggleSidebar}>
        <HamburgerIcon />
      </Button>
    </div>
  </header>
);

// Komponen Sidebar
const Sidebar = ({ isSidebarOpen, toggleSidebar, activeLink, navLinks }) => (
  <div
    className={`fixed inset-0 z-40 bg-black bg-opacity-50 transform ${
      isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
    } transition-transform duration-300 ease-in-out sm:hidden`}
  >
    <div className="bg-[#1f2937] w-64 h-full p-4">
      <Button className="text-white mb-4" onClick={toggleSidebar}>
        <CloseIcon />
      </Button>

      {/* Profil link at the top of the sidebar */}
      <NavLink to="/profil" active={activeLink === '/profil'} onClick={toggleSidebar}>
        Profil
      </NavLink>

      {/* Navigation links inside sidebar */}
      <nav className="flex flex-col space-y-4">
        {navLinks.map((link) => (
          <NavLink key={link.to} to={link.to} active={activeLink === link.to} onClick={toggleSidebar}>
            {link.label}
          </NavLink>
        ))}
      </nav>
    </div>
  </div>
);

// Komponen Footer
const Footer = () => (
  <footer className="bg-[#2F3C4E] text-center p-4 sm:p-6 w-full">
    <p className="text-sm sm:text-base">&copy; 2024 SaktiLoan. All rights reserved.</p>
    <p className="text-xs sm:text-sm mt-2">Powered by Blockchain Technology</p>
  </footer>
);

// Komponen Utama MasterLayout
const MasterLayout = ({ children }) => {
  const location = useLocation();
  const [activeLink, setActiveLink] = useState('/');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    setActiveLink(location.pathname);
  }, [location]);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  const navLinks = [
    { to: '/penjamin', label: 'Penjamin' },
    { to: '/peminjam', label: 'Peminjam' },
    { to: '/riwayat-transaksi', label: 'Riwayat Transaksi' },
  ];

  return (
    <div className="flex flex-col min-h-screen h-full w-full bg-[#111827] text-gray-200">
      <Header activeLink={activeLink} toggleSidebar={toggleSidebar} navLinks={navLinks} />
      <Sidebar
        isSidebarOpen={isSidebarOpen}
        toggleSidebar={toggleSidebar}
        activeLink={activeLink}
        navLinks={navLinks}
      />
      <main className="flex-grow h-full px-4 sm:px-6 py-8">{children}</main>
      <Footer />
    </div>
  );
};

// Komponen NavLink
const NavLink = ({ to, active, children, onClick }) => (
  <Link
    to={to}
    className={`relative text-white no-underline hover:text-gray-300 pb-2 ${
      active ? 'border-active border-white' : ''
    }`}
    onClick={onClick}
  >
    {children}
  </Link>
);

// Komponen Button
const Button = ({ className, onClick, children }) => (
  <button className={`${className} rounded-md cursor-pointer hover:bg-[#3A6A83]`} onClick={onClick}>
    {children}
  </button>
);

// Komponen HamburgerIcon
const HamburgerIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
  </svg>
);

// Komponen CloseIcon
const CloseIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
  </svg>
);

// PropTypes
MasterLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

Header.propTypes = {
  activeLink: PropTypes.string.isRequired,   
  toggleSidebar: PropTypes.func.isRequired,  
  navLinks: PropTypes.arrayOf(               
    PropTypes.shape({
      to: PropTypes.string.isRequired,       
      label: PropTypes.string.isRequired,    
    })
  ).isRequired,
};

Sidebar.propTypes = {
  isSidebarOpen: PropTypes.bool.isRequired,  
  toggleSidebar: PropTypes.func.isRequired,   
  activeLink: PropTypes.string.isRequired,    
  navLinks: PropTypes.arrayOf(               
    PropTypes.shape({
      to: PropTypes.string.isRequired,        
      label: PropTypes.string.isRequired,     
    })
  ).isRequired,
};

NavLink.propTypes = {
  to: PropTypes.string.isRequired,
  active: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func,
};

Button.propTypes = {
  className: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};

export default MasterLayout;
