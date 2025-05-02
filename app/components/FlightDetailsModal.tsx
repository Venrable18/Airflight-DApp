import React from 'react';
import image1 from '../assets/airplane-sky_1308-31202.png';
import barcode from '../assets/barcode.png';
import a_svg from '../assets/148768013_a4a0801a-2ba9-4571-a244-823120e79c2b.svg'
import airplaneSkySvg from '../assets/airplane-sky_1308-31202.png';

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

  const today = new Date().toLocaleDateString();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50"
        onClick={onClose}
      />
      {/* Modal content */}
      <div 
        className="relative max-w-sm w-full mx-auto mb-4 min-h-39 p-4 rounded-xl shadow-2xl z-60 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${airplaneSkySvg})` }}
        onClick={e => e.stopPropagation()} // Prevent closing when clicking inside modal
      >
        {/* Close button */}
        <button
          className="absolute top-2 right-2 text-red-400 hover:text-gray-800 text-2xl font-bold focus:outline-none"
          onClick={onClose}
          aria-label="Close"
        >
          &times;
        </button>
        {/* Phone status bar */}
        <div className="flex justify-between items-center mb-2 px-1">
          <span className="text-sm font-medium text-black">
            <span>Today</span>: {today}</span>
        </div>

        {/* Boarding pass card */}
        <div className="bg-white rounded-xl overflow-hidden shadow-lg">
          {/* Header */}
          <div className="bg-[#1a2d5a] text-white p-4 flex items-center justify-center">
            <h1 className="text-lg font-medium">Boarding pass</h1>
          </div>

          {/* Main content */}
          <div className="p-6 bg-white">
            {/* Flight info */}
            <div className="flex justify-between text-xs text-gray-500 mb-1">
              <span>Flight date</span>
              <span>Time</span>
            </div>
            <div className="flex justify-between text-sm font-medium mb-6">
              <span className='text-black'>26th Jan, 2024</span>
              <span className='text-black'>8:30 AM</span>
            </div>

            {/* Airports */}
            <div className="flex justify-between items-center mb-4">
              <div className="text-left">
                <div className="text-3xl font-bold text-black">NCY</div>
                <div className="text-xs text-gray-500">Paris</div>
              </div>
              
              <div className="flex flex-col items-center mx-2">
                <div className="text-xs text-gray-500">513 Km</div>
                <div className="flex items-center">
                  <div className="h-[1px] w-12 bg-gray-300"></div>
                  <img
                    src={a_svg}  alt="Custom SVG"className="h-4 text-blue-500 mx-1 transform rotate-90"/>
                  <div className="h-[1px] w-12 bg-gray-300"></div>
                </div>
              </div>
              
              <div className="text-right">
                <div className="text-3xl font-bold text-black">FLR</div>
                <div className="text-xs text-gray-500">France</div>
              </div>
            </div>

            {/* Airplane image */}
            <div className="relative h-32 mb-4">
              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2">
                <img src={image1} alt="Freedom airline" className="w-auto h-auto" />
              </div>
            </div>

            {/* Flight details */}
            <div className='bg-[#1a2d5a]'>
                <div className='p-3'>
            <div className="flex justify-around space-x-2  text-white text-center py-2 text-xs">
              <div>ICO</div>
              <div>Flight <br />Number</div>
              <div>Depart</div>
              <div>Gate</div>
            </div>
            
            <div className="flex justify-around space-x-3  text-white text-center py-2 mb-4">
              <div>{flight.aircraftCode}</div>
              <div>{flight.flightNumber}</div>
              <div>8:30 AM</div>
              <div>23A</div>
            </div>

            {/* Passenger details */}
            <div className="grid grid-cols-4 text-xs mb-1">
              <div>Seat</div>
              <div>Class</div>
              <div>Boarding</div>
              <div>Passenger</div>
            </div>
            
            <div className="grid grid-cols-4 font-medium mb-6">
              <div>7-G</div>
              <div>A</div>
              <div>7:30 AM</div>
              <div>Jennifer</div>
            </div>

            </div>
            </div>

            {/* Barcode */}
            <div className="w-full  z-10">
              <img src={barcode} alt="Barcode" className="w-full h-16 bg-gray-200" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlightDetailsModal;