// src/components/checkout/AddressCard.tsx
import React from "react";
import { FiEdit2, FiTrash2 } from "react-icons/fi";

interface Address {
  id: string | number;
  name: string;
  addressLine1: string; // Example fields, adjust as needed
  city: string;
  state: string;
  postalCode: string;
  country: string;
  // Add phone, etc. if needed
}

interface AddressCardProps {
  address: Address;
  isSelected: boolean;
  onSelect: (id: string | number) => void;
  onEdit: (id: string | number) => void;
  onDelete: (id: string | number) => void;
}

const AddressCard: React.FC<AddressCardProps> = ({
  address,
  isSelected,
  onSelect,
  onEdit,
  onDelete,
}) => {
  return (
    <div
      className={`p-4 border rounded-lg flex items-start gap-4 transition-colors ${
        isSelected ? "border-black bg-gray-50" : "border-gray-300 bg-white"
      }`}
    >
      {/* Selection Radio */}
      <input
        type="radio"
        name="shippingAddress"
        id={`address-${address.id}`}
        checked={isSelected}
        onChange={() => onSelect(address.id)}
        className="mt-1 w-5 h-5 text-black border-black focus:ring-black"
      />

      {/* Address Details */}
      <label
        htmlFor={`address-${address.id}`}
        className="flex-grow cursor-pointer"
      >
        <h4 className="font-bold text-lg text-black mb-1">{address.name}</h4>
        <p className="text-base text-black leading-snug">
          {address.addressLine1}, {address.city}, {address.state}{" "}
          {address.postalCode}, {address.country}
        </p>
      </label>

      {/* Action Buttons */}
      <div className="flex gap-3 flex-shrink-0">
        <button
          onClick={() => onEdit(address.id)}
          className="p-2 rounded text-gray-600 hover:text-blue-600 hover:bg-blue-100"
          aria-label={`Edit address for ${address.name}`}
        >
          <FiEdit2 size={18} />
        </button>
        <button
          onClick={() => onDelete(address.id)}
          className="p-2 rounded text-gray-600 hover:text-red-600 hover:bg-red-100"
          aria-label={`Delete address for ${address.name}`}
        >
          <FiTrash2 size={18} />
        </button>
      </div>
    </div>
  );
};

export default AddressCard;
