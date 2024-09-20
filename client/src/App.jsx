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

function App() {
  // const [isLoggedIn, setIsLoggedIn] = useState(false); // State to handle login status

  // Function to handle login status
  // const handleLogin = (status) => {
  //   setIsLoggedIn(status);
  // };

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
    </Router>
  );
}

export default App;
