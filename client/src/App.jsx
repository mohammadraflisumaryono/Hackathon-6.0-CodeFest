import { useState, useEffect, createContext } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { ethers } from 'ethers';

// Komponen
import MasterLayout from './layout/MasterLayout';
import Login from './components/Login';
import HomeLayout from './layout/HomeLayout';
import LandingPage from './pages/LandingPage';
import DashboardPenjamin from './pages/DashboardPenjamin';
import DashboardPeminjam from './pages/DashboardPeminjam';
import RiwayatTransaksi from './pages/RiwayatTransaksi';
import ProfilDashboard from './pages/ProfileDashboard';
import FormPeminjaman from './components/FormPeminjaman';

// Context
import { ApplicationLoanProvider } from './context/ApplicationLoanContext';

// ABI dan Utilitas
import UserManagementABI from './utils/json/UserManagement.json';

// Styles
import './App.css';

export const AuthContext = createContext();

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [contract, setContract] = useState(null);
  const [account, setAccount] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initEthers = async () => {
      if (typeof window.ethereum !== 'undefined') {
        try {
          const provider = new ethers.BrowserProvider(window.ethereum);
          const signer = await provider.getSigner();
          const contractAddress = "ALAMAT_KONTRAK_ANDA_DI_SINI";
          const contractInstance = new ethers.Contract(contractAddress, UserManagementABI, signer);
          setContract(contractInstance);

          const accounts = await provider.send("eth_requestAccounts", []);
          if (accounts.length > 0) {
            setAccount(accounts[0]);
            const isLogged = await contractInstance.checkIsUserLogged(accounts[0]);
            setIsLoggedIn(isLogged);
            localStorage.setItem('isLoggedIn', isLogged);
          }

          window.ethereum.on('accountsChanged', handleAccountsChanged);
        } catch (error) {
          console.error("Error initializing ethers:", error);
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    };

    const loginStatus = localStorage.getItem('isLoggedIn');
    if (loginStatus === 'true') {
      setIsLoggedIn(true);
    }

    initEthers();

    return () => {
      if (window.ethereum) {
        window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
      }
    };
  }, []);

  const handleAccountsChanged = async (accounts) => {
    if (accounts.length > 0) {
      setAccount(accounts[0]);
      if (contract) {
        const isLogged = await contract.checkIsUserLogged(accounts[0]);
        setIsLoggedIn(isLogged);
        localStorage.setItem('isLoggedIn', isLogged);
      }
    } else {
      setIsLoggedIn(false);
      setAccount('');
      localStorage.removeItem('isLoggedIn');
    }
  };

  const handleLogout = async () => {
    if (contract) {
      try {
        await contract.logout(account);
        setIsLoggedIn(false);
        localStorage.removeItem('isLoggedIn');
      } catch (error) {
        console.error("Gagal logout:", error);
      }
    }
  };

  const ProtectedRoute = ({ children }) => {
    if (loading) {
      return <div>Memuat...</div>;
    }
    if (!isLoggedIn) {
      return <Navigate to="/login" replace />;
    }
    return children;
  };

  if (loading) {
    return <div>Memuat...</div>;
  }

  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn, contract, account, handleLogout }}>
      <ApplicationLoanProvider>
        <Router>
          <Routes>
            <Route path="/login" element={
              isLoggedIn ? <Navigate to="/beranda" replace /> : <Login />
            } />
            <Route path="/" element={
              <HomeLayout>
                <LandingPage />
              </HomeLayout>
            } />
            <Route path="/beranda" element={
              <HomeLayout>
                <LandingPage />
              </HomeLayout>
            } />
            <Route path="/layanan" element={<HomeLayout><LandingPage /></HomeLayout>} />
            <Route path="/proses-pinjaman" element={<HomeLayout><LandingPage /></HomeLayout>} />
            <Route path="/tentang-kami" element={<HomeLayout><LandingPage /></HomeLayout>} />

            {/* Rute Terlindungi */}
            <Route path="/penjamin" element={
              <ProtectedRoute>
                <MasterLayout>
                  <DashboardPenjamin />
                </MasterLayout>
              </ProtectedRoute>
            } />
            <Route path="/peminjam" element={
              <ProtectedRoute>
                <MasterLayout>
                  <DashboardPeminjam />
                </MasterLayout>
              </ProtectedRoute>
            } />
            <Route path="/riwayat-transaksi" element={
              <ProtectedRoute>
                <MasterLayout>
                  <RiwayatTransaksi />
                </MasterLayout>
              </ProtectedRoute>
            } />
            <Route path='/form-peminjaman' element={
              <ProtectedRoute>
                <FormPeminjaman />
              </ProtectedRoute>
            } />
            <Route path='/profil' element={
              <ProtectedRoute>
                <ProfilDashboard />
              </ProtectedRoute>
            } />
          </Routes>
        </Router>
      </ApplicationLoanProvider>
    </AuthContext.Provider>
  );
}

export default App;