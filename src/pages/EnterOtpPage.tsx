// src/pages/EnterOtpPage.tsx
import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import logoSrc from "../assets/images/armour-logo.svg";
import Button from "../components/ui/Button";
import { FiArrowLeft } from "react-icons/fi";
import Modal from "../components/ui/Modal";
import OtpSuccessContent from "../components/auth/OtpSuccessContent";

import otpBackgroundSrc from "../assets/images/otp-background.webp";

// Placeholder URLs

const OTP_LENGTH = 5; // Based on the 5 input boxes in CSS

const EnterOtpPage: React.FC = () => {
  const [otp, setOtp] = useState<string[]>(new Array(OTP_LENGTH).fill(""));
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email || "your email address";

  // Define the ref type correctly
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    // Ensure the refs array has the correct length and is initialized with null
    // This runs once after the initial render, before the user can interact much
    inputRefs.current = Array(OTP_LENGTH).fill(null);
    // Attempt to focus the first input after mount
    inputRefs.current[0]?.focus();
  }, []); // Empty dependency array ensures this runs only once on mount

  const handleChange = (element: HTMLInputElement, index: number) => {
    // Allow only numeric input
    if (/^[0-9]$/.test(element.value) || element.value === "") {
      const newOtp = [...otp];
      newOtp[index] = element.value; // Allow empty string for backspace clearing
      setOtp(newOtp);

      // Focus next input if a digit was entered
      if (element.value && index < OTP_LENGTH - 1) {
        inputRefs.current[index + 1]?.focus();
      }
    } else if (element.value.length > 1) {
      // Handle paste (optional, more complex logic needed)
      // For simplicity, just take the first digit if pasted
      const firstDigit = element.value[0];
      if (/^[0-9]$/.test(firstDigit)) {
        const newOtp = [...otp];
        newOtp[index] = firstDigit;
        setOtp(newOtp);
        if (index < OTP_LENGTH - 1) {
          inputRefs.current[index + 1]?.focus();
        }
      }
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    // Move focus backward on backspace if current input is empty
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
    // Optional: Move forward on arrow right, backward on arrow left
    if (e.key === "ArrowRight" && index < OTP_LENGTH - 1) {
      inputRefs.current[index + 1]?.focus();
    }
    if (e.key === "ArrowLeft" && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const enteredOtp = otp.join("");
    if (enteredOtp.length !== OTP_LENGTH) {
      alert("Please enter the complete OTP.");
      return;
    }
    console.log("Verifying OTP:", enteredOtp);
    alert("OTP Verification placeholder.");
    setShowSuccessModal(true);
  };

  const closeModal = () => {
    setShowSuccessModal(false);
    navigate("/login"); // Navigate to login after closing modal
  };

  return (
    <>
      <div className="flex min-h-screen bg-brand-bg">
        {/* Left Panel */}
        <div
          className="hidden lg:block lg:w-[845px] relative bg-cover bg-center"
          style={{ backgroundImage: `url(${otpBackgroundSrc})` }}
        >
          <Link to="/" className="absolute top-[68px] left-[60px]">
            <img src={logoSrc} alt="Armour Logo" className="h-[42px] w-auto" />
          </Link>
        </div>

        {/* Right Panel */}
        <div className="flex-1 flex flex-col items-center justify-center p-6 lg:p-10 overflow-y-auto">
          <div className="w-full max-w-[445px]">
            {/* Logo for smaller screens */}
            <div className="lg:hidden mb-8 text-center">
              <Link to="/">
                <img
                  src={logoSrc}
                  alt="Armour Logo"
                  className="h-[42px] w-auto inline-block"
                />
              </Link>
            </div>

            {/* Back Link */}
            <Link
              to="/forgot-password"
              className="inline-flex items-center gap-1.5 text-base font-normal text-brand-dark hover:text-brand-primary mb-8"
            >
              <FiArrowLeft className="w-6 h-6" />
              Back
            </Link>

            {/* Text Content */}
            <div className="mb-8 text-left">
              <h1 className="text-3xl font-bold font-sans text-brand-dark mb-1">
                Enter OTP
              </h1>
              <p className="text-base font-normal font-sans text-brand-gray-dark">
                We've sent a One-Time Password (OTP) to {email}. Please enter it
                below.
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* OTP Input Boxes */}
              <div
                className="flex justify-start gap-5"
                role="group"
                aria-label="One-time password"
              >
                {otp.map((data, index) => (
                  <input
                    key={index}
                    type="text" // Use text to handle single character input better with events
                    inputMode="numeric" // Hint for mobile keyboards
                    name={`otp-${index}`}
                    maxLength={1}
                    className="w-[60px] h-[60px] text-center text-2xl font-bold font-sans text-brand-dark border border-brand-dark rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent"
                    value={data}
                    onChange={(e) => handleChange(e.target, index)}
                    onFocus={(e) => e.target.select()}
                    onKeyDown={(e) => handleKeyDown(e, index)}
                    // CORRECTED: Explicitly type 'el' in the ref callback
                    ref={(el: HTMLInputElement | null) => {
                      // Ensure inputRefs.current is treated as the correct type array
                      const currentRefs =
                        inputRefs.current as (HTMLInputElement | null)[];
                      if (currentRefs) {
                        currentRefs[index] = el;
                      }
                    }}
                    aria-label={`OTP digit ${index + 1}`}
                  />
                ))}
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                variant="dark"
                size="lg"
                fullWidth
                className="h-[56px]"
              >
                Verify OTP
              </Button>
              {/* TODO: Add Resend OTP link/button */}
            </form>
          </div>
        </div>
      </div>

      {/* Success Modal */}
      <Modal isOpen={showSuccessModal} onClose={closeModal}>
        <OtpSuccessContent />
      </Modal>
    </>
  );
};

export default EnterOtpPage;
