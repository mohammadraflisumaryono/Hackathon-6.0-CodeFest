// import { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import MasterLayout from './layout/masterLayout';
import FormPeminjaman from './components/formPeminjaman';
import DashboardPenjamin from './pages/DashboardPenjamin'
import RiwayatTransaksi from './pages/RiwayatTransaksi';
import Login from './components/login';
import HomeLayout from './layout/homeLayout'; // Perhatikan penggunaan huruf kapital di sini
import LandingPage from './pages/landingPage'; // Perhatikan penggunaan huruf kapital di sini
import DashboardPeminjam from './pages/DashboardPeminjam';
import ProfilDashboard from './pages/ProfileDashboard';

function App() {
  // const [isLoggedIn, setIsLoggedIn] = useState(false);

  // const handleLogin = (status) => {
  //   setIsLoggedIn(status);
  // };

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
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
              <LandingPage  />
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
              <DashboardPeminjam/>
            </MasterLayout>
          }
        />
        <Route
          path="/riwayat-transaksi"
          element={
            <MasterLayout>
              <RiwayatTransaksi/>
            </MasterLayout>
          }
        />
        <Route
          path='/form-peminjaman'
          element={
            <FormPeminjaman/>
          }
        />
        <Route
          path='/profil'
          element={
            <ProfilDashboard/>
          }
        />
        {/* <Route path="/login" element={<Login onLogin={handleLogin} />} /> */}
      </Routes>
    </Router>
  );
}

export default App;