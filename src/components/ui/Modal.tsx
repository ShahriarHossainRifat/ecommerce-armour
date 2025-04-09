// src/components/ui/Modal.tsx
import React, { ReactNode } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose?: () => void; // Optional close function for clicking overlay
  children: ReactNode;
  className?: string; // Allow custom styling for the modal content panel
  overlayClassName?: string; // Allow custom styling for the overlay
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  children,
  className = "",
  overlayClassName = "",
}) => {
  if (!isOpen) return null;

  // Base styles from OTP success CSS (centered, white bg, shadow, rounded)
  const defaultPanelStyles =
    "relative bg-white rounded-lg shadow-xl max-w-md w-full p-6"; // Adjusted padding
  const defaultOverlayStyles =
    "fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50";

  return (
    <div
      className={`${defaultOverlayStyles} ${overlayClassName}`}
      onClick={onClose} // Close when clicking the overlay
      role="dialog"
      aria-modal="true"
    >
      <div
        className={`${defaultPanelStyles} ${className}`}
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the modal
      >
        {children}
      </div>
    </div>
  );
};

export default Modal;
