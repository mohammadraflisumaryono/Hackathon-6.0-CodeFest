import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ApplicationLoanContext } from '../context/ApplicationLoanContext';

const FormPeminjaman = () => {
  const [step, setStep] = useState(1);
  const [files, setFiles] = useState([]);
  const [isTermsPopupOpen, setIsTermsPopupOpen] = useState(false);
  const [isAgree, setIsAgree] = useState(false);
  const navigate = useNavigate();

  const { connectWallet, currentAccount, sendApplication } = useContext(ApplicationLoanContext);

  const [formData, setFormData] = useState({
    owner: '',
    title: '',
    description: '',
    amount: '',
    target: '',
    deadline: ''
  });

  const handleNext = () => {
    // Validasi setiap step sebelum melanjutkan
    if (step === 1) {
      const { owner, title, description } = formData;
      if (!owner || !title || !description) {
        alert('Harap isi semua field di langkah ini sebelum melanjutkan.');
        return;
      }
    }

    if (step === 2) {
      const { amount, target, deadline } = formData;
      if (!amount || !target || !deadline) {
        alert('Harap isi semua field di langkah ini sebelum melanjutkan.');
        return;
      }
    }

    if (step < 3) {
      setStep(prevStep => prevStep + 1);
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(prevStep => prevStep - 1);
    } else {
      navigate(-1);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    setFiles(prevFiles => [...prevFiles, ...selectedFiles].slice(0, 5));
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const droppedFiles = Array.from(e.dataTransfer.files);
    setFiles(prevFiles => [...prevFiles, ...droppedFiles].slice(0, 5));
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleRemoveFile = (index) => {
    setFiles(prevFiles => prevFiles.filter((_, i) => i !== index));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted with data:', formData);
    const { owner, title, description, amount, target, deadline } = formData;

    if (!owner || !title || !description || !amount || !target || !deadline) {
      alert('Harap isi semua field sebelum melanjutkan.');
      return;
    }
    setIsTermsPopupOpen(true); // Tampilkan pop-up Terms and Conditions
  };

  const handleAgreeChange = (e) => {
    setIsAgree(e.target.checked);
  };

  const handleFinish = () => {
    if (isAgree) {
      sendApplication(formData);
      setIsTermsPopupOpen(false);
    } else {
      alert('Harap setujui syarat dan ketentuan.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-gray-800 p-4">
      <div className="w-full max-w-xl bg-gray-800 rounded-2xl shadow-2xl mb-28 p-12 space-y-8">
        <h2 className="text-3xl font-bold text-center text-white mb-6">Form Peminjaman</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          {step === 1 && (
            <>
              <div>
                <label htmlFor="owner" className="block text-sm font-medium text-gray-300 mb-1">
                  Nama Pemilik Usaha
                </label>
                <input
                  id="owner"
                  name="owner"
                  type="text"
                  required
                  value={formData.owner}
                  className="w-full px-3 py-2 bg-white text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Nama Pemilik Usaha"
                  onChange={handleChange}
                />
              </div>
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-300 mb-1">
                  Judul Pinjaman
                </label>
                <input
                  id="title"
                  name="title"
                  type="text"
                  required
                  value={formData.title}
                  className="w-full px-3 py-2 bg-white text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Judul Pinjaman"
                  onChange={handleChange}
                />
              </div>
              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-300 mb-1">
                  Deskripsi
                </label>
                <textarea
                  id="description"
                  name="description"
                  rows="4"
                  required
                  value={formData.description}
                  className="w-full px-3 py-2 bg-white text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Deskripsi..."
                  onChange={handleChange}
                ></textarea>
              </div>
            </>
          )}
          {step === 2 && (
            <>
              <div>
                <label htmlFor="amount" className="block text-sm font-medium text-gray-300 mb-1">
                  Jumlah Pinjaman
                </label>
                <input
                  id="amount"
                  name="amount"
                  type="text"
                  required
                  value={formData.amount}
                  className="w-full px-3 py-2 bg-white text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Jumlah Pinjaman (eth)"
                  onChange={handleChange}
                />
              </div>
              <div>
                <label htmlFor="target" className="block text-sm font-medium text-gray-300 mb-1">
                  Target Pengembalian
                </label>
                <input
                  id="target"
                  name="target"
                  type="text"
                  required
                  value={formData.target}
                  className="w-full px-3 py-2 bg-white text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Target Pengembalian (eth)"
                  onChange={handleChange}
                />
              </div>
              <div>
                <label htmlFor="deadline" className="block text-sm font-medium text-gray-300 mb-1">
                  Tanggal Pengembalian
                </label>
                <input
                  id="deadline"
                  name="deadline"
                  type="date"
                  required
                  value={formData.deadline}
                  className="w-full px-3 py-2 bg-white text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="DD/MM/YYYY"
                  onChange={handleChange}
                />
              </div>
            </>
          )}
          {step === 3 && (
            <>
            
              {/* <div className="space-y-4">
                <h3 className="text-lg font-semibold text-white">Media Upload</h3>
                <p className="text-sm text-gray-400">Add your documents here, and you can upload up to 5 files max</p>
                <div
                  className="border-2 border-dashed border-blue-500 rounded-lg p-4 text-center cursor-pointer"
                  onDrop={handleDrop}
                  onDragOver={handleDragOver}
                >
                  <input
                    type="file"
                    onChange={handleFileChange}
                    multiple
                    accept=".pdf"
                    className="hidden"
                    id="fileInput"
                  />
                  <label htmlFor="fileInput" className="cursor-pointer text-blue-500 hover:text-blue-600">
                    Drag your file(s) or browse
                  </label>
                  <p className="text-sm text-gray-400 mt-2">Max 10 MB files are allowed</p>
                </div>
                {files.length > 0 && (
                  <ul className="space-y-2">
                    {files.map((file, index) => (
                      <li key={index} className="flex justify-between items-center text-white">
                        <span>{file.name}</span>
                        <button
                          type="button"
                          onClick={() => handleRemoveFile(index)}
                          className="text-red-500 hover:text-red-600"
                        >
                          Remove
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
                <p className="text-sm text-gray-400">Only support .pdf file</p>
              </div> */}
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
            {step < 3 ? (
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
                onClick={handleSubmit}
                className="w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Finish
              </button>
            )}
          </div>
        </form>
      </div>

      {/* Pop-up Terms and Conditions */}
      {isTermsPopupOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75">
          <div className="bg-gray-800 p-8 rounded-xl shadow-xl max-w-lg w-full">
            <h3 className="text-xl font-bold text-white mb-4">Terms and Conditions</h3>
            <p className="text-gray-300 text-sm mb-4">
              Silakan baca dan setujui syarat dan ketentuan sebelum melanjutkan transaksi.
            </p>
            <div className="flex items-center mb-4">
              <input
                type="checkbox"
                id="agree"
                checked={isAgree}
                onChange={handleAgreeChange}
                className="mr-2"
              />
              <label htmlFor="agree" className="text-gray-400">I agree to the terms and conditions</label>
            </div>
            <div className="flex justify-between">
              <button
                className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition"
                onClick={() => setIsTermsPopupOpen(false)} // Kembali ke form step 3
              >
                Back
              </button>
              <button
                className={`px-4 py-2 rounded-md text-white transition ${
                  isAgree ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-500 cursor-not-allowed'
                }`}
                onClick={handleFinish}
                disabled={!isAgree} 
              >
                Finish
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FormPeminjaman;