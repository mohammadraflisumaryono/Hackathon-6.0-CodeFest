import  { useContext, useEffect, useState } from 'react';
import { FaDollarSign, FaPercentage, FaUsers } from 'react-icons/fa';  // Import ikon yang dibutuhkan
import Card from '../components/cardDetail';
import GuaranteeCard from '../components/GuaranteeCard'; // Import komponen GuaranteeCard
import { ApplicationLoanContext } from '../context/ApplicationLoanContext';

const DashboardPeminjam = () => {
  const { loanApproveData, fetchAllLoans } = useContext(ApplicationLoanContext); // Fetch data from context

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  // Fetch approved loans on component mount
  useEffect(() => {
    fetchAllLoans();
  }, [fetchAllLoans]);

  // Ensure data is loaded
  if (!loanApproveData || loanApproveData.length === 0) {
    return <div>Loading loans or no approved loans available...</div>;
  }

  // Calculate total pages for pagination
  const totalPages = Math.ceil(loanApproveData.length / itemsPerPage);

  // Get the current data to display based on pagination
  const currentData = loanApproveData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Pagination controls
  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handlePageClick = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <h1 className="text-2xl sm:text-3xl font-bold mb-4">Dashboard Pemberi Pinjaman</h1>
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
        <h3 className="text-lg sm:text-xl font-bold mb-6">Beri Pinjaman</h3>

        {/* Display GuaranteeCard based on pagination */}
        {currentData.map((loan, index) => (
          <GuaranteeCard
            key={index}
            name={loan.owner} // Replace with correct loan properties
            occupation={loan.occupation || 'Tidak tersedia'}
            loan={loan.amount}
            nisbah={loan.nisbah || 'N/A'}
            duration={loan.duration || 'N/A'}
            creditScore={loan.creditScore || 'N/A'}
            risk={loan.risk || 'N/A'}
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

export default DashboardPeminjam;
