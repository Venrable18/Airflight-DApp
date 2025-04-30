import React, { useState } from 'react';
import '../styles/date.css';

interface FlightFormData {
  flightNumber: string;
  flightDate: string;
}

interface InsureFlightModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (formData: FlightFormData) => void;
}


const CustomModal: React.FC<InsureFlightModalProps> = ({ isOpen, onClose, onSubmit }) => {
  const [flightNumber, setFlightNumber] = useState('');
  const [flightDate, setFlightDate] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('null');

    const formData: FlightFormData = {
      flightNumber,
      flightDate,
    };

    // Validation
    if (
      !formData.flightNumber ||
      !formData.flightDate
    ) {
      setError('Please fill in all fields correctly.');
      return;
    }

    onSubmit(formData);
    onClose();
  };

  if(!isOpen) return null;

  return (  
    <div>
      <div className="fixed inset-0 bg-black opacity-80 flex items-center justify-center z-50">
      </div>

      <div className='fixed inset-0 flex items-center justify-center z-50'>
        <form
          className="bg-white rounded-lg shadow-2xl p-6 w-full max-w-md space-y-4 cursor-pointer"
          onSubmit={handleSubmit}
        >
          <h2 className="text-xl text-black font-bold mb-4">Insure Flight</h2>
          {error && <div className="text-red-600 mb-2">{error}</div>}  
          <div>
            <label className="block  text-black text-sm font-medium mb-1">Flight Number</label>
            <input
              className="w-full p-2  text-black border border-black rounded"
              value={flightNumber}
              placeholder='FLight number in the form AA123'
              onChange={e => setFlightNumber(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block  text-black text-sm font-medium mb-1">Flight Date</label>
            <input
              type="date"
              className="w-full p-2 border  text-black border-black rounded"
              value={flightDate}
              onChange={e => setFlightDate(e.target.value)}
              required
              min={new Date().toISOString().split('T')[0]}
            />
          </div>
          <div className="flex justify-end space-x-2 mt-4">
          <button
              type="button"
              className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-[#4C2AA0] text-white rounded hover:bg-[#3B1F7A]"
            >
              Submit
            </button>
        
          </div>
        </form>
      </div>
    </div>
  );
};

export default CustomModal;