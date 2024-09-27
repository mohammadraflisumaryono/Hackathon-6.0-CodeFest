import { useState } from 'react';
import PropTypes from 'prop-types';
import { FaDollarSign, FaClock, FaChartLine, FaPercent, FaFileAlt } from 'react-icons/fa';

const GuaranteeCard = ({ name, occupation, shortDescription, loan, nisbah, duration, creditScore, risk }) => {
    const [isExpanded, setIsExpanded] = useState(false);

    const fullDescription = `
        Saya membutuhkan pinjaman sebesar 1000 USDT untuk memperluas toko pakaian yang telah saya kelola selama 5 tahun. 
        Dengan pinjaman ini, saya berencana menambah stok barang dan meningkatkan promosi digital agar dapat mencapai lebih 
        banyak pelanggan. Toko saya memiliki riwayat penjualan yang stabil dengan rata-rata omzet bulanan 5000 USDT.
        Pinjaman ini akan dilunasi dalam waktu 6 bulan dengan bunga yang sesuai dengan ketentuan platform. Setiap pembayaran 
        akan dilakukan secara mingguan dari pendapatan toko. Saya yakin dengan strategi yang tepat, bisnis ini akan terus 
        berkembang dan saya dapat melunasi pinjaman tepat waktu.
    `;

    return (
        <div className="bg-gray-800 text-white rounded-3xl p-8 shadow-lg w-full max-w-7xl mx-auto">
            {/* Upper Section with Name and Button */}
            <div className="flex justify-between items-start mb-6">
                <div>
                    <h2 className="text-xl sm:text-2xl md:text-3xl font-bold">{name}</h2>
                    <p className="text-green-300 text-sm sm:text-md md:text-lg">{occupation}</p>
                </div>
                <button className="bg-white text-gray-800 py-2 px-6 rounded-lg text-xs sm:text-sm md:text-base font-medium shadow-md">
                    Jamin
                </button>
            </div>

            {/* Description Section */}
            <p className="text-sm sm:text-base md:text-lg leading-loose text-center font-light mb-24">
                {isExpanded ? fullDescription : shortDescription}
            </p>

            {/* Loan Details Section */}
            <div className="grid grid-cols-2 gap-6 mb-8 text-sm sm:text-base md:text-lg">
                <div className="flex items-center">
                    <FaDollarSign className="text-green-400 mr-2" />
                    <span className="text-green-400 mr-2">Pinjaman :</span>
                    <span>{loan} USD</span>
                </div>
                <div className="flex items-center">
                    <FaChartLine className="text-green-400 mr-2" />
                    <span className="text-green-400 mr-2">Skor Kredit :</span>
                    <span>{creditScore}</span>
                </div>
                <div className="flex items-center">
                    <FaPercent className="text-green-400 mr-2" />
                    <span className="text-green-400 mr-2">Nisbah :</span>
                    <span>{nisbah}%</span>
                </div>
                <div className="flex items-center">
                    <FaClock className="text-green-400 mr-2" />
                    <span className="text-green-400 mr-2">Durasi :</span>
                    <span>{duration} bulan</span>
                </div>
            </div>

            {/* Additional Files Section (conditionally rendered) */}
            {isExpanded && (
                <div className="mb-8">
                    <h3 className="font-semibold text-sm sm:text-base md:text-lg mb-2">File Tambahan :</h3>
                    <div className="bg-gray-800 rounded-lg p-3 flex items-center cursor-pointer hover:bg-gray-700 transition-colors">
                        <div className="bg-gray-700 rounded-full w-12 h-12 flex items-center justify-center mr-3">
                            <FaFileAlt className="text-white" />
                        </div>
                        <div>
                            <p className="text-sm font-medium">File Tambahan.pdf</p>
                            <p className="text-xs text-gray-400">500kb</p>
                        </div>
                    </div>
                </div>
            )}

            {/* Footer Section with Risk and Toggle Button */}
            <div className="flex justify-between items-center">
                <p className="text-xs sm:text-sm md:text-base text-gray-400">Resiko : {risk}</p>
                <button
                    onClick={() => setIsExpanded(!isExpanded)}
                    className="text-green-400 hover:underline text-xs sm:text-sm md:text-base flex items-center"
                >
                    <span className={`mr-1 transform ${isExpanded ? 'rotate-180' : ''} transition-transform`}>
                        ▲
                    </span>
                    {isExpanded ? 'Lebih Sedikit' : 'Lebih Banyak'}
                </button>
            </div>
        </div>
    );
};

GuaranteeCard.propTypes = {
    name: PropTypes.string.isRequired,
    occupation: PropTypes.string.isRequired,
    shortDescription: PropTypes.string.isRequired,
    loan: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    nisbah: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    duration: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    creditScore: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    risk: PropTypes.string.isRequired,
};

export default GuaranteeCard;
