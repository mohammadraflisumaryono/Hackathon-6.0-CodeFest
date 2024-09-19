import { FaDollarSign, FaPercentage, FaUsers } from 'react-icons/fa';  // Import ikon yang dibutuhkan
import { useState } from 'react'; // Import useState untuk pagination
import Card from '../components/cardDetail';
import GuaranteeCard from '../components/GuaranteeCard'; // Import komponen GuaranteeCard

const DashboardPenjamin = () => {
  const guaranteeData = [
    { name: "Ali Subekti", occupation: "Pengusaha UMKM", loan: "5000", nisbah: "10", duration: "9", creditScore: "750", risk: "Rendah" },
    { name: "Budi Santoso", occupation: "Petani", loan: "4000", nisbah: "12", duration: "6", creditScore: "720", risk: "Sedang" },
    { name: "Cici Andriani", occupation: "Pedagang", loan: "6000", nisbah: "8", duration: "12", creditScore: "770", risk: "Rendah" },
    { name: "Doni Wahyu", occupation: "Karyawan", loan: "3000", nisbah: "15", duration: "5", creditScore: "690", risk: "Sedang" },
    { name: "Eva Prasetya", occupation: "Freelancer", loan: "5500", nisbah: "11", duration: "10", creditScore: "740", risk: "Rendah" },
    { name: "Fajar Rahman", occupation: "Pengusaha Startup", loan: "10000", nisbah: "9", duration: "15", creditScore: "800", risk: "Rendah" },
    // Tambahkan lebih banyak data jika diperlukan
  ];

  // State untuk pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  // Hitung total halaman
  const totalPages = Math.ceil(guaranteeData.length / itemsPerPage);

  // Dapatkan data GuaranteeCard yang akan ditampilkan di halaman saat ini
  const currentData = guaranteeData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Fungsi untuk navigasi ke halaman berikutnya
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  // Fungsi untuk navigasi ke halaman sebelumnya
  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // Fungsi untuk navigasi ke halaman tertentu
  const handlePageClick = (page) => {
    setCurrentPage(page);
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4 ml-10">Dashboard Penjamin</h1>
      <p className="text-gray-300 mb-6 ml-10">
        Selamat datang di platform penjaminan berbasis blockchain! Di sini, Anda bisa memilih peminjam yang membutuhkan dana dan menjamin pinjaman <br />
        mereka dengan aman melalui smart contract blockchain yang transparan dan otomatis.
        Sistem kami memastikan setiap transaksi berjalan tanpa <br />
        risiko manipulasi dan meminimalisir risiko gagal bayar.
      </p>

      {/* Grid untuk 3 Card */}
      <div className="grid grid-cols-3 ml-28 mb-8 justify-between">
        <Card title="Total Dana Terjamin" value="50,000 USD" icon={<FaDollarSign />} />  {/* Icon Dollar */}
        <Card title="Persentase Terjamin" value="8.5 %" icon={<FaPercentage />} />       {/* Icon Persentase */}
        <Card title="Jumlah Penjamin" value="12" icon={<FaUsers />} />                   {/* Icon Users */}
      </div>

      {/* Tambahkan GuaranteeCard di sini */}
      <div className="mt-8 flex flex-col gap-6">
        <h3 className="text-xl font-bold mb-6 ml-10">Tambah Dana Jaminan</h3>

        {/* Tampilkan GuaranteeCard berdasarkan pagination */}
        {currentData.map((guarantee, index) => (
          <GuaranteeCard
            key={index}
            name={guarantee.name}
            occupation={guarantee.occupation}
            loan={guarantee.loan}
            nisbah={guarantee.nisbah}
            duration={guarantee.duration}
            creditScore={guarantee.creditScore}
            risk={guarantee.risk}
          />
        ))}

        {/* Pagination controls */}
        <div className="flex justify-center mt-8">
          <button
            className={`px-4 py-2 mx-2 ${currentPage === 1 ? 'bg-gray-400' : 'bg-blue-500 hover:bg-blue-700'} text-white rounded`}
            onClick={handlePrevPage}
            disabled={currentPage === 1}
          >
            Prev
          </button>

          {/* Daftar halaman */}
          {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
            <button
              key={page}
              className={`px-4 py-2 mx-1 ${
                currentPage === page ? 'bg-gray-800 text-white' : 'bg-gray-300 text-black'
              } rounded`}
              onClick={() => handlePageClick(page)}
            >
              {page}
            </button>
          ))}

          <button
            className={`px-4 py-2 mx-2 ${currentPage === totalPages ? 'bg-gray-400' : 'bg-green-500 hover:bg--700'} text-white rounded`}
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default DashboardPenjamin;
