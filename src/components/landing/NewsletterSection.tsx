// src/components/landing/NewsletterSection.tsx
import React, { useState } from "react";
import InputField from "../ui/InputField";
import Button from "../ui/Button";
import { FiLoader, FiCheckCircle, FiAlertTriangle } from "react-icons/fi";

// Placeholder Images
const newsletterBgLeft =
  "https://via.placeholder.com/327x689/cccccc/969696?text=Bg";
const newsletterBgRight =
  "https://via.placeholder.com/311x689/cccccc/969696?text=Bg";

const NewsletterSection: React.FC = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }
    setLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate API call
      setSuccess(true);
      setEmail("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Subscription failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-brand-footer-bg py-16 md:py-24 relative overflow-hidden">
      <img
        src={newsletterBgLeft}
        alt=""
        aria-hidden="true"
        className="absolute left-0 bottom-0 h-full w-auto max-w-[327px] object-contain opacity-50 hidden md:block -z-0"
      />
      <img
        src={newsletterBgRight}
        alt=""
        aria-hidden="true"
        className="absolute right-0 bottom-0 h-full w-auto max-w-[311px] object-contain opacity-50 hidden md:block -z-0"
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-xl mx-auto text-center">
          {/* Text Content */}
          <h2 className="text-3xl lg:text-4xl font-nunito font-medium text-brand-dark-alt mb-3">
            {" "}
            Subscribe To Our Newsletter{" "}
          </h2>
          <p className="text-lg md:text-xl text-brand-gray-dark mb-8">
            {" "}
            Stay updated with our latest news and offers.{" "}
          </p>

          {/* Subscription Form or Success/Error Message */}
          <div className="min-h-[120px]">
            {success ? (
              <div className="flex items-center justify-center gap-2 text-lg text-green-700 bg-green-100 p-4 rounded-lg animate-fade-in">
                <FiCheckCircle className="w-6 h-6 flex-shrink-0" /> Subscribed
                successfully! Thanks for joining.
              </div>
            ) : (
              // UPDATED FORM LAYOUT: items-center for horizontal centering of button
              <form
                onSubmit={handleSubscribe}
                className="flex flex-col gap-y-4 items-center max-w-lg mx-auto"
              >
                {/* Input Field Block */}
                <div className="w-full">
                  {/* Visually hidden label remains for accessibility */}
                  <label htmlFor="newsletter-email" className="sr-only">
                    {" "}
                    Enter your email address{" "}
                  </label>
                  <InputField
                    id="newsletter-email"
                    label="Enter your email address" // Provide label for aria-label fallback
                    labelClassName="sr-only" // Hide the label visually
                    type="email"
                    placeholder="Enter your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    disabled={loading}
                    containerClassName="w-full"
                    // Input field takes full width, text aligned left by default
                    className={`h-[56px] bg-white shadow-md border rounded-lg text-left ${
                      error
                        ? "border-red-500"
                        : "border-transparent focus:border-brand-primary"
                    }`}
                    // Use aria-label because label is hidden
                    aria-label="Enter your email address"
                    error={null} // Error displayed below
                  />
                  {error && (
                    <p className="text-red-600 text-sm mt-1 text-left flex items-center gap-1">
                      <FiAlertTriangle className="w-4 h-4" /> {error}
                    </p>
                  )}
                </div>
                {/* Submit Button Block - Centered, width determined by padding */}
                <Button
                  type="submit"
                  variant="primary"
                  size="lg" // Uses px-6 py-4 padding
                  // REMOVED w-full - width now based on content + padding
                  className="h-[56px] shadow-lg" // Keep height consistent
                  disabled={loading}
                >
                  {loading ? (
                    <FiLoader className="animate-spin h-5 w-5 mr-2" />
                  ) : null}
                  {loading ? "Subscribing..." : "Subscribe Now"}
                </Button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// Optional: Add fade-in animation to tailwind.config.js if desired
/* ... */

export default NewsletterSection;
