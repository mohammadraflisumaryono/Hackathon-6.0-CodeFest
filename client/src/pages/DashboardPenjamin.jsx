import { FaDollarSign, FaPercentage, FaUsers } from 'react-icons/fa';  // Import ikon yang dibutuhkan
import Card from '../components/cardDetail';
import GuaranteeCard from '../components/GuaranteeCard'; // Import komponen GuaranteeCard

const DashboardPenjamin = () => {
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
          <div className="mt-8">
              <h3 className="text-xl font-bold mb-6 ml-10">Tambah Dana Jaminan</h3>
        <GuaranteeCard
          name="Ali Subekti"
          occupation="Pengusaha UMKM"
          loan="5000"
          nisbah="10"
          duration="9"
          creditScore="750"
          risk="Rendah"
        />
          </div>
           {/* Tambahkan GuaranteeCard di sini */}
          <div className="mt-8">
        <GuaranteeCard
          name="Ali Subekti"
          occupation="Pengusaha UMKM"
          loan="5000"
          nisbah="10"
          duration="9"
          creditScore="750"
          risk="Rendah"
        />
          </div>
          
           {/* Tambahkan GuaranteeCard di sini */}
          <div className="mt-8">
        <GuaranteeCard
          name="Ali Subekti"
          occupation="Pengusaha UMKM"
          loan="5000"
          nisbah="10"
          duration="9"
          creditScore="750"
          risk="Rendah"
        />
          </div>
           {/* Tambahkan GuaranteeCard di sini */}
          <div className="mt-8">
        <GuaranteeCard
          name="Ali Subekti"
          occupation="Pengusaha UMKM"
          loan="5000"
          nisbah="10"
          duration="9"
          creditScore="750"
          risk="Rendah"
        />
      </div>
    </div>
  );
};

export default DashboardPenjamin;
