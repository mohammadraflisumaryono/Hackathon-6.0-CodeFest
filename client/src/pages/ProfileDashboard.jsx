import React from 'react';
import { Link } from 'react-router-dom';
import { FaBell, FaHome, FaCheckCircle, FaDollarSign, FaPercent, FaClock } from 'react-icons/fa';
import ActivityTable from '../components/dataTable';

const ProfileDashboard = () => {
  const activities = React.useMemo(
    () => [
      { tanggal: '2024-09-12', deskripsi: 'Payment for Buut', jumlah: 81000, status: 'success' },
      { tanggal: '2024-09-11', deskripsi: 'Payment for Buut', jumlah: 50000, status: 'pending' },
      { tanggal: '2024-09-10', deskripsi: 'Payment for Buut', jumlah: 30000, status: 'success' },
      { tanggal: '2024-09-09', deskripsi: 'Payment for Buut', jumlah: 25000, status: 'success' },
      { tanggal: '2024-09-08', deskripsi: 'Payment for Buut', jumlah: 15000, status: 'success' },
      { tanggal: '2024-09-07', deskripsi: 'Payment for Buut', jumlah: 20000, status: 'success' },
    ],
    []
  );

  return (
    <div className="bg-gray-900 text-white p-6 min-h-screen">
      <div className="max-w-4xl mx-auto">
        <header className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Profile Dashboard</h1>
          <div className="flex space-x-4">
            <FaBell className="w-6 h-6" />
            <Link to="/" className="hover:text-green-400 transition-transform duration-300 ease-in-out transform hover:scale-125">
              <FaHome className="w-6 h-6" />
            </Link>
          </div>
        </header>

        <div className="bg-gray-800 rounded-lg p-4 mb-6 flex items-center space-x-4">
          <div className="bg-green-500 w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold">
            GM
          </div>
          <div>
            <h2 className="text-lg font-semibold">Ghani Mullet</h2>
            <span className="text-gray-400 text-sm">Pengusaha UMKM</span>
            <div className="flex items-center mt-1">
              <FaCheckCircle className="text-green-500 mr-1" />
              <span className="text-green-500 text-sm">Verified</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-gray-800 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <span className="text-gray-400">Total Dana Terjual</span>
              <FaDollarSign className="text-green-500 text-2xl" />
            </div>
            <div className="text-2xl font-bold mt-2">50,000 USD</div>
          </div>
          <div className="bg-gray-800 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <span className="text-gray-400">Total Dana Terjamin</span>
              <FaPercent className="text-green-500 text-2xl" />
            </div>
            <div className="text-2xl font-bold mt-2">8.5 %</div>
          </div>
          <div className="bg-gray-800 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <span className="text-gray-400">Total Waktu Terjamin</span>
              <FaClock className="text-green-500 text-2xl" />
            </div>
            <div className="text-2xl font-bold mt-2">12 bulan</div>
          </div>
        </div>

        <div className="bg-gray-800 rounded-lg p-4">
          <h3 className="text-xl font-semibold mb-4">Aktivitas Terakhir</h3>
          <ActivityTable activities={activities} showPagination={false} /> {/* Hiding pagination */}
          <Link to="/riwayat-transaksi" className="mt-4 text-green-500 hover:underline">
            Lihat Semua Aktivitas
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProfileDashboard;
