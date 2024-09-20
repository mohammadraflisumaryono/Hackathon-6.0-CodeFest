import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const FormPeminjaman = () => {
  const [step, setStep] = useState(1);
  const navigate = useNavigate();

  const handleNext = () => {
    setStep(2);
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    } else {
      navigate(-1);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log('Form submitted');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-gray-800 p-4">
      <div className="w-full max-w-md bg-gray-800 rounded-2xl shadow-2xl p-8 space-y-8">
        <h2 className="text-3xl font-bold text-center text-white mb-6">
          Form Peminjaman
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          {step === 1 && (
            <>
              <div>
                <label htmlFor="nama-usaha" className="block text-sm font-medium text-gray-300 mb-1">
                  Nama Usaha
                </label>
                <input
                  id="nama-usaha"
                  name="nama-usaha"
                  type="text"
                  required
                  className="w-full px-3 py-2 bg-white text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Nama Usaha"
                />
              </div>
              <div>
                <label htmlFor="deskripsi" className="block text-sm font-medium text-gray-300 mb-1">
                  Deskripsi
                </label>
                <textarea
                  id="deskripsi"
                  name="deskripsi"
                  rows="4"
                  required
                  className="w-full px-3 py-2 bg-white text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Deskripsi..."
                ></textarea>
              </div>
            </>
          )}
          {step === 2 && (
            <>
              <div>
                <label htmlFor="jumlah-pinjaman" className="block text-sm font-medium text-gray-300 mb-1">
                  Jumlah Pinjaman
                </label>
                <input
                                  id="jumlah-pinjaman"
                                  
                                  
                  name="jumlah-pinjaman"
                  type="text"
                  required
                  className="w-full px-3 py-2 bg-white text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="XX (eth)"
                />
              </div>
              <div>
                <label htmlFor="jumlah-pengembalian" className="block text-sm font-medium text-gray-300 mb-1">
                  Jumlah Pengembalian
                </label>
                <input
                  id="jumlah-pengembalian"
                  name="jumlah-pengembalian"
                  type="text"
                  required
                  className="w-full px-3 py-2 bg-white text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="XXX (eth)"
                />
              </div>
              <div>
                <label htmlFor="tanggal-pengembalian" className="block text-sm font-medium text-gray-300 mb-1">
                  Tanggal Pengembalian
                </label>
                <input
                  id="tanggal-pengembalian"
                  name="tanggal-pengembalian"
                  type="text"
                  required
                  className="w-full px-3 py-2 bg-white text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="DD/MM/YYYY"
                />
              </div>
            </>
          )}
          <div className="flex justify-between space-x-4 pt-4">
            <button
              type="button"
              onClick={handleBack}
              className="w-full px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-md transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-gray-500"
            >
              Back
            </button>
            {step === 1 ? (
              <button
                type="button"
                onClick={handleNext}
                className="w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Next
              </button>
            ) : (
              <button
                type="submit"
                className="w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Submit
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default FormPeminjaman;