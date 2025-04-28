import React, { useState } from 'react';
import { WithContext as ReactTags, Tag } from 'react-tag-input';

interface FlightFormData {
  airplaneName: string;
  aircraftCode: string;
  flightNumber: string;
  flightDate: string;
  insurancePrice: number;
  passengerWalletAddresses: string[];
}

interface InsureFlightModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (formData: FlightFormData) => void;
}

const KeyCodes = {
  comma: 188,
  enter: 13,
};
const delimiters = [KeyCodes.comma, KeyCodes.enter];

const InsureFlightModal: React.FC<InsureFlightModalProps> = ({ isOpen, onClose, onSubmit }) => {
  const [airplaneName, setAirplaneName] = useState('');
  const [aircraftCode, setAircraftCode] = useState('');
  const [flightNumber, setFlightNumber] = useState('');
  const [flightDate, setFlightDate] = useState('');
  const [insurancePrice, setInsurancePrice] = useState<number | ''>('');
  const [passengerWalletAddresses, setPassengerWalletAddresses] = useState<Tag[]>([]);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const formData: FlightFormData = {
      airplaneName,
      aircraftCode,
      flightNumber,
      flightDate,
      insurancePrice: typeof insurancePrice === 'string' ? parseFloat(insurancePrice) : insurancePrice,
      passengerWalletAddresses: passengerWalletAddresses.map(tag => tag.text),
    };

    // Validation
    if (
      !formData.airplaneName ||
      !formData.aircraftCode ||
      !formData.flightNumber ||
      !formData.flightDate ||
      !formData.insurancePrice ||
      !formData.passengerWalletAddresses.length
    ) {
      setError('Please fill in all fields correctly.');
      return;
    }

    // Validate wallet addresses format (basic check)
    const isValidWalletAddress = (address: string) => /^0x[a-fA-F0-9]{40}$/.test(address);
    if (!formData.passengerWalletAddresses.every(isValidWalletAddress)) {
      setError('Please enter valid wallet addresses (0x format)');
      return;
    }

    onSubmit(formData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black  flex items-center justify-center">
      <form
        className="bg-white rounded-lg p-6 w-full max-w-md space-y-4"
        onSubmit={handleSubmit}
      >
        <h2 className="text-xl text-black font-bold mb-4">Insure Flight</h2>
        {error && <div className="text-red-600 mb-2">{error}</div>}
        <div>
          <label className="block  text-black text-sm font-medium mb-1">Airplane Name</label>
          <input
            className="w-full p-2  text-black border border-black rounded"
            value={airplaneName}
            onChange={e => setAirplaneName(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="block  text-black text-sm font-medium mb-1">Aircraft Code</label>
          <input
            className="w-full p-2 text-black border border-black rounded"
            value={aircraftCode}
            onChange={e => setAircraftCode(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="block  text-black text-sm font-medium mb-1">Flight Number</label>
          <input
            className="w-full p-2  text-black border border-black rounded"
            value={flightNumber}
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
        <div>
          <label className="block text-sm  text-black font-medium mb-1">Insurance Price (ETH)</label>
          <input
            type="number"
            className="w-full p-2 border  text-black border-black rounded"
            value={insurancePrice}
            onChange={e => setInsurancePrice(e.target.value)}
            required
            min="0.01"
            step="0.01"
          />
        </div>
        <div>
          <label className="block text-sm  text-black font-medium mb-1">Passengers' Wallet Addresses</label>
          <ReactTags
            tags={passengerWalletAddresses}
            delimiters={delimiters}
            handleDelete={i => setPassengerWalletAddresses(passengerWalletAddresses.filter((_, idx) => idx !== i))}
            handleAddition={tag => setPassengerWalletAddresses([...passengerWalletAddresses, tag])}
            placeholder="Add wallet addresses"
            classNames={{
              tags: 'flex flex-wrap gap-2',
              tagInput: 'w-full p-2  text-black border border-black rounded',
              tag: 'bg-[#E5E7EB] text-black px-2 py-1 rounded flex items-center border border-black',
              remove: 'ml-2 text-black cursor-pointer',
            }}
          />
        </div>
        <div className="flex justify-end space-x-2 mt-4">
          <button
            type="submit"
            className="px-4 py-2 bg-[#4C2AA0] text-white rounded hover:bg-[#3B1F7A]"
          >
            Submit
          </button>
          <button
            type="button"
            className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
            onClick={onClose}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default InsureFlightModal;