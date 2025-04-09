// src/pages/SignUpPage.tsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import InputField from "../components/ui/InputField";
import Button from "../components/ui/Button";
import Checkbox from "../components/ui/Checkbox";
import { useAuth } from "../contexts/AuthContext";
import { FiHome, FiLoader } from "react-icons/fi"; // Changed icon import

// Placeholders...
const backgroundImageUrl =
  "https://via.placeholder.com/845x1024/cccccc/969696?text=Signup+Background";
const logoUrl = "https://via.placeholder.com/208x42/cccccc/969696?text=Armour";

const SignUpPage: React.FC = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { signup, loading } = useAuth();
  const navigate = useNavigate();
  // Removed useLocation

  // Removed handleGoBack function

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    // Basic Validation
    if (!fullName || !email || !password || !confirmPassword) {
      setError("Please fill in all fields.");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords don't match!");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }
    if (!agreedToTerms) {
      setError("Please agree to the terms and conditions.");
      return;
    }

    try {
      await signup({ name: fullName, email, password });
      alert("Signup successful! Please log in.");
      navigate("/login");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Sign up failed.");
    }
  };

  return (
    <div className="flex min-h-screen bg-brand-bg">
      {/* Left Panel */}
      <div
        className="hidden lg:block lg:w-[845px] relative bg-cover bg-center"
        style={{ backgroundImage: `url(${backgroundImageUrl})` }}
      >
        <Link to="/" className="absolute top-[68px] left-[60px]">
          {" "}
          <img
            src={logoUrl}
            alt="Armour Logo"
            className="h-[42px] w-auto"
          />{" "}
        </Link>
        {/* UPDATED: Home Link Style (Desktop) */}
        <Link
          to="/"
          className="absolute top-5 left-5 text-white bg-black bg-opacity-40 hover:bg-opacity-60 rounded-lg p-2 transition-colors duration-200 ease-in-out inline-flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black/50" // Changed rounded-full to rounded-lg, adjusted opacity
          aria-label="Go to Homepage"
        >
          <FiHome size={24} />
        </Link>
      </div>

      {/* Right Panel */}
      <div className="flex-1 flex flex-col items-center justify-center p-6 lg:py-10 lg:px-10 overflow-y-auto relative">
        {/* UPDATED: Home Link Style (Mobile) */}
        <Link
          to="/"
          className="absolute top-5 left-5 lg:hidden bg-brand-dark text-white hover:bg-opacity-80 rounded-lg p-2 transition-colors duration-200 ease-in-out inline-flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-brand-dark focus:ring-offset-2" // Changed to dark bg, white icon, rounded-lg
          aria-label="Go to Homepage"
        >
          <FiHome size={24} />
        </Link>

        <div className="w-full max-w-[445px] mt-16 lg:mt-0">
          {" "}
          {/* Added margin top for mobile */}
          <div className="lg:hidden mb-8 text-center">
            {" "}
            <Link to="/">
              {" "}
              <img
                src={logoUrl}
                alt="Armour Logo"
                className="h-[42px] w-auto inline-block"
              />{" "}
            </Link>{" "}
          </div>
          {/* Welcome Text */}
          <div className="mb-8 text-left">
            {" "}
            <h1 className="text-3xl font-bold font-sans text-brand-dark mb-1">
              Create Account
            </h1>{" "}
            <p className="text-base font-normal font-sans text-brand-gray">
              Let's get you started!
            </p>{" "}
          </div>
          {/* Sign Up Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <p className="text-red-600 text-sm bg-red-100 p-3 rounded-md">
                {error}
              </p>
            )}
            <div className="space-y-4">
              <InputField
                id="fullName"
                label="Full Name"
                type="text"
                placeholder="Enter your full name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
                disabled={loading}
              />
              <InputField
                id="email"
                label="Email Address"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={loading}
              />
              <InputField
                id="password"
                label="Password"
                type="password"
                placeholder="Create a password (min. 6 chars)"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={loading}
              />
              <InputField
                id="confirmPassword"
                label="Confirm Password"
                type="password"
                placeholder="Confirm your password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                disabled={loading}
              />
            </div>
            <Checkbox
              id="terms"
              label="I agree to the terms and conditions"
              checked={agreedToTerms}
              onChange={(e) => setAgreedToTerms(e.target.checked)}
              disabled={loading}
              labelClassName="text-sm"
              required
            />
            <Button
              type="submit"
              variant="dark"
              size="lg"
              fullWidth
              className="h-[56px]"
              disabled={loading}
            >
              {loading ? (
                <FiLoader className="animate-spin h-5 w-5 mx-auto" />
              ) : (
                "Sign Up"
              )}
            </Button>
          </form>
          <p className="mt-8 text-center text-lg font-medium text-brand-light-gray">
            {" "}
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-bold text-brand-dark hover:underline"
            >
              Log In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
