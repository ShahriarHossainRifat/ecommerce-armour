// src/pages/ConfirmationPage.tsx
import React from 'react';
import { Link, useLocation } from 'react-router-dom'; // Import useLocation
import Button from '../components/ui/Button';
import { FiCheckCircle } from 'react-icons/fi';

const formatPrice = (amount: number) => `$${amount.toFixed(2)}`;

const ConfirmationPage: React.FC = () => {
  // Get order details passed via route state
  const location = useLocation();
  const orderId = location.state?.orderId || 'Not Found'; // Get orderId from state
  const total = location.state?.total; // Get total from state (optional display)

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4 py-12">
      {/* Centered Confirmation Box */}
      <div className="bg-white rounded-lg shadow-xl w-full max-w-lg p-8 md:p-12 text-center">

        {/* Icon */}
        <div className="relative inline-block mb-8">
           <div className="absolute inset-0 flex items-center justify-center z-0"><div className="w-32 h-32 bg-green-100 rounded-full animate-ping opacity-50"></div></div>
          <div className="relative w-24 h-24 bg-green-500 rounded-full flex items-center justify-center text-white mx-auto"> <FiCheckCircle size={48} /> </div>
        </div>

        {/* Text Content */}
        <div className="mb-8 space-y-3">
          <h1 className="text-2xl md:text-3xl font-bold text-brand-dark"> Your order is confirmed! </h1>
          {/* Display Order ID */}
          <p className="text-base md:text-lg text-brand-gray-dark leading-relaxed"> Order Number: <span className='font-semibold text-black'>{orderId}</span> </p>
          {/* Optionally display total */}
          {typeof total === 'number' && (
              <p className="text-base md:text-lg text-brand-gray-dark leading-relaxed">Order Total: <span className='font-semibold text-black'>{formatPrice(total)}</span></p>
          )}
          <p className="text-base md:text-lg text-brand-gray-dark leading-relaxed"> Thanks for shopping! We'll send you an email when your order ships. </p>
        </div>

        {/* Action Buttons */}
        <div className="space-y-4">
          {/* UPDATED: Link to specific order details page */}
          <Button
            to={`/profile/orders/${orderId}`} // Link uses the received orderId
            variant="dark"
            fullWidth
            size="lg"
            className='h-[45px]'
          >
            View Order
          </Button>
          <Button
            to="/"
            variant="outline"
            fullWidth
            size="lg"
            className='h-[45px] border-black text-black'
          >
            Back to Home
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationPage;