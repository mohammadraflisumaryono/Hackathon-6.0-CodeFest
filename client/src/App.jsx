import { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import MasterLayout from './layout/masterLayout';
import DashboardPenjamin from './pages/DashboardPenjamin';
import Login from './components/login'; 
import PrivateRoute from './components/PrivateRoute'; // Import PrivateRoute

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // State to handle login status

  // Function to handle login status
  const handleLogin = (status) => {
    setIsLoggedIn(status);
  };

  return (
    <Router>
      <MasterLayout>
        <Routes>
          <Route path="/" element={<h1>Home Page</h1>} />
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          <Route 
            path="/penjamin" 
            element={
              <PrivateRoute isLoggedIn={isLoggedIn}>
                <DashboardPenjamin />
              </PrivateRoute>
            }
          />
          <Route 
            path="/peminjam" 
            element={
              <PrivateRoute isLoggedIn={isLoggedIn}>
                <h1>Dashboard Peminjam</h1>
              </PrivateRoute>
            }
          />
          <Route 
            path="/riwayat-transaksi" 
            element={
              <PrivateRoute isLoggedIn={isLoggedIn}>
                <h1>Riwayat Transaksi</h1>
              </PrivateRoute>
            }
          />
        </Routes>
      </MasterLayout>
    </Router>
  );
}

export default App;
