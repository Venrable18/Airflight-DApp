import { useState } from 'react';
import { WithContext as ReactTags } from 'react-tag-input';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import 'react-tag-input/example/reactTags.css';

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

const InsureFlightModal = ({ isOpen, onClose, onSubmit }: InsureFlightModalProps) => {
  const [airplaneName, setAirplaneName] = useState('');
  const [aircraftCode, setAircraftCode] = useState('');
  const [flightNumber, setFlightNumber] = useState('');
  const [flightDate, setFlightDate] = useState('');
  const [insurancePrice, setInsurancePrice] = useState(0);
  const [passengerWalletAddresses, setPassengerWalletAddresses] = useState<{ id: string; text: string }[]>([]);

  const handleSubmit = () => {
    const formData = {
      airplaneName,
      aircraftCode,
      flightNumber,
      flightDate,
      insurancePrice,
      passengerWalletAddresses: passengerWalletAddresses.map(tag => tag.text),
    };

    if (
      !airplaneName ||
      !aircraftCode ||
      !flightNumber ||
      !flightDate ||
      !insurancePrice ||
      !passengerWalletAddresses.length
    ) {
      Swal.fire('Error', 'Please fill in all fields correctly.', 'error');
      return;
    }

    onSubmit(formData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Insure Flight</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Airplane Name</label>
            <input
              type="text"
              value={airplaneName}
              onChange={(e) => setAirplaneName(e.target.value)}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Aircraft Code</label>
            <input
              type="text"
              value={aircraftCode}
              onChange={(e) => setAircraftCode(e.target.value)}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Flight Number</label>
            <input
              type="text"
              value={flightNumber}
              onChange={(e) => setFlightNumber(e.target.value)}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Flight Date</label>
            <input
              type="date"
              value={flightDate}
              onChange={(e) => setFlightDate(e.target.value)}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Insurance Price (ETH)</label>
            <input
              type="number"
              value={insurancePrice}
              onChange={(e) => setInsurancePrice(parseFloat(e.target.value))}
              className="w-full p-2 border rounded"
              min="0.01"
              step="0.01"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Passengers' Wallet Addresses</label>
            <ReactTags
              tags={passengerWalletAddresses}
              handleDelete={(i) => setPassengerWalletAddresses(passengerWalletAddresses.filter((_, index) => index !== i))}
              handleAddition={(tag) => setPassengerWalletAddresses([...passengerWalletAddresses, tag])}
              placeholder="Add wallet addresses"
              classNames={{
                tags: 'react-tags-wrapper',
                tagInput: 'w-full',
                tag: 'react-tags__tag',
                remove: 'react-tags__remove',
              }}
            />
          </div>
        </div>
        <div className="mt-6 flex justify-end space-x-4">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-[#4C2AA0] text-white rounded hover:bg-[#3B1F7A]"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default InsureFlightModal;