import React from 'react';
import { FaGlobe, FaUniversity, FaLock, FaHandshake, FaClipboardList, FaSearch, FaCheckCircle } from 'react-icons/fa';

// Reusable Components

const Button = ({ text, ariaLabel, className = "" }) => (
    <button
        className={`bg-blue-500 text-white px-6 py-3 rounded-md hover:bg-blue-600 transition duration-300 ${className}`}
        aria-label={ariaLabel}
    >
        {text}
    </button>
);

const ImageBox = ({ imageSrc, altText, color }) => (
    <div className={`${color} p-6 flex items-center justify-center`}>
        <img src={imageSrc} alt={altText} className="w-40 h-40 object-contain" />
    </div>
);

const IconBox = ({ imageSrc, title, icon, color }) => (
    <div className={`${color} p-6 flex items-center justify-center`}>
        {icon}
    </div>
);

const LayananCard = ({ imageSrc, title, description }) => (
    <div className="bg-gray-800 p-6 rounded-3xl text-center w-auto h-96 mb-12 border">
        <div className="flex justify-center mb-4">
            <img src={imageSrc} alt={title} className="w-40 h-40" />
        </div>
        <h3 className="text-lg font-semibold mb-2 p-2">{title}</h3>
        <p className="text-lg text-gray-400">{description}</p>
    </div>
);

const ProcessStep = ({ number, title, description, imageSrc, isLeft }) => (
    <div className={`flex items-center mb-12 ${isLeft ? '' : 'flex-row-reverse'}`}>
        <div className={`w-1/2 flex ${isLeft ? 'justify-end pr-8' : 'justify-start pl-8'}`}>
            <div className="text-center">
                <div className="bg-gray-700 rounded-lg p-2 mb-2">
                    <img src={imageSrc} alt={title} className="w-16 h-16 object-contain" />
                </div>
                <div className="text-4xl font-bold text-gray-600">{number}</div>
            </div>
        </div>
        <div className="w-1/2">
            <h3 className="text-xl font-semibold mb-2">{title}</h3>
            <p className="text-sm text-gray-400">{description}</p>
        </div>
    </div>
);

// Sections

const HeroSection = () => (
    <div id="Beranda" className="flex flex-col md:flex-row justify-between items-start mx-auto mb-52">
        <div className="space-y-7 mb-6 md:mb-0 ml-20 mt-24">
            <h1 className="text-7xl font-bold mt-10 font-inter">Pinjaman Aman dengan SaktiLoan</h1>
            <p className="text-lg text-gray-400 max-w-lg">
                Sakti Loan menggunakan teknologi blockchain untuk menyediakan pinjaman dan peminjaman yang aman dan transparan.
                Baik Anda meminjam atau memberikan pinjaman, setiap transaksi dilindungi dan cepat, tanpa perantara yang terlibat.
            </p>
            <Button text="Mulai Sekarang" ariaLabel="Mulai Sekarang" />
        </div>
        <ImageGrid />
    </div>
);

const ImageGrid = () => (
    <div className="grid grid-cols-2 gap-4 mt-32 mr-20 ">
        <ImageBox imageSrc="../img/budget.png" altText="Dollar Sign" color="bg-orange-500" />
        <ImageBox imageSrc="../img/bagusss 1.png" altText="Chart Line" color="bg-green-500" />
        <ImageBox imageSrc="../img/diagram.png" altText="Chart Bar" color="bg-yellow-500" />
        <ImageBox imageSrc="../img/whiteboard.png" altText="Briefcase" color="bg-blue-500" />
    </div>
);

const LayananKamiSection = () => (
    <div id="layanan-kami" className="bg-gray-800 text-white p-8 w-full flex justify-center items-center mb-16">
        <div className="bg-gray-800 text-white p-8 w-full mb-2">
            <h2 className="text-3xl font-bold text-center mb-8">Layanan Kami</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mt-40">
                <LayananCard
                    imageSrc="../img/duit.png"
                    title="Pinjaman Sesuai Syariah"
                    description="Mematuhi prinsip syariah, memastikan keadilan dan transparansi tanpa bunga."
                />
                <LayananCard
                    imageSrc="../img/education-cost.png"
                    title="Blockchain Transparan"
                    description="Setiap transaksi dicatat di blockchain, memastikan transparansi dan kepercayaan penuh."
                />
                <LayananCard
                    imageSrc="../img/personal.png"
                    title="Transaksi Etis"
                    description="Mendukung praktik peminjaman yang etis sesuai dengan hukum syariah."
                />
            </div>
            <div className="text-center mt-8">
                <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors">
                    Selengkapnya
                </button>
            </div>
        </div>
    </div>
);



const ProsesPeminjamanSection = () => (
    <div id="proses-peminjaman" className="bg-gray-900 text-white p-8 w-full mb-16">
        <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-semibold text-center mb-6">Proses Peminjaman</h2>
            <p className="text-gray-400 text-center mb-10">Bagaimana caranya melakukan peminjaman di sini?</p>
            <div className="space-y-8">
                <ProcessStep
                    number="01"
                    title="Pengisian Data Peminjaman"
                    description="Peminjam mengisi formulir yang dibutuhkan dan sangat mudah prosesnya."
                    imageSrc="../img/contract.png"
                    isLeft={true}
                />
                <ProcessStep
                    number="02"
                    title="Mencari Penjamin"
                    description="Setelah data diisi, penjamin harus menyetujui peminjaman yang akan menjamin kelancaran transaksi."
                    imageSrc="../img/send-money 1.png"
                    isLeft={false}
                />
                <ProcessStep
                    number="03"
                    title="Dana Jaminan Terpenuhi"
                    description="Ketika penjamin sudah memenuhi dana jaminan, maka proses akan dilanjutkan ke pemberi pinjaman."
                    imageSrc="../img/pinjam.png"
                    isLeft={true}
                />
                <ProcessStep
                    number="04"
                    title="Pemberi Pinjaman Bertransaksi"
                    description="Pemberi pinjaman bersedia, kemudian proses dilanjutkan dan peminjam menerima dana sesuai kesepakatan."
                    imageSrc="../img/peer-to-peer.png"
                    isLeft={false}
                />
            </div>
        </div>
    </div>
);

const TentangKamiSection = () => (
    <div id="tentang-kami" className="bg-gray-900 text-white p-8 w-full mb-16">
        <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl font-semibold mb-6">Tentang Kami</h2>
            <div className="flex">
                <div className="w-1/3 pr-8">
                    <img src="../img/about us.png" alt="Tentang Kami" className="w-full h-auto" />
                </div>
                <div className="w-2/3 flex flex-col justify-between">
                    <div>
                        <h3 className="text-xl font-semibold mb-2">Misi Kami</h3>
                        <p className="text-lg text-gray-400">
                            Kami berkomitmen menyederhanakan proses pinjaman sesuai prinsip syariah, menyediakan platform yang aman, tanggung, dan tanpa bunga.
                        </p>
                    </div>
                    <div className="mt-4">
                        <h3 className="text-xl font-semibold mb-2">Visi Kami</h3>
                        <p className="text-lg text-gray-400">
                            Membangun jaringan global berbasis blockchain yang mengutamakan keadilan, transparansi, dan integritas dalam transaksi keuangan.
                        </p>
                    </div>
                    <div className="mt-4">
                        <h3 className="text-xl font-semibold mb-2">Kenapa Memilih Kami</h3>
                        <ul className="text-lg text-gray-400">
                            <li className="flex items-center mb-1">
                                <FaUniversity className="mr-2" />
                                Kepatuhan Syariah : Semua transaksi adil dan bebas bunga.
                            </li>
                            <li className="flex items-center mb-1">
                            <FaLock className="mr-2" />
                                Transparansi Blockchain : Setiap transaksi tercatat, membangun kepercayaan.
                            </li>
                            <li className="flex items-center">
                            <FaGlobe className="mr-2" />
                                Jangkauan Global : Terhubung dengan pengguna di seluruh dunia.
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
);


// Main Component

const LandingPage = () => (
    <div className="bg-gray-900 text-white">
        <HeroSection />
        <LayananKamiSection />
        <ProsesPeminjamanSection />
        <TentangKamiSection />
        {/* Additional sections can be added here */}
    </div>
);

export default LandingPage;
