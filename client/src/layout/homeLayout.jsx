import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link, useNavigate, useLocation } from 'react-router-dom';


const MasterLayout = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();
    const [activeLink, setActiveLink] = useState('/');
  
    useEffect(() => {
      setActiveLink(location.pathname);
    }, [location]);
  
    const navLinks = [
      { to: "/beranda", label: "Beranda" },
      { to: "/layanan", label: "Layanan" },
      { to: "/proses-pinjaman", label: "Proses Pinjaman" },
      { to: "/tentang-kami", label: "Tentang Kami" }
  ];
  
  const handleLoginClick = () => { 
    navigate('/login');
  }
  
    return (
      <div className="flex flex-col min-h-screen h-full w-full bg-[#111827] text-gray-200">
        <header className="bg-none p-4 w-full">
          <div className="flex justify-between items-center px-6">
            <Link to="/" className="text-teal-200 font-bold text-xl">SaktiLoan.</Link>
            <nav className="flex-1 flex justify-center space-x-20">
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
            <div className="flex items-center space-x-6">
               <button
              className="bg-[#A5C9CA] text-black py-2 px-4 rounded-md cursor-pointer hover:bg-[#3A6A83]"
              onClick={handleLoginClick}
            >
                Masuk
              </button>
            </div>
          </div>
        </header>
  
        <main className="flex-grow h-full px-6 py-8">
          {/* Konten dinamis akan muncul di sini */}
          {children}
        </main>
  
        <footer className="bg-[#2F3C4E] text-center p-8 w-full">
          <p>&copy; 2024 Saktiloan. All rights reserved.</p>
          <p className="text-sm mt-2">Powered by Blockchain Technology</p>
        </footer>
      </div>
    );
  };
  
  MasterLayout.propTypes = {
    children: PropTypes.node.isRequired,
  };
  
  
  export default MasterLayout;