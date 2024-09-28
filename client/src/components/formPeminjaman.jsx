import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ApplicationLoanContext } from '../context/ApplicationLoanContext';

const FormPeminjaman = () => {
  const [step, setStep] = useState(1);
  const [files, setFiles] = useState([]);
  const [isTermsPopupOpen, setIsTermsPopupOpen] = useState(false);
  const navigate = useNavigate();

  const { connectWallet, currentAccount, sendApplication } = useContext(ApplicationLoanContext);

  const [formData, setFormData] = useState({
    owner: '',
    title: '',
    description: '',
    amount: '',
    target: '',
    deadline: '',
    acceptedTerms: false
  });

  const handleNext = () => {
    if (validateStep(step)) {
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
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
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

  const validateStep = (currentStep) => {
    switch (currentStep) {
      case 1:
        return formData.owner && formData.title && formData.description;
      case 2:
        return formData.amount && formData.target && formData.deadline;
      case 3:
        return true; // File upload is optional
      default:
        return false;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateStep(3)) {
      setFormData(prev => ({ ...prev, owner: currentAccount }));
      setIsTermsPopupOpen(true);
    } else {
      alert('Harap isi semua field yang diperlukan sebelum melanjutkan.');
    }
  };

  const handleFinish = () => {
    if (formData.acceptedTerms) {
      console.log('Sending application with data:', formData);
      sendApplication(formData);
      setIsTermsPopupOpen(false);
      // Reset form or navigate to a success page
      // resetForm();
      // navigate('/success');
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
              <input
                name="owner"
                type="text"
                required
                value={formData.owner}
                onChange={handleChange}
                placeholder="Nama Pemilik Usaha"
                className="w-full px-3 py-2 bg-white text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                name="title"
                type="text"
                required
                value={formData.title}
                onChange={handleChange}
                placeholder="Judul Pinjaman"
                className="w-full px-3 py-2 bg-white text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <textarea
                name="description"
                rows="4"
                required
                value={formData.description}
                onChange={handleChange}
                placeholder="Deskripsi..."
                className="w-full px-3 py-2 bg-white text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              ></textarea>
            </>
          )}
          {step === 2 && (
            <>
              <input
                name="amount"
                type="text"
                required
                value={formData.amount}
                onChange={handleChange}
                placeholder="Jumlah Pinjaman (eth)"
                className="w-full px-3 py-2 bg-white text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                name="target"
                type="text"
                required
                value={formData.target}
                onChange={handleChange}
                placeholder="Target Pengembalian (eth)"
                className="w-full px-3 py-2 bg-white text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                name="deadline"
                type="date"
                required
                value={formData.deadline}
                onChange={handleChange}
                className="w-full px-3 py-2 bg-white text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </>
          )}
          {step === 3 && (
            <div
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              className="border-2 border-dashed border-gray-300 p-4 rounded-md text-center"
            >
              <input
                type="file"
                onChange={handleFileChange}
                multiple
                className="hidden"
                id="fileInput"
              />
              <label htmlFor="fileInput" className="cursor-pointer text-blue-500">
                Click to upload or drag and drop
              </label>
              <div className="mt-4">
                {files.map((file, index) => (
                  <div key={index} className="flex items-center justify-between bg-gray-700 p-2 rounded-md mb-2">
                    <span className="text-sm text-gray-300">{file.name}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveFile(index)}
                      className="text-red-500 hover:text-red-700"
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            </div>
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
                id="acceptedTerms"
                name="acceptedTerms"
                checked={formData.acceptedTerms}
                onChange={handleChange}
                className="mr-2"
              />
              <label htmlFor="acceptedTerms" className="text-gray-400">Saya setuju dengan syarat dan ketentuan</label>
            </div>
            <div className="flex justify-between">
              <button
                className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition"
                onClick={() => setIsTermsPopupOpen(false)}
              >
                Kembali
              </button>
              <button
                className={`px-4 py-2 rounded-md text-white transition ${formData.acceptedTerms ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-500 cursor-not-allowed'
                  }`}
                onClick={handleFinish}
                disabled={!formData.acceptedTerms}
              >
                Selesai
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FormPeminjaman;