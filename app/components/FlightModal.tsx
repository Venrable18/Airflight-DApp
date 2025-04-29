import Swal from 'sweetalert2';
import { WithContext as ReactTags } from 'react-tag-input';
import ReactDOM from 'react-dom/client';
import '../styles/FlightModal.css';

interface FlightModalProps {
  isWalletConnected: boolean;
  onSubmit: (formData: FlightFormData) => void;
  onSuccess?: () => void;
}

export interface FlightFormData {
  flightNumber: string;
  flightDate: string;
}


const validateForm = (formData: Partial<FlightFormData>): boolean => {
  if (!formData.flightNumber) {
    return false;
  }
  const flightNumberRegex = /^[A-Z]{2}\d{3,4}$/;
  if (!flightNumberRegex.test(formData.flightNumber)) {
    return false;
  }
  return true;
};

export const showFlightModal = async ({
  isWalletConnected,
  onSubmit,
  onSuccess
}: FlightModalProps) => {
 
  const result = await Swal.fire({
    title: 'Flight Insurance Details',
    html: `
      <div id="validationError" class="hidden mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded"></div>
      <form id="flightInsuranceForm" class="space-y-6 cursor-grab">
        <div class="text-left">
          <label class="block text-sm font-medium text-gray-700 mb-1">Flight Number</label>
          <input id="flightNumber" class="swal2-input w-full" placeholder="Flight Number (e.g., AA1234)" required>
        </div>
      </form>
    `,
    customClass: {
      container: 'flight-insurance-modal',
      popup: 'rounded-lg',
      input: 'border-gray-300 focus:border-blue-500 focus:ring-blue-500'
    },
    showCancelButton: true,
    confirmButtonText: 'Proceed',
    confirmButtonColor: '#4C2AA0',
    cancelButtonColor: '#6B7280',
    focusConfirm: false,
    preConfirm: () => {
      const formData = {
        flightNumber: (document.getElementById('flightNumber') as HTMLInputElement).value,
      };

      const errorDiv = document.getElementById('validationError');
      if (!validateForm(formData)) {
        if (errorDiv) {
          errorDiv.textContent = 'Please fill in fields correctly. Flight number should be in format AA1234';
          errorDiv.classList.remove('hidden');
        }
        return false;
      }
      if (errorDiv) {
        errorDiv.classList.add('hidden');
      }
      return formData;
    }
  });

  if (result.isConfirmed && result.value) {
    onSubmit(result.value);
    const successResult = await Swal.fire({
      title: 'Success!',
      text: 'Your flight insurance has been purchased successfully',
      icon: 'success',
      confirmButtonColor: '#4C2AA0',
      confirmButtonText: 'View Insurance'
    });
    if (successResult.isConfirmed && onSuccess) {
      onSuccess();
    }
  }
};
