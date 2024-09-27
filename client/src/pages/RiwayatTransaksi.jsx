import { useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import ActivityTable from './../components/dataTable';

const transactionData = [
  { tanggal: '2024-09-12', deskripsi: 'Pinjaman Ke Budi', jumlah: 1000, status: 'Sukses', tipe: 'Pinjaman' },
  { tanggal: '2024-09-12', deskripsi: 'Pinjaman Ke Agus', jumlah: 1000, status: 'Diproses', tipe: 'Pinjaman' },
  { tanggal: '2024-09-12', deskripsi: 'Pinjaman Ke Caca', jumlah: 1000, status: 'Aktif', tipe: 'Pembayaran' },
  { tanggal: '2024-09-12', deskripsi: 'Pinjaman Ke Dudung', jumlah: 1000, status: 'Diterima', tipe: 'Pinjaman' },
  { tanggal: '2024-09-12', deskripsi: 'Pinjaman Ke Elang', jumlah: 1000, status: 'Diterima', tipe: 'Pembayaran' },
  { tanggal: '2024-09-12', deskripsi: 'Pinjaman Ke Frisko', jumlah: 1000, status: 'Sukses', tipe: 'Pembayaran' },
  { tanggal: '2024-09-12', deskripsi: 'Pinjaman Ke Caca', jumlah: 1000, status: 'Aktif', tipe: 'Pembayaran' },
  { tanggal: '2024-09-12', deskripsi: 'Pinjaman Ke Dudung', jumlah: 1000, status: 'Diterima', tipe: 'Pinjaman' },
];

const RiwayatTransaksi = () => {
  const [searchTerm, setSearchTerm] = useState(''); // Untuk search bar
  const [selectedTipe, setSelectedTipe] = useState('Semua'); // Untuk filter tipe
  const [selectedStatus, setSelectedStatus] = useState('Semua'); // Untuk filter status

  // Filter aktivitas berdasarkan search term, tipe, dan status
  const filteredActivities = transactionData.filter(activity => {
    const matchSearch = activity.deskripsi.toLowerCase().includes(searchTerm.toLowerCase()) ||
      activity.status.toLowerCase().includes(searchTerm.toLowerCase());

    const matchTipe = selectedTipe === 'Semua' || activity.tipe === selectedTipe;
    const matchStatus = selectedStatus === 'Semua' || activity.status === selectedStatus;

    return matchSearch && matchTipe && matchStatus;
  });

  return (
    <div className="p-6 bg-gray-900 min-h-screen text-white">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Semua Aktivitas</h1>

        {/* Search bar di kanan atas */}
        <div className="relative w-72">
          <input
            type="text"
            className="bg-gray-800 text-white p-2 pl-10 rounded-md outline-none w-full"
            placeholder="Cari aktivitas..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <FaSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        </div>
      </div>

      <div className="flex space-x-4 mb-4">
        {/* Dropdown Filter Tipe */}
        <select
          value={selectedTipe}
          onChange={(e) => setSelectedTipe(e.target.value)}
          className="bg-gray-700 py-2 px-4 rounded-md text-white"
        >
          <option value="Semua">Semua Tipe</option>
          <option value="Pinjaman">Pinjaman</option>
          <option value="Pembayaran">Pembayaran</option>
        </select>

        {/* Dropdown Filter Status */}
        <select
          value={selectedStatus}
          onChange={(e) => setSelectedStatus(e.target.value)}
          className="bg-gray-700 py-2 px-4 rounded-md text-white"
        >
          <option value="Semua">Semua Status</option>
          <option value="Sukses">Sukses</option>
          <option value="Diproses">Diproses</option>
          <option value="Aktif">Aktif</option>
          <option value="Diterima">Diterima</option>
        </select>
      </div>

      {/* Tabel Aktivitas */}
      <ActivityTable activities={filteredActivities} />
    </div>
  );
};

export default RiwayatTransaksi;
