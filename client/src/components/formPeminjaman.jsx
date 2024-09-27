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
    const { owner, title, description, amount, target, deadline } = formData;

    if (!owner || !title || !description || !amount || !target || !deadline) {
      alert('Harap isi semua field sebelum melanjutkan.');
      return;
    }
    setIsTermsPopupOpen(true);
  };

  const handleAgreeChange = (e) => {
    setIsAgree(e.target.checked);
  };

  const handleFinish = () => {
    if (isAgree) {
      sendApplication({ ...formData, files });
      setIsTermsPopupOpen(false);
      // Navigate to a success page or reset form
      navigate('/application-submitted');
    } else {
      alert('Harap setujui syarat dan ketentuan.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-gray-800 p-4">
      <div className="w-full max-w-xl bg-gray-800 rounded-2xl shadow-2xl mb-28 p-12 space-y-8">
        <h2 className="text-3xl font-bold text-center text-white mb-6">Form Peminjaman</h2>
        
        {!currentAccount && (
          <button
            onClick={connectWallet}
            className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
          >
            Connect Wallet
          </button>
        )}

        {currentAccount && (
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
                    onChange={handleChange}
                    className="w-full px-3 py-2 bg-white text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Nama Pemilik Usaha"
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
                    onChange={handleChange}
                    className="w-full px-3 py-2 bg-white text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Judul Pinjaman"
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
                    onChange={handleChange}
                    className="w-full px-3 py-2 bg-white text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Deskripsi..."
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
                    onChange={handleChange}
                    className="w-full px-3 py-2 bg-white text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Jumlah Pinjaman (eth)"
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
                    onChange={handleChange}
                    className="w-full px-3 py-2 bg-white text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Target Pengembalian (eth)"
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
                    onChange={handleChange}
                    className="w-full px-3 py-2 bg-white text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </>
            )}
            {step === 3 && (
              <>
                <div
                  className="border-2 border-dashed border-gray-300 rounded-lg p-4"
                  onDrop={handleDrop}
                  onDragOver={handleDragOver}
                >
                  <label htmlFor="fileUpload" className="block text-sm font-medium text-gray-300 mb-2">
                    Upload Files (Max 5)
                  </label>
                  <input
                    id="fileUpload"
                    type="file"
                    multiple
                    onChange={handleFileChange}
                    className="hidden"
                  />
                  <button
                    type="button"
                    onClick={() => document.getElementById('fileUpload').click()}
                    className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
                  >
                    Select Files
                  </button>
                  <p className="text-sm text-gray-400 mt-2">Or drag and drop files here</p>
                </div>
                <div className="mt-4">
                  <h4 className="text-sm font-medium text-gray-300 mb-2">Uploaded Files:</h4>
                  <ul className="space-y-2">
                    {files.map((file, index) => (
                      <li key={index} className="flex justify-between items-center text-gray-300">
                        <span>{file.name}</span>
                        <button
                          type="button"
                          onClick={() => handleRemoveFile(index)}
                          className="text-red-500 hover:text-red-700"
                        >
                          Remove
                        </button>
                      </li>
                    ))}
                  </ul>
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
                  className="w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  Finish
                </button>
              )}
            </div>
          </form>
        )}
      </div>

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
                onClick={() => setIsTermsPopupOpen(false)}
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