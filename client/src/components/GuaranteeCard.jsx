import PropTypes from 'prop-types';
import { FaDollarSign, FaPercentage, FaClock, FaChartLine } from 'react-icons/fa';

const GuaranteeCard = ({ name, occupation, loan, nisbah, duration, creditScore, risk }) => {
    return (
        <div className="bg-gray-800 text-white rounded-3xl p-8 shadow-lg min-h-[250px] w-full max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Bagian Kiri: Detail Peminjam */}
            <div className="flex flex-col justify-between">
                <div>
                    <h3 className="text-2xl font-bold mb-3">{name}</h3>
                    <p className="text-gray-400 mb-4">{occupation}</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3">
                        <div className="flex items-center">
                            <FaDollarSign className="mr-2 text-green-400" />
                            <p className="text-md">Pinjaman: {loan} USD</p>
                        </div>
                        <div className="flex items-center">
                            <FaPercentage className="mr-2 text-green-400" />
                            <p className="text-md">Nisbah: {nisbah}%</p>
                        </div>
                        <div className="flex items-center">
                            <FaClock className="mr-2 text-green-400" />
                            <p className="text-md">Durasi: {duration} bulan</p>
                        </div>
                        <div className="flex items-center">
                            <FaChartLine className="mr-2 text-green-400" />
                            <p className="text-md">Skor Kredit: {creditScore}</p>
                        </div>
                    </div>
                </div>
                <p className="text-gray-500 mt-4 text-sm">Resiko: {risk}</p>
            </div>

            {/* Bagian Kanan: Tombol dan Tindakan */}
            <div className="flex flex-col justify-center items-start md:items-end md:justify-between">
                <button className="bg-white text-gray-800 py-3 px-4 rounded-md hover:bg-gray-300 transition mb-4 text-xs inline-block">
                    Jamin
                </button>
                <a href="#" className="block text-green-400 hover:underline text-md">
                    <span className="mr-2">⏷</span> Show More Profile
                </a>
            </div>
        </div>
    );
};

GuaranteeCard.propTypes = {
    name: PropTypes.string.isRequired,
    occupation: PropTypes.string.isRequired,
    loan: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    nisbah: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    duration: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    creditScore: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    risk: PropTypes.string.isRequired,
};

export default GuaranteeCard;
