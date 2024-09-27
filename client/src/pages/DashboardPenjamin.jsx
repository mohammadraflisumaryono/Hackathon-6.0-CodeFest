import { FaDollarSign, FaPercentage, FaUsers } from 'react-icons/fa';  // Import ikon yang dibutuhkan
import { useState, useContext} from 'react'; // Import useContext dan useEffect
import Card from '../components/cardDetail';
import GuaranteeCard from '../components/GuaranteeCard'; // Import komponen GuaranteeCard
import { ApplicationLoanContext } from '../context/ApplicationLoanContext'; // Import context

const DashboardPenjamin = () => {
  const { loanData } = useContext(ApplicationLoanContext); // Ambil loanData dari Context
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;


  console.log(loanData)

  // Hitung total halaman
  const totalPages = Math.ceil(loanData.length / itemsPerPage);

  // Dapatkan data GuaranteeCard yang akan ditampilkan di halaman saat ini
  const currentData = loanData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

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

      {/* Grid untuk 3 Card */}
      <div className="flex justify-center">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 md:gap-2 lg:grid-cols-3 xl:grid-cols-3 gap-6 max-w-7xl w-full mx-auto">
          <Card title="Total Dana Terjamin" value="50,000 USD" icon={<FaDollarSign />} />  {/* Icon Dollar */}
          <Card title="Persentase Terjamin" value="8.5 %" icon={<FaPercentage />} />       {/* Icon Persentase */}
          <Card title="Jumlah Penjamin" value="12" icon={<FaUsers />} />                   {/* Icon Users */}
        </div>
      </div>

      {/* Guarantee Cards and Pagination */}
      <div className="mt-8 flex flex-col gap-6">
        <h3 className="text-lg sm:text-xl font-bold mb-6">Tambah Dana Jaminan </h3>

        {/* Tampilkan GuaranteeCard berdasarkan pagination */}
        {currentData.length > 0 ? (
          currentData.map((loan, index) => (
            <GuaranteeCard
              key={index}
              name={loan.owner}
              occupation={loan.title} // Menyesuaikan dengan field dari smart contract
              loan={loan.amount}
              nisbah={loan.target}
              duration={loan.deadline}
              creditScore="750" // Placeholder, sesuaikan jika ada credit score dalam data
              risk="Rendah" // Placeholder, sesuaikan jika ada data risiko
            />
          ))
        ) : (
          <p className="text-center text-gray-500">Tidak ada data pinjaman yang tersedia.</p>
        )}

        {/* Pagination controls */}
        {totalPages > 1 && (
          <div className="flex justify-center mt-8">
            <button
              className={`px-4 py-2 mx-2 ${currentPage === 1 ? 'bg-gray-400' : 'bg-green-500 hover:bg-green-700'} text-white rounded`}
              onClick={handlePrevPage}
              disabled={currentPage === 1}
            >
              Prev
            </button>

            {/* Daftar halaman */}
            {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
              <button
                key={page}
                className={`px-4 py-2 mx-1 ${currentPage === page ? 'bg-gray-800 text-white' : 'bg-gray-300 text-black'} rounded`}
                onClick={() => handlePageClick(page)}
              >
                {page}
              </button>
            ))}

            <button
              className={`px-4 py-2 mx-2 ${currentPage === totalPages ? 'bg-gray-400' : 'bg-green-500 hover:bg-green-700'} text-white rounded`}
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardPenjamin;
