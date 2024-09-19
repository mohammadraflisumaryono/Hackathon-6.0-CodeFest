import PropTypes from 'prop-types';
import { FaDollarSign, FaPercentage, FaClock, FaChartLine } from 'react-icons/fa';

const GuaranteeCard = ({ name, occupation, loan, nisbah, duration, creditScore, risk }) => {
    return (
        <div className="bg-gray-800 text-white rounded-3xl p-6 shadow-lg h-64 ml-32 flex w-10/12 justify-between items-center">
            {/* Bagian Kiri: Detail Peminjam */}
            <div>
                <h3 className="text-2xl ml-6 font-bold mb-4">{name}</h3>
                <p className="text-gray-400 ml-6 mb-4">{occupation}</p>
                <div className="grid grid-cols-2 ml-10 gap-x-96 gap-y-5">
                    <div className="flex items-center">
                        <FaDollarSign className="mr-2 text-green-400" />
                        <p>Pinjaman: {loan} USD</p>
                    </div>
                    <div className="flex items-center">
                        <FaPercentage className="mr-2 text-green-400" />
                        <p>Nisbah: {nisbah}%</p>
                    </div>
                    <div className="flex items-center">
                        <FaClock className="mr-2 text-green-400" />
                        <p>Durasi: {duration} bulan</p>
                    </div>
                    <div className="flex items-center">
                        <FaChartLine className="mr-2 text-green-400" />
                        <p>Skor Kredit: {creditScore}</p>
                    </div>
                </div>
                <p className="text-gray-500 ml-6 mt-6">Resiko: {risk}</p>
            </div>

            {/* Bagian Kanan: Tombol dan Tindakan */}
            <div className="text-right">
                <button className="bg-white text-gray-800 px-4 py-2 rounded-md hover:bg-gray-300 mr-10 transition mb-32">
                    Jamin
                </button>
                <a href="#" className="block text-green-400 hover:underline mr-10">
                    <span className="mr-1">⏷</span> Show More Profile
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
