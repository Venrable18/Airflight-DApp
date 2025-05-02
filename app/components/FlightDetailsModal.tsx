import React from 'react';

interface FlightDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  flight: {
    aircraftCode: string;
    flightNumber: string;
    insurancePrice: number;
    passengerWalletAddresses: string[];
  };
}

const FlightDetailsModal: React.FC<FlightDetailsModalProps> = ({ isOpen, onClose, flight }) => {
  if (!isOpen) return null;

  return (
    <div>
      <div className="fixed inset-0 bg-black opacity-80 flex items-center justify-center z-50"></div>
      <div className="fixed inset-0 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg shadow-2xl p-6 w-full max-w-md space-y-4">
          <h2 className="text-xl text-black font-bold mb-4">Flight Details</h2>
          <div>
            <p className="text-black"><strong>Airline ICAO:</strong> {flight.aircraftCode}</p>
            <p className="text-black"><strong>Flight Number:</strong> {flight.flightNumber}</p>
            <p className="text-black"><strong>Insurance Price:</strong> {flight.insurancePrice} ETH</p>
            <p className="text-black">
              <strong>Passengers' Wallet Addresses:</strong>
              <ul className="list-disc pl-6">
                {flight.passengerWalletAddresses.map((address, index) => (
                  <li key={index} className="text-black">{address}</li>
                ))}
              </ul>
            </p>
          </div>
          <div className="flex justify-end">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlightDetailsModal;