// src/App.js
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import MasterLayout from './layout/masterLayout';
import DashboardPenjamin from './pages/DashboardPenjamin';  // Import dashboard penjamin

function App() {
  return (
    <Router>
      <MasterLayout>
        <Routes>
          <Route path="/" element={<h1>Home Page</h1>} />
          <Route path="/penjamin" element={<DashboardPenjamin />} />  {/* Use the new DashboardPenjamin component */}
          <Route path="/peminjam" element={<h1>Dashboard Peminjam</h1>} />
          <Route path="/riwayat-transaksi" element={<h1>Riwayat Transaksi</h1>} />
        </Routes>
      </MasterLayout>
    </Router>
  );
}

export default App;
