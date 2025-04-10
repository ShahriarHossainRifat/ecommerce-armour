// src/pages/LoginPage.tsx
import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import InputField from "../components/ui/InputField";
import Button from "../components/ui/Button";
import Checkbox from "../components/ui/Checkbox";
import SocialButton from "../components/ui/SocialButton";
import { useAuth } from "../contexts/AuthContext";
import { FiHome, FiLoader } from "react-icons/fi";

// Placeholders...
const backgroundImageUrl =
  "https://via.placeholder.com/845x1024/cccccc/969696?text=Login+Background";
const logoUrl = "https://via.placeholder.com/208x42/cccccc/969696?text=Armour";
const googleIconUrl = "https://via.placeholder.com/30x30/cccccc/969696?text=G";
const facebookIconUrl =
  "https://via.placeholder.com/30x30/cccccc/969696?text=F";

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { login, loading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  // Removed handleGoBack function

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    if (!email || !password) {
      setError("Please enter both email and password.");
      return;
    }
    try {
      await login({ email, password });
      navigate(from, { replace: true });
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Login failed. Please try again."
      );
    }
  };

  const handleGoogleLogin = () => alert("Google Login placeholder");
  const handleFacebookLogin = () => alert("Facebook Login placeholder");

  return (
    <div className="flex min-h-screen bg-brand-bg">
      {/* Left Panel */}
      <div
        className="hidden lg:block lg:w-[845px] relative bg-cover bg-center"
        style={{ backgroundImage: `url(${backgroundImageUrl})` }}
      >
        <Link to="/" className="absolute top-[68px] left-[60px]">
          <img src={logoUrl} alt="Armour Logo" className="h-[42px] w-auto" />
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
      <div className="flex-1 flex flex-col items-center justify-center p-6 lg:p-10 overflow-y-auto relative">
        {/* UPDATED: Home Link Style (Mobile) */}
        <Link
          to="/"
          className="absolute top-5 left-5 lg:hidden bg-brand-dark text-white hover:bg-opacity-80 rounded-lg p-2 transition-colors duration-200 ease-in-out inline-flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-brand-dark focus:ring-offset-2" // Changed to dark bg, white icon, rounded-lg
          aria-label="Go to Homepage"
        >
          <FiHome size={24} />
        </Link>

        <div className="w-full max-w-[445px] mt-16 lg:mt-0">
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
              Welcome back!
            </h1>{" "}
            <p className="text-base font-normal font-sans text-brand-gray">
              Please enter your details to log in.
            </p>{" "}
          </div>
          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <p className="text-red-600 text-sm bg-red-100 p-3 rounded-md">
                {error}
              </p>
            )}
            <div className="space-y-4">
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
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={loading}
              />
            </div>
            <div className="flex items-center justify-between">
              <Checkbox
                id="rememberMe"
                label="Remember me"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                disabled={loading}
              />
              <Link
                to="/forgot-password"
                className="text-sm font-normal text-brand-dark hover:underline"
              >
                {" "}
                Forgot Password?{" "}
              </Link>
            </div>
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
                "Login"
              )}
            </Button>
          </form>
          {/* Divider & Social Login */}
          <div className="my-6 flex items-center gap-4">
            <hr className="flex-grow border-t border-brand-divider" />
            <span className="text-base font-bold text-brand-text-alt">
              Sign in with Others
            </span>
            <hr className="flex-grow border-t border-brand-divider" />
          </div>
          <div className="space-y-4">
            <SocialButton
              provider="Google"
              iconSrc={googleIconUrl}
              text="Login with Google"
              onClick={handleGoogleLogin}
            />
            <SocialButton
              provider="Facebook"
              iconSrc={facebookIconUrl}
              text="Login with Facebook"
              onClick={handleFacebookLogin}
            />
          </div>
          {/* Sign Up Link */}
          <p className="mt-8 text-center text-lg font-medium text-brand-light-gray">
            {" "}
            Don’t have an account?{" "}
            <Link
              to="/signup"
              className="font-bold text-brand-dark hover:underline"
            >
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
