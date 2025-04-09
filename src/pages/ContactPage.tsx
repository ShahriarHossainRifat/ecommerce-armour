// src/pages/ContactPage.tsx
import React, { useState } from "react";
import InputField from "../components/ui/InputField";
import Button from "../components/ui/Button";
import { FiPhone, FiMail, FiMapPin, FiLoader } from "react-icons/fi"; // Import icons

const ContactPage: React.FC = () => {
  // State for form fields
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);
    // Basic validation
    if (
      !formData.name ||
      !formData.email ||
      !formData.subject ||
      !formData.message
    ) {
      setError("Please fill out all fields.");
      return;
    }
    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      setError("Please enter a valid email address.");
      return;
    }

    setLoading(true);
    console.log("Submitting contact form:", formData);
    // TODO: Implement actual form submission logic (e.g., send to API endpoint)
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate API call
      setSuccess(true);
      setFormData({ name: "", email: "", subject: "", message: "" }); // Clear form on success
    } catch (err) {
      setError("Failed to send message. Please try again later.");
      console.error("Contact form error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
      <h1 className="text-3xl md:text-4xl font-semibold mb-8 text-center md:text-left">
        Contact Us
      </h1>

      <div className="flex flex-col md:flex-row gap-12 lg:gap-16">
        {/* Contact Information (Left) */}
        <div className="w-full md:w-1/3 space-y-6">
          <h2 className="text-2xl font-medium text-brand-dark-alt mb-4">
            Get In Touch
          </h2>
          {/* Reusing contact info similar to footer */}
          <div className="flex items-start gap-4 text-base text-brand-gray-dark">
            <FiMapPin className="w-6 h-6 text-brand-primary mt-1 flex-shrink-0" />
            <div>
              <h3 className="font-semibold text-black mb-1">Address</h3>
              <p>
                House: 25, Road No: 2, Block A,
                <br />
                Mirpur-1, Dhaka 1216
              </p>
            </div>
          </div>
          <div className="flex items-start gap-4 text-base text-brand-gray-dark">
            <FiPhone className="w-6 h-6 text-brand-primary mt-1 flex-shrink-0" />
            <div>
              <h3 className="font-semibold text-black mb-1">Phone</h3>
              <a href="tel:01453625987" className="hover:text-brand-primary">
                01453625987
              </a>
            </div>
          </div>
          <div className="flex items-start gap-4 text-base text-brand-gray-dark">
            <FiMail className="w-6 h-6 text-brand-primary mt-1 flex-shrink-0" />
            <div>
              <h3 className="font-semibold text-black mb-1">Email</h3>
              <a
                href="mailto:contact@armour.com"
                className="hover:text-brand-primary"
              >
                contact@armour.com
              </a>
            </div>
          </div>

          {/* Optional Map Placeholder */}
          <div className="pt-4">
            <h3 className="font-semibold text-black mb-2">Our Location</h3>
            <div className="aspect-video bg-gray-200 rounded-lg flex items-center justify-center text-gray-500">
              {/* Replace with actual map embed (e.g., Google Maps iframe) */}
              Map Placeholder
            </div>
          </div>
        </div>

        {/* Contact Form (Right) */}
        <div className="w-full md:w-2/3">
          <h2 className="text-2xl font-medium text-brand-dark-alt mb-4">
            Send Us a Message
          </h2>
          {success ? (
            <div className="p-4 bg-green-100 text-green-700 rounded-md">
              Message sent successfully! We'll get back to you soon.
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              {error && (
                <p className="text-red-600 text-sm bg-red-100 p-3 rounded-md">
                  {error}
                </p>
              )}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <InputField
                  id="name"
                  name="name"
                  label="Your Name"
                  type="text"
                  placeholder="John Doe"
                  required
                  value={formData.name}
                  onChange={handleInputChange}
                  disabled={loading}
                />
                <InputField
                  id="email"
                  name="email"
                  label="Your Email"
                  type="email"
                  placeholder="you@example.com"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  disabled={loading}
                />
              </div>
              <InputField
                id="subject"
                name="subject"
                label="Subject"
                type="text"
                placeholder="Regarding..."
                required
                value={formData.subject}
                onChange={handleInputChange}
                disabled={loading}
              />
              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-normal text-brand-dark mb-1"
                >
                  Message <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  placeholder="Write your message here..."
                  required
                  value={formData.message}
                  onChange={handleInputChange}
                  disabled={loading}
                  className="block w-full border border-brand-dark rounded-lg px-4 py-3 text-base text-brand-gray-dark placeholder-brand-gray-dark focus:ring-1 focus:ring-brand-primary focus:border-brand-primary focus:outline-none disabled:opacity-50"
                ></textarea>
              </div>
              <Button type="submit" variant="dark" size="lg" disabled={loading}>
                {loading ? (
                  <FiLoader className="animate-spin h-5 w-5 mr-2" />
                ) : null}
                {loading ? "Sending..." : "Send Message"}
              </Button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
