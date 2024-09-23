import { useContext, useState } from 'react';
import { FaDollarSign, FaPercentage, FaUsers } from 'react-icons/fa';
import Card from '../components/cardDetail';
import GuaranteeCard from '../components/GuaranteeCard'; 
import { ApplicationLoanContext } from '../context/ApplicationLoanContext'; 

const DashboardPenjamin = () => {
  const { value } = useContext(ApplicationLoanContext);
  console.log(value);

  const guaranteeData = [
    { name: "Ali Subekti", occupation: "Pengusaha UMKM", loan: "5000", nisbah: "10", duration: "9", creditScore: "750", risk: "Rendah" },
    { name: "Budi Santoso", occupation: "Petani", loan: "4000", nisbah: "12", duration: "6", creditScore: "720", risk: "Sedang" },
    { name: "Cici Andriani", occupation: "Pedagang", loan: "6000", nisbah: "8", duration: "12", creditScore: "770", risk: "Rendah" },
    { name: "Doni Wahyu", occupation: "Karyawan", loan: "3000", nisbah: "15", duration: "5", creditScore: "690", risk: "Sedang" },
    { name: "Eva Prasetya", occupation: "Freelancer", loan: "5500", nisbah: "11", duration: "10", creditScore: "740", risk: "Rendah" },
    { name: "Fajar Rahman", occupation: "Pengusaha Startup", loan: "10000", nisbah: "9", duration: "15", creditScore: "800", risk: "Rendah" },
  ];

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;
  const totalPages = Math.ceil(guaranteeData.length / itemsPerPage);
  const currentData = guaranteeData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handlePageClick = (page) => setCurrentPage(page);

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <h1 className="text-2xl sm:text-3xl font-bold mb-4">Dashboard Penjamin</h1>
      <p className="text-gray-300 text-sm sm:text-base lg:text-lg mb-6">
        Selamat datang di platform penjaminan berbasis blockchain! Di sini, Anda bisa memilih peminjam yang membutuhkan dana dan menjamin pinjaman 
        mereka dengan aman melalui smart contract blockchain yang transparan dan otomatis. Sistem kami memastikan setiap transaksi berjalan tanpa 
        risiko manipulasi dan meminimalisir risiko gagal bayar.
      </p>

      {/* Grid for Cards */}
      <div className="flex justify-center">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-7xl w-full mx-auto">
          <Card title="Total Dana Terjamin" value="50,000 USD" icon={<FaDollarSign />} />  
          <Card title="Persentase Terjamin" value="8.5 %" icon={<FaPercentage />} />       
          <Card title="Jumlah Penjamin" value="12" icon={<FaUsers />} />                   
        </div>
      </div>

      {/* Guarantee Cards and Pagination */}
      <div className="mt-8 flex flex-col gap-6">
        <h3 className="text-lg sm:text-xl font-bold mb-6">Tambah Dana Jaminan </h3>

        {/* Guarantee Cards displayed per page */}
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

        {/* Pagination Controls */}
        <div className="flex justify-center mt-8">
          <button
            className={`px-4 py-2 mx-2 text-sm sm:text-base ${currentPage === 1 ? 'bg-gray-400' : 'bg-green-500 hover:bg-green-700'} text-white rounded`}
            onClick={handlePrevPage}
            disabled={currentPage === 1}
          >
            Prev
          </button>

          {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
            <button
              key={page}
              className={`px-4 py-2 mx-1 text-sm sm:text-base ${
                currentPage === page ? 'bg-gray-800 text-white' : 'bg-gray-300 text-black'
              } rounded`}
              onClick={() => handlePageClick(page)}
            >
              {page}
            </button>
          ))}

          <button
            className={`px-4 py-2 mx-2 text-sm sm:text-base ${currentPage === totalPages ? 'bg-gray-400' : 'bg-green-500 hover:bg-green-700'} text-white rounded`}
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
