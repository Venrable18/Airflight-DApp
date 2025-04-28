import { useWallet } from '../context/WalletContext';
import { useNavigate } from 'react-router-dom';
import { showFlightModal } from '../components/FlightModal';
import '../styles/dashboard.css';

const Dashboard = () => {
  const { setIsWalletConnected } = useWallet();
  const navigate = useNavigate();

  const mockFlights = [
    { id: 1, number: 'AA123' },
    { id: 2, number: 'DL456' },
    { id: 3, number: 'UA789' },
    { id: 4, number: 'AC438' },
    { id: 5, number: 'AX429' },
    { id: 6, number: 'QA78C' },
    { id: 7, number: 'UA156' },
    { id: 8, number: 'UA346' },
    { id: 9, number: 'BL409' },
  ];

  const handleDisconnect = () => {
    setIsWalletConnected(false);
    navigate('/');
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
                  Flight {flight.number}
                </h3>
                <button
                  onClick={() => console.log(`View flight ${flight.number}`)}
                  className="px-4 py-2 border-2 border-[#4C2AA0] text-[#4C2AA0] rounded-lg hover:bg-[#4C2AA0] hover:text-white transition-colors"
                >
                  View More
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;