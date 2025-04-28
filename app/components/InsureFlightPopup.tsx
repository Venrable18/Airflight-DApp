import Swal from 'sweetalert2';
import { WithContext as ReactTags } from 'react-tag-input';
import ReactDOM from 'react-dom/client';

interface FlightFormData {
  airplaneName: string;
  aircraftCode: string;
  flightNumber: string;
  flightDate: string;
  insurancePrice: number;
  passengerWalletAddresses: string[];
}

const KeyCodes = {
  comma: 188,
  enter: 13,
};

const delimiters = [KeyCodes.comma, KeyCodes.enter];

export const showInsureFlightPopup = (onSubmit: (formData: FlightFormData) => void) => {
  const tagsContainer = document.createElement('div');
  tagsContainer.id = 'wallet-tags-container';
  let currentTags: { id: string; text: string }[] = [];

  Swal.fire({
    title: 'Insure Flight',
    html: `
      <form id="flightForm" class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Airplane Name</label>
          <input id="airplaneName" class="swal2-input w-full" placeholder="Airplane Name" required>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Aircraft Code</label>
          <input id="aircraftCode" class="swal2-input w-full" placeholder="Aircraft Code" required>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Flight Number</label>
          <input id="flightNumber" class="swal2-input w-full" placeholder="Flight Number" required>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Flight Date</label>
          <input id="flightDate" type="date" class="swal2-input w-full" required min="${new Date().toISOString().split('T')[0]}">
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Insurance Price (ETH)</label>
          <input id="insurancePrice" type="number" class="swal2-input w-full" placeholder="Insurance Price" required min="0.01" step="0.01">
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Passengers' Wallet Addresses</label>
          <div id="wallet-tags-container"></div>
        </div>
      </form>
    `,
    customClass: {
      container: 'flight-insurance-modal',
      popup: 'rounded-lg',
      input: 'border-gray-300 focus:border-blue-500 focus:ring-blue-500'
    },
    showCancelButton: true,
    confirmButtonText: 'Submit',
    confirmButtonColor: '#4C2AA0',
    cancelButtonColor: '#6B7280',
    focusConfirm: false,
    didOpen: () => {
      const container = document.getElementById('wallet-tags-container');
      if (container) {
        const root = ReactDOM.createRoot(container);
        root.render(
          <ReactTags
            tags={currentTags}
            delimiters={delimiters}
            handleDelete={(i) => {
              currentTags = currentTags.filter((_, index) => index !== i);
              root.render(
                <ReactTags
                  tags={currentTags}
                  delimiters={delimiters}
                  handleDelete={(i) => {
                    currentTags = currentTags.filter((_, index) => index !== i);
                  }}
                  handleAddition={(tag) => {
                    currentTags = [...currentTags, tag];
                  }}
                  placeholder="Add wallet addresses"
                  classNames={{
                    tags: 'react-tags-wrapper',
                    tagInput: 'swal2-input w-full',
                    tag: 'react-tags__tag',
                    remove: 'react-tags__remove',
                  }}
                />
              );
            }}
            handleAddition={(tag) => {
              currentTags = [...currentTags, tag];
            }}
            placeholder="Add wallet addresses"
            classNames={{
              tags: 'react-tags-wrapper',
              tagInput: 'swal2-input w-full',
              tag: 'react-tags__tag',
              remove: 'react-tags__remove',
            }}
          />
        );
      }
    },
    preConfirm: () => {
      const formData = {
        airplaneName: (document.getElementById('airplaneName') as HTMLInputElement).value,
        aircraftCode: (document.getElementById('aircraftCode') as HTMLInputElement).value,
        flightNumber: (document.getElementById('flightNumber') as HTMLInputElement).value,
        flightDate: (document.getElementById('flightDate') as HTMLInputElement).value,
        insurancePrice: parseFloat((document.getElementById('insurancePrice') as HTMLInputElement).value),
        passengerWalletAddresses: currentTags.map(tag => tag.text)
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
        Swal.showValidationMessage('Please fill in all fields correctly.');
        return false;
      }

      // Validate wallet addresses format (basic check)
      const isValidWalletAddress = (address: string) => /^0x[a-fA-F0-9]{40}$/.test(address);
      if (!formData.passengerWalletAddresses.every(isValidWalletAddress)) {
        Swal.showValidationMessage('Please enter valid wallet addresses (0x format)');
        return false;
      }

      return formData;
    }
  }).then((result) => {
    if (result.isConfirmed && result.value) {
      onSubmit(result.value);
      // Show success message
      Swal.fire({
        title: 'Success!',
        text: 'Flight insurance has been processed successfully',
        icon: 'success',
        confirmButtonColor: '#4C2AA0'
      });
    }
  });
};