// import { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import MasterLayout from './layout/masterLayout';
import FormPeminjaman from './components/formPeminjaman';
import DashboardPenjamin from './pages/DashboardPenjamin';
// import Login from './components/login'; 
import DashboardPeminjam from './pages/DashboardPeminjam';
import ProfileDashboard from './pages/ProfileDashboard';
import RiwayatTransaksi from './pages/RiwayatTransaksi';

// import PrivateRoute from './components/PrivateRoute'; // Import PrivateRoute
import Login from './components/login';
import HomeLayout from './layout/homeLayout'; // Perhatikan penggunaan huruf kapital di sini
import LandingPage from './pages/landingPage'; // Perhatikan penggunaan huruf kapital di sini

function App() {
  // const [isLoggedIn, setIsLoggedIn] = useState(false); // State to handle login status
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Function to handle login status
  // const handleLogin = (status) => {
  //   setIsLoggedIn(status);
  // };
  const handleLogin = (status) => {
    setIsLoggedIn(status);
  };

  return (
    <Router>
      <Routes>
        <Route path="/"
          element={<MasterLayout>
            <h1>Home Page</h1>
          </MasterLayout>}
        />
        <Route path="/login"
          element={<MasterLayout>
            {/* <Login onLogin={handleLogin} /> */}
          </MasterLayout>}
        />
        <Route path="/penjamin" element={<MasterLayout>
            <DashboardPenjamin />
          </MasterLayout>}
        />
        <Route path="/peminjam"
          element={<MasterLayout>
            <DashboardPeminjam />
          </MasterLayout>}
        />
        <Route path="/riwayat-transaksi"
          element={<MasterLayout>
            <RiwayatTransaksi/>
          </MasterLayout>}
        />
        <Route path="/form-peminjaman"
          element={<MasterLayout>
            <FormPeminjaman />
          </MasterLayout>}
        />
        {/* Render ProfileDashboard without MasterLayout */}
        <Route path="/profil" element={<ProfileDashboard />} />
      </Routes>
      <Routes>
        <Route
          path="/"
          element={
            <HomeLayout>
              <LandingPage />
            </HomeLayout>
          }

        />
        <Route
          path="/beranda"
          element={
            <HomeLayout>
              <LandingPage />
            </HomeLayout>
          }
        />
        <Route
          path="/layanan"
          element={
            <HomeLayout>
              <LandingPage />
            </HomeLayout>
          }
        />
        <Route
          path="/proses-pinjaman"
          element={
            <HomeLayout>
              <LandingPage />
            </HomeLayout>
          }
        />
        <Route
          path="/tentang-kami"
          element={
            <HomeLayout>
              <LandingPage />
            </HomeLayout>
          }
        />
        <Route
          path="/beranda"
          element={
            <HomeLayout>
              <LandingPage />
            </HomeLayout>
          }
        />
        <Route
          path="/penjamin"
          element={
            <MasterLayout>
              <DashboardPenjamin />
            </MasterLayout>
          }
        />
        <Route
          path="/peminjam"
          element={
            <MasterLayout>
              <h1>Dashboard Peminjam</h1>
            </MasterLayout>
          }
        />
        <Route
          path="/riwayat-transaksi"
          element={
            <MasterLayout>
              <h1>Riwayat Transaksi</h1>
            </MasterLayout>
          }
        />
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
      </Routes>
    </Router>
  );
}

export default App;