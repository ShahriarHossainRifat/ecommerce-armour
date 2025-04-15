// src/components/landing/NewsletterSection.tsx
import React, { useState } from "react";
import InputField from "../ui/InputField";
import Button from "../ui/Button";
import { FiLoader, FiAlertTriangle } from "react-icons/fi";

// --- Import Decorative Background Images ---
// Ensure these paths and filenames are correct
import newsletterBgLeftSrc from "../../assets/images/decor/newsletter-bg-left.webp";
import newsletterBgRightSrc from "../../assets/images/decor/newsletter-bg-right.webp";
// --- End Image Imports ---

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
    // Keep the light gray background and overflow hidden for this section
    <div className="bg-brand-footer-bg py-16 md:py-24 relative overflow-hidden">
      {/* --- Decorative Background Images - UPDATED --- */}
      <img
        src={newsletterBgLeftSrc}
        alt=""
        aria-hidden="true"
        // Removed opacity-50, using object-cover, adjusted max-width values
        className="absolute left-0 bottom-0 h-full w-auto max-w-[180px] sm:max-w-[240px] md:max-w-[280px] lg:max-w-[310px] object-cover opacity-100 hidden sm:block -z-0 pointer-events-none"
        loading="lazy"
      />
      <img
        src={newsletterBgRightSrc}
        alt=""
        aria-hidden="true"
        // Removed opacity-50, using object-cover, adjusted max-width values
        className="absolute right-0 bottom-0 h-full w-auto max-w-[180px] sm:max-w-[240px] md:max-w-[280px] lg:max-w-[310px] object-cover opacity-100 hidden sm:block -z-0 pointer-events-none"
        loading="lazy"
      />
      {/* --- End Decorative Images --- */}

      {/* Content container (relative, z-10 to be above background images) */}
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
              // Success Message
              <div className="flex items-center justify-center gap-2 text-lg text-green-700 bg-green-100 p-4 rounded-lg animate-fade-in">
                {" "}
                /* ... */{" "}
              </div>
            ) : (
              // Form
              <form
                onSubmit={handleSubscribe}
                className="flex flex-col gap-y-4 items-center max-w-lg mx-auto"
              >
                {/* Input Field Block */}
                <div className="w-full">
                  <label htmlFor="newsletter-email" className="sr-only">
                    {" "}
                    Enter your email address{" "}
                  </label>
                  <InputField
                    id="newsletter-email"
                    label="Enter your email address"
                    labelClassName="sr-only"
                    type="email"
                    placeholder="Enter your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    disabled={loading}
                    containerClassName="w-full"
                    className={`h-[56px] bg-white ... ${
                      error ? "border-red-500" : "border-transparent ..."
                    }`}
                    aria-label="Enter your email address"
                    error={null}
                  />
                  {error && (
                    <p className="text-red-600 ...">
                      {" "}
                      <FiAlertTriangle /> {error}{" "}
                    </p>
                  )}
                </div>
                {/* Submit Button Block */}
                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  className="h-[56px] shadow-lg w-auto px-10"
                  disabled={loading}
                >
                  {loading ? <FiLoader className="animate-spin ..." /> : null}
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

export default NewsletterSection;
