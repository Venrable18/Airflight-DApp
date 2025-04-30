import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import planeImage from '../assets/image1.png';
import prof from '../assets/prof.png';
import Swal from 'sweetalert2';
import CustomModal from '../components/claimInsurance';
import { useWallet } from '../context/WalletContext';


export default function Home() {
  const navigate = useNavigate();
  const { isWalletConnected, walletAddress, setIsWalletConnected, setWalletAddress } = useWallet();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  const handleInsuranceSubmit = (formData: FlightFormData) => {
    console.log('Form Data:', formData);
    // Handle form submission (e.g., send data to the blockchain)
    handleCloseModal(); // Close the modal after submission
  };

  const handleWalletConnection = () => {
    // Add your wallet connection logic here
    setIsWalletConnected(true);
    setWalletAddress('0xYourWalletAddress');
  };

  // Function to handle the "Dashboard" button click
  const handleDashboardClick = () => {
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen hero-gradient plane-background">
      {/* Navigation */}
      <nav className="max-w-7xl mx-auto px-6 py-6">
        <div className="flex justify-between items-center">
          <div className="flex space-x-12">
            <a href="#features" className="text-white/90 hover:text-blue-500 hover:scale-105 transition-transform duration-200 text-sm">Features</a>
            <a href="#how-it-works" className="text-white/90 hover:text-blue-500 hover:scale-105 transition-transform duration-200 text-sm">How It Works</a>
            <a href="#about" className="text-white/90 hover:text-blue-500 hover:scale-105 transition-transform duration-200 text-sm">About</a>
          </div>
          <div className="flex space-x-3">
            {isWalletConnected ? (
              <div className="flex gap-4">
                <div>
                  <button 
                    onClick={() => {
                      setIsWalletConnected(false);
                      setWalletAddress('');
                    }} 
                    className="nav-button primary-button hover:scale-105 transition-transform duration-200"
                  >
                    Disconnect Wallet
                  </button>
                </div>
                <div>
                  <button 
                    className="nav-button primary-button hover:scale-105 transition-transform duration-200" 
                    onClick={handleDashboardClick}
                  >
                    Dashboard
                  </button>
                </div>
              </div>
            ) : (
              <button className="nav-button primary-button hover:scale-105 transition-transform duration-200" onClick={handleWalletConnection}>
                Connect Wallet
              </button>
            )}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 flex">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 py-16">
          {/* Left Column */}
          <div className="space-y-6 pt-8">
            <h1 className="text-[56px] leading-[1.1] font-bold text-[#F8F7FF]">
              Real-Time<br />
              Flight Delay<br />
              Insurance
            </h1>
            <p className="text-[#F8F7FF]/90 text-xl max-w-md">
              Get automated, real-time payouts for flight delays with blockchain-based insurance.
            </p>
            <div className="pt-4">
              <button 
                className="get-started-button"
                onClick={() => {
                  if (!isWalletConnected) {
                    Swal.fire({
                      title: 'Error!',
                      text: 'Please connect your wallet to proceed',
                      icon: 'error',
                      confirmButtonText: 'OK',
                      timer: 2000,
                      timerProgressBar: true
                    });
                  } else {
                    {/* Add your logic for handling the insurance claim here and navigate to the  */}
                 handleOpenModal();
                  }
                }}
              >
                {isWalletConnected ? 'Claim Insurance' : 'Get Started'}
              </button>
            </div>
          </div>

          {/* Right Column */}
          <div className="right-column mx-10 hidden md:block ">
            <img 
              src={planeImage} 
              alt="Plane illustration" 
              className="plane-image"
              style={{ 
                width: '100%', 
                maxWidth: '500px',
                opacity: 0.8
              }}
            />
          </div>
          <div className="right-column hidden md:block">
            <img 
              src={prof} 
              alt="professionals" 
              className="plane-image"
              style={{ 
                width: '100%', 
                maxWidth: '500px',
              }}
            />
          </div>

          {/* Right Column */}
          <div className="flex items-center">
            <div className="card w-full max-w-lg mx-auto p-8">
              <div className="text-center mb-8">
                <h2 className="text-[32px] font-bold text-gray-900 mb-4">
                  Flight Delay Insurance
                </h2>
                <p className="text-gray-600">
                  Protect your journey with instant, automated insurance coverage for flight delays.
                </p>
              </div>
              <div className="inner-card p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  Smart Contract Protection
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Our blockchain-based smart contracts ensure immediate, transparent payouts when delays occur. No paperwork, no waiting.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
      {/* Modal */}
      {isModalOpen && (
        <CustomModal isOpen={isModalOpen} onClose={handleCloseModal} onSubmit={handleInsuranceSubmit} />
      )}
    </div>
  );
}
