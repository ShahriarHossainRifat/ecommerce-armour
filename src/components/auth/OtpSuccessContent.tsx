// src/components/auth/OtpSuccessContent.tsx
import React from "react";
import Button from "../ui/Button"; // Import Button component
import { useNavigate } from "react-router-dom";
import { FiCheck } from "react-icons/fi"; // Using react-icons checkmark

const OtpSuccessContent: React.FC = () => {
  const navigate = useNavigate();

  const handleBackToLogin = () => {
    navigate("/login"); // Navigate to login page
    // You might also want to call an onClose function passed via props if needed
  };

  return (
    <div className="flex flex-col items-center text-center p-4 md:p-8">
      {" "}
      {/* Centered content */}
      {/* Success Icon - Recreated using divs and icons */}
      <div className="relative mb-6">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-28 h-28 bg-brand-dark bg-opacity-5 rounded-full animate-ping-slow"></div>{" "}
          {/* Outer ring - added ping animation */}
        </div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-24 h-24 bg-brand-dark bg-opacity-10 rounded-full animate-ping-medium"></div>{" "}
          {/* Middle ring - added ping animation */}
        </div>
        <div className="relative w-16 h-16 bg-brand-dark rounded-full flex items-center justify-center text-white">
          <FiCheck size={32} /> {/* Checkmark Icon */}
        </div>
      </div>
      {/* Text Content */}
      <div className="mb-8 space-y-2">
        <h2 className="text-2xl font-bold text-brand-dark">
          Password Changed Successfully
        </h2>
        <p className="text-base text-brand-dark">
          Your password has been updated successfully.
        </p>
      </div>
      {/* Back to Login Button */}
      <Button
        variant="dark"
        onClick={handleBackToLogin}
        fullWidth
        size="lg"
        className="h-auto py-4" // Adjust height/padding if needed
      >
        Back to Login
      </Button>
    </div>
  );
};

// Optional: Add simple ping animations to Tailwind config if desired
/* Add to tailwind.config.js theme.extend.animation:
  animation: {
     'ping-slow': 'ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite',
     'ping-medium': 'ping 1.2s cubic-bezier(0, 0, 0.2, 1) infinite',
   },
*/

export default OtpSuccessContent;
