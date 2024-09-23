import { useState, useEffect, createContext } from 'react';
import PropTypes from 'prop-types';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import './App.css';
import MasterLayout from './layout/masterLayout';
import FormPeminjaman from './components/formPeminjaman';
import DashboardPenjamin from './pages/DashboardPenjamin';
import RiwayatTransaksi from './pages/RiwayatTransaksi';
import Login from './components/login';
import HomeLayout from './layout/homeLayout';
import LandingPage from './pages/LandingPage';
import DashboardPeminjam from './pages/DashboardPeminjam';
import ProfilDashboard from './pages/ProfileDashboard';
import { ethers } from 'ethers';
import UserManagementABI from './utils/json/UserManagement.json';

export const AuthContext = createContext();

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [contract, setContract] = useState(null);
  const [account, setAccount] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initEthers = async () => {
      if (typeof window.ethereum !== 'undefined') {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const contractAddress = "YOUR_CONTRACT_ADDRESS_HERE";
        const contractInstance = new ethers.Contract(contractAddress, UserManagementABI, signer);
        setContract(contractInstance);

        const accounts = await provider.send("eth_requestAccounts", []);
        if (accounts.length > 0) {
          setAccount(accounts[0]);
          const isLogged = await contractInstance.checkIsUserLogged(accounts[0]);
          setIsLoggedIn(isLogged);
        }
      }
      setLoading(false);
    };

    initEthers();
  }, []);

  const handleLogout = async () => {
    if (contract) {
      try {
        await contract.logout(account); // Call smart contract logout
        setIsLoggedIn(false); // Reset login state after logout
      } catch (error) {
        console.error("Failed to log out:", error);
      }
    }
  };

  const ProtectedRoute = ({ children }) => {
    if (!isLoggedIn && !loading) {
      return <Navigate to="/login" replace />;
    }
    return children;
  };

  ProtectedRoute.propTypes = {
    children: PropTypes.node.isRequired,
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn, contract, account, handleLogout }}>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          {/* Landing Page */}
          <Route
            path="/"
            element={
              <HomeLayout>
                <LandingPage />
              </HomeLayout>
            }
          />
          {/* Redirect logged-in users to dashboard */}
          <Route
            path="/beranda"
            element={
              isLoggedIn ? (
                <Navigate to="/penjamin" replace />
              ) : (
                <HomeLayout>
                  <LandingPage />
                </HomeLayout>
              )
            }
          />
          <Route path="/layanan" element={<HomeLayout><LandingPage /></HomeLayout>} />
          <Route path="/proses-pinjaman" element={<HomeLayout><LandingPage /></HomeLayout>} />
          <Route path="/tentang-kami" element={<HomeLayout><LandingPage /></HomeLayout>} />

          {/* Protected Routes */}
          <Route
            path="/penjamin"
            element={
              <ProtectedRoute>
                <MasterLayout>
                  <DashboardPenjamin />
                </MasterLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/peminjam"
            element={
              <ProtectedRoute>
                <MasterLayout>
                  <DashboardPeminjam />
                </MasterLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/riwayat-transaksi"
            element={
              <ProtectedRoute>
                <MasterLayout>
                  <RiwayatTransaksi />
                </MasterLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path='/form-peminjaman'
            element={
              <ProtectedRoute>
                <FormPeminjaman />
              </ProtectedRoute>
            }
          />
          <Route
            path='/profil'
            element={
              <ProtectedRoute>
                <ProfilDashboard />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
