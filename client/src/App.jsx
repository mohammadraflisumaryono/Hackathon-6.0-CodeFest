import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MasterLayout from './layout/masterLayout';
import Login from './components/login';
import DashboardPenjamin from './pages/DashboardPenjamin';
import DashboardPeminjam from './pages/DashboardPeminjam';
import FormPeminjaman from './components/formPeminjaman';
import { ApplicationLoanProvider } from './context/ApplicationLoanContext';


function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // State to handle login status

  // Function to handle login status
  const handleLogin = (status) => {
    setIsLoggedIn(status);
  };

  return (
    <Router>
      <MasterLayout>
        <ApplicationLoanProvider>
          <Routes>
            <Route path="/" element={<h1>Home Page</h1>} />
            <Route path="/login" element={<Login onLogin={handleLogin} />} />
            <Route path="/penjamin" element={<DashboardPenjamin />} />
            <Route path="/peminjam" element={<DashboardPeminjam />} />
            <Route path="/riwayat-transaksi" element={<h1>Riwayat Transaksi</h1>} />
            <Route path="/form-peminjaman" element={<FormPeminjaman />} />
          </Routes>
        </ApplicationLoanProvider>
      </MasterLayout>
    </Router>
  );
}

export default App;
