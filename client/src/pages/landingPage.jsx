import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';


// Reusable Components

const Button = ({ text, ariaLabel, className = "", onClick }) => (
    <button
        className={`bg-blue-500 text-white px-6 py-3 rounded-md hover:bg-blue-600 transition duration-300 ${className}`}
        aria-label={ariaLabel}
        onClick={onClick} // <-- Menambahkan event handler di sini
    >
        {text}
    </button>
);

Button.propTypes = {
    text: PropTypes.string.isRequired,
    ariaLabel: PropTypes.string.isRequired,
    className: PropTypes.string,
    onClick: PropTypes.func.isRequired// <-- Menambahkan properti onClick
};

const ImageBox = ({ imageSrc, altText, color }) => (
    <div className={`${color} p-6 flex items-center justify-center`}>
        <img src={imageSrc} alt={altText} className="w-40 h-40 object-contain" />
    </div>
);

ImageBox.propTypes = {
    imageSrc: PropTypes.string.isRequired,
    altText: PropTypes.string.isRequired,
    color: PropTypes.string
};

const IconBox = ({ icon, color }) => (
    <div className={`${color} p-6 flex items-center justify-center`}>
        {icon}
    </div>
);

IconBox.propTypes = {
    icon: PropTypes.node.isRequired,
    color: PropTypes.string
};

const LayananCard = ({ imageSrc, title, description }) => (
    <div className="bg-gray-800 p-6 rounded-3xl text-center w-auto h-96 mb-12 border" id=''>
        <div className="flex justify-center mb-4">
            <img src={imageSrc} alt={title} className="w-40 h-40" />
        </div>
        <h3 className="text-lg font-semibold mb-2 p-2">{title}</h3>
        <p className="text-lg text-gray-400">{description}</p>
    </div>
);

LayananCard.propTypes = {
    imageSrc: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired
};

const ProcessStep = ({ number, title, description, imageSrc, isLeft }) => (
  <div className={`flex items-center mb-16 ${isLeft ? 'flex-row' : 'flex-row-reverse'}`}>
    <div className={`w-1/3 ${isLeft ? 'pr-8' : 'pl-8'}`}>
      <div className="bg-gray-700 rounded-lg p-4 mb-4 w-52 h-52 flex items-center justify-center">
        <img src={imageSrc} alt={title} className="w-44 h-44 object-contain" />
      </div>
    </div>
    <div className="w-5/6">
      <div className="flex items-center mb-4">
        <div className="text-5xl font-bold text-gray-600 mr-6">{number}</div>
        <h3 className="text-3xl font-semibold">{title}</h3>
      </div>
      <p className="text-lg text-gray-400">{description}</p>
    </div>
  </div>
);

ProcessStep.propTypes = {
    number: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    imageSrc: PropTypes.string.isRequired,
    isLeft: PropTypes.bool.isRequired
};

// Sections
const HeroSection = () => {
    const navigate = useNavigate();

    const buttonMulaiSekarang = () => { 
        console.log('Button clicked');
        navigate('/penjamin'); // Arahkan ke halaman /penjamin
    };

    return (
        <div id="Beranda" className="flex flex-col md:flex-row justify-between items-start mx-auto mb-52">
            <div className="space-y-7 mb-6 md:mb-0 ml-20 mt-24">
                <h1 className="text-7xl font-bold mt-10 font-inter">Pinjaman Aman dengan SaktiLoan</h1>
                <p className="text-lg text-gray-400 max-w-lg">
                    Sakti Loan menggunakan teknologi blockchain untuk menyediakan pinjaman dan peminjaman yang aman dan transparan.
                    Baik Anda meminjam atau memberikan pinjaman, setiap transaksi dilindungi dan cepat, tanpa perantara yang terlibat.
                </p>
               <Button
                    text="Mulai Sekarang"
                    ariaLabel="Mulai Sekarang"
                    className="cursor-pointer"
                    onClick={buttonMulaiSekarang} // <-- Properti onClick diterapkan di sini
                />
            </div>
            <ImageGrid />
        </div>
    );
};

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
  <div id="proses-peminjaman" className="bg-gray-900 text-white p-8 w-full">
    <div className="max-w-4xl mx-auto">
      <h2 className="text-4xl font-semibold text-center mb-4">Proses Peminjaman</h2>
      <p className="text-gray-400 text-center mb-12">Bagaimana caranya melakukan peminjaman di sini?</p>
      <div className="space-y-12">
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
    <div id="tentang-kami" className="bg-gray-800 text-white p-8 w-full mb-16">
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
                    <div>
                        <h3 className="text-xl font-semibold mb-2">Visi Kami</h3>
                        <p className="text-lg text-gray-400">
                            Mewujudkan masyarakat yang lebih adil dengan memberikan kesempatan pinjaman tanpa riba, memastikan kesejahteraan semua pihak yang terlibat.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>
);

// Main Component
const LandingPage = () => (
    <div>
        <HeroSection />
        <LayananKamiSection />
        <ProsesPeminjamanSection />
        <TentangKamiSection />
    </div>
);

export default LandingPage;
