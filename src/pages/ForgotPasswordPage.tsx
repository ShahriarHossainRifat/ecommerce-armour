// src/pages/ForgotPasswordPage.tsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logoSrc from "../assets/images/armour-logo.svg";
import InputField from "../components/ui/InputField";
import Button from "../components/ui/Button";
import { FiArrowLeft } from "react-icons/fi"; // Using react-icons

import forgotPasswordBackgroundSrc from "../assets/images/forgotpass-background.webp";

// Placeholder URLs

const ForgotPasswordPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // TODO: Implement actual forgot password logic (API call to send OTP)
    console.log("Forgot Password attempt:", { email });
    alert("OTP Send functionality placeholder.");
    // On successful OTP send: navigate('/enter-otp', { state: { email } }); // Pass email to next step
    navigate("/enter-otp", { state: { email } }); // Example navigation
  };

  return (
    <div className="flex min-h-screen bg-brand-bg">
      {/* Left Panel */}
      <div
        className="hidden lg:block lg:w-[845px] relative bg-cover bg-center"
        style={{ backgroundImage: `url(${forgotPasswordBackgroundSrc})` }}
      >
        <Link to="/" className="absolute top-[68px] left-[60px]">
          <img src={logoSrc} alt="Armour Logo" className="h-[42px] w-auto" />
        </Link>
      </div>

      {/* Right Panel */}
      <div className="flex-1 flex flex-col items-center justify-center p-6 lg:p-10 overflow-y-auto">
        <div className="w-full max-w-[445px]">
          {/* Optional: Logo for smaller screens */}
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
            to="/login"
            className="inline-flex items-center gap-1.5 text-base font-normal text-brand-dark hover:text-brand-primary mb-8"
          >
            <FiArrowLeft className="w-6 h-6" />
            Back
          </Link>

          {/* Text Content */}
          <div className="mb-8 text-left">
            {" "}
            {/* gap: 30px -> mb-8 */}
            <h1 className="text-3xl font-bold font-sans text-brand-dark mb-1">
              Forgot Password?
            </h1>
            <p className="text-base font-normal font-sans text-brand-gray-dark">
              {" "}
              {/* text color adjusted */}
              No worries, we'll send you reset instructions. Please enter the
              email address associated with your account.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {" "}
            {/* Adjusted gap */}
            <InputField
              id="email"
              label="Email Address"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            {/* Submit Button */}
            <Button
              type="submit"
              variant="dark"
              size="lg"
              fullWidth
              className="h-[56px]"
            >
              Send OTP
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
