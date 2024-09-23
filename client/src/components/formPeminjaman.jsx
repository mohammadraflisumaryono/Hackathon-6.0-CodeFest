import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const FormPeminjaman = () => {
  const [step, setStep] = useState(1);
  const [files, setFiles] = useState([]);
  const navigate = useNavigate();

  const handleNext = () => {
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

  const handleFinish = () => {
    console.log('Form submitted with files:', files);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-gray-800 p-4">
      <div className="w-full max-w-xl bg-gray-800 rounded-2xl shadow-2xl mb-28 p-12 space-y-8"> {/* Perbesar card */}
        <h2 className="text-3xl font-bold text-center text-white mb-6">Form Peminjaman</h2>
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
          {step === 3 && (
            <>
              <div className="space-y-4">
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
                type="button"
                onClick={handleFinish}
                className="w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Finish
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default FormPeminjaman;
