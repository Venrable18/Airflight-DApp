import { useState } from 'react';
import { useWallet } from '../context/WalletContext';
import { useNavigate } from 'react-router-dom';
import InsureFlightModal from '../components/InsureFlightModal';
import FlightDetailsModal from '../components/FlightDetailsModal';
import '../styles/dashboard.css';

interface FlightFormData {
  aircraftCode: string;
  flightNumber: string;
  insurancePrice: number;
  passengerWalletAddresses: string[];
}

interface Flight {
  id: number;
  aircraftCode: string;
  flightNumber: string;
  insurancePrice: number;
  passengerWalletAddresses: string[];
}

const Dashboard = () => {

  const [isModalOpen, setIsModalOpen] = useState(false);
  const[isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const[selectedFlight, setSelectedFlight] = useState<Flight | null>(null);
  const[mockFlights, setMockFlights] = useState<Flight[]>([
    { 
      id: 1,
      aircraftCode: 'AA',
      flightNumber: 'AA123',
      insurancePrice: 0.5,
      passengerWalletAddresses: ['0x123...', '0x456...'],
     },
    {
      id: 2,
      aircraftCode: 'DL',
      flightNumber: 'DL456',
      insurancePrice: 0.75,
      passengerWalletAddresses: ['0x789...'],
    },
  ]);


  const { setIsWalletConnected } = useWallet();
  const navigate = useNavigate();


  const handleDisconnect = () => {
    setIsWalletConnected(false);
    navigate('/');
  };

  const handleInsureFlight = () => {
    setIsModalOpen(true);
  };

  const handleModalSubmit = (formData: FlightFormData) => {
    console.log('Form Data:', formData);

    const newFlight = {
      id: mockFlights.length + 1,
      aircraftCode: formData.aircraftCode,
      flightNumber: formData.flightNumber,
      insurancePrice: formData.insurancePrice,
      passengerWalletAddresses: formData.passengerWalletAddresses,
    }

    setMockFlights([...mockFlights, newFlight]);
    // Handle form submission (e.g., send data to the blockchain)
  };

  const handleViewMore = (flight: Flight) => {
    setSelectedFlight(flight);
    setIsDetailsModalOpen(true);
  };

  const handleCloseDetailsModal = () => {
    setIsDetailsModalOpen(false);
    setSelectedFlight(null);
  };

  return (
    <div className="min-h-screen bg-[#4C2AA0] p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-12">
          <h1 className="text-3xl font-bold text-white">Dashboard</h1>
          <button
            onClick={handleDisconnect}
            className="px-4 py-2 bg-[#6B46C1] text-white rounded-lg hover:bg-[#553C9A] transition-colors"
          >
            Disconnect Wallet
          </button>
        </div>

        {/* Insure Flight Button */}
        <div className="flex justify-end mb-8">
          <button
            onClick={handleInsureFlight}
            className="px-6 py-3 bg-[#FFD700] text-[#4C2AA0] font-semibold rounded-lg hover:bg-[#FFC700] transition-colors"
          >
            Insure Flight
          </button>
        </div>

        {/* Insured Flights Section */}
        <div>
          <h2 className="text-2xl font-bold text-white mb-8">Insured Flights</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockFlights.map((flight) => (
              <div
                key={flight.id}
                className="bg-white rounded-lg p-6 flex flex-col items-center space-y-4"
              >
                <h3 className="text-xl font-semibold text-[#4C2AA0]">
                  Flight {flight.flightNumber}
                </h3>
                <button
                  onClick={() => handleViewMore(flight)}
                  className="px-4 py-2 border-2 border-[#4C2AA0] text-[#4C2AA0] rounded-lg hover:bg-[#4C2AA0] hover:text-white transition-colors"
                >
                  View More
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
      <InsureFlightModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleModalSubmit}
      />
      {(isDetailsModalOpen && selectedFlight) && (
        <FlightDetailsModal
          isOpen={isDetailsModalOpen}
          onClose={handleCloseDetailsModal}
          flight={selectedFlight}
        />
      )}
    </div>

  );
}

export default Dashboard;