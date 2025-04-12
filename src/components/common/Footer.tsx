// src/components/common/Footer.tsx
import React from "react";
import { Link } from "react-router-dom";
import logoSrc from '../../assets/images/armour-logo.svg';
// Ensure you have react-icons installed: npm install react-icons
import {
  FaFacebookF,
  FaYoutube,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";
import { FiPhone, FiMail, FiMapPin } from "react-icons/fi"; // Using different icons for contact
import Button from "../ui/Button"; // Import Button component

// Placeholder Logo URL - Replace with your actual logo import or path

const Footer: React.FC = () => {
  return (
    // Use the background color defined for the footer/newsletter sections
    <footer className="bg-brand-footer-bg pt-16 pb-8 md:pt-24">
      {" "}
      {/* Increased top padding */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* --- Request More Information Section --- */}
        <div className="text-center max-w-3xl mx-auto mb-16 md:mb-20">
          {/* Subtitle */}
          <p className="text-sm uppercase tracking-[2.8px] text-brand-dark opacity-60 mb-4 font-sans">
            UPSKILL FOR A BETTER {/* Text from CSS */}
          </p>
          {/* Title */}
          <h2 className="text-4xl md:text-5xl font-bold text-brand-dark-alt mb-5 font-sans leading-tight">
            Request More Information
          </h2>
          {/* Description */}
          <p className="text-lg text-brand-dark opacity-80 mb-10 font-sans leading-relaxed">
            {/* Text from CSS (assuming it was 'Bostel Technologies, ...') - Replace with actual text */}
            Providing comprehensive solutions for your business needs. Contact
            us to learn more about how we can help you achieve your goals.
          </p>
          {/* Contact Button */}
          <Button
            to="/contact" // Link to your contact page
            variant="primary"
            size="lg"
            // Apply specific styles from CSS: rounded-full, custom padding, shadow
            className="!rounded-full h-auto px-10 py-3 md:py-4 shadow-lg text-xl font-sans" // Use ! to override default Button rounding if needed
          >
            Contact Us
          </Button>
        </div>
        {/* --- END Request More Information Section --- */}

        {/* --- Footer Link Columns --- */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Column 1: Product Links */}
          <div>
            <h4 className="text-2xl font-semibold text-brand-dark-alt mb-4 font-sans">
              Product
            </h4>
            <ul className="space-y-3">
              <li>
                <Link
                  to="#"
                  className="text-xl text-brand-blue-dark opacity-70 hover:opacity-100 transition-colors"
                >
                  Employee database
                </Link>
              </li>
              <li>
                <Link
                  to="#"
                  className="text-xl text-brand-blue-dark opacity-70 hover:opacity-100 transition-colors"
                >
                  Payroll
                </Link>
              </li>
              <li>
                <Link
                  to="#"
                  className="text-xl text-brand-blue-dark opacity-70 hover:opacity-100 transition-colors"
                >
                  Absences
                </Link>
              </li>
              <li>
                <Link
                  to="#"
                  className="text-xl text-brand-blue-dark opacity-70 hover:opacity-100 transition-colors"
                >
                  Time tracking
                </Link>
              </li>
              <li>
                <Link
                  to="#"
                  className="text-xl text-brand-blue-dark opacity-70 hover:opacity-100 transition-colors"
                >
                  Shift planner
                </Link>
              </li>
              <li>
                <Link
                  to="#"
                  className="text-xl text-brand-blue-dark opacity-70 hover:opacity-100 transition-colors"
                >
                  Recruiting
                </Link>
              </li>
            </ul>
          </div>
          {/* Column 2: Information Links */}
          <div>
            <h4 className="text-2xl font-semibold text-brand-dark-alt mb-4 font-sans">
              Information
            </h4>
            <ul className="space-y-3">
              <li>
                <Link
                  to="/faq"
                  className="text-xl text-brand-blue-dark opacity-70 hover:opacity-100 transition-colors"
                >
                  FAQ
                </Link>
              </li>
              <li>
                <Link
                  to="/blog"
                  className="text-xl text-brand-blue-dark opacity-70 hover:opacity-100 transition-colors"
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  to="/support"
                  className="text-xl text-brand-blue-dark opacity-70 hover:opacity-100 transition-colors"
                >
                  Support
                </Link>
              </li>
            </ul>
          </div>
          {/* Column 3: Company Links */}
          <div>
            <h4 className="text-2xl font-semibold text-brand-dark-alt mb-4 font-sans">
              Company
            </h4>
            <ul className="space-y-3">
              <li>
                <Link
                  to="/about"
                  className="text-xl text-brand-blue-dark opacity-70 hover:opacity-100 transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  to="#"
                  className="text-xl text-brand-blue-dark opacity-70 hover:opacity-100 transition-colors"
                >
                  Careers
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="text-xl text-brand-blue-dark opacity-70 hover:opacity-100 transition-colors"
                >
                  Contact Us
                </Link>
              </li>
              <li>
                <Link
                  to="#"
                  className="text-xl text-brand-blue-dark opacity-70 hover:opacity-100 transition-colors"
                >
                  Lift Media
                </Link>
              </li>
            </ul>
          </div>
          {/* Column 4: Contact Info */}
          <div>
            <h4 className="text-2xl font-semibold text-brand-dark-alt mb-4 font-sans">
              Contact
            </h4>
            <ul className="space-y-4">
              <li className="flex items-center gap-2.5 text-xl text-brand-blue-dark opacity-70">
                <FiPhone className="flex-shrink-0 w-5 h-5" />{" "}
                <span className="font-semibold break-all">01453625987</span>
              </li>
              <li className="flex items-center gap-2.5 text-xl text-brand-blue-dark opacity-70">
                <FiMail className="flex-shrink-0 w-5 h-5" />{" "}
                <span className="font-semibold break-all">
                  contact@armour.com
                </span>
              </li>
              <li className="flex items-start gap-2.5 text-xl text-brand-gray-dark opacity-70">
                <FiMapPin className="flex-shrink-0 w-5 h-5 mt-1" />
                <span className="font-semibold">
                  House: 25, Road No: 2, Block A,
                  <br />
                  Mirpur-1, Dhaka 1216
                </span>
              </li>
            </ul>
          </div>
        </div>
        {/* --- End Footer Link Columns --- */}

        {/* Divider */}
        <hr className="border-brand-dark-alt opacity-30 mb-8" />

        {/* Bottom Row: Logo, Links, Social */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <Link to="/">
            <img className="h-[42px] w-auto" src={logoSrc} alt="Armour Logo" />
          </Link>
          {/* Centered links */}
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-base font-semibold text-brand-dark-alt opacity-80">
            <Link to="#" className="hover:text-brand-primary transition-colors">
              Team
            </Link>
            <Link to="#" className="hover:text-brand-primary transition-colors">
              Case Studies
            </Link>
            <Link to="#" className="hover:text-brand-primary transition-colors">
              Publications
            </Link>
          </div>
          {/* Social Icons */}
          <div className="flex gap-3">
            {/* Styling based on CSS social icons */}
            <a
              href="#"
              aria-label="LinkedIn"
              className="w-11 h-11 flex items-center justify-center border-2 border-brand-dark-alt border-opacity-10 rounded-full hover:bg-gray-200 transition-colors text-brand-dark-alt"
            >
              {" "}
              <FaLinkedinIn size={20} />{" "}
            </a>
            <a
              href="#"
              aria-label="Facebook"
              className="w-11 h-11 flex items-center justify-center border-2 border-brand-dark-alt border-opacity-10 rounded-full hover:bg-gray-200 transition-colors text-brand-dark-alt"
            >
              {" "}
              <FaFacebookF size={20} />{" "}
            </a>
            <a
              href="#"
              aria-label="Instagram"
              className="w-11 h-11 flex items-center justify-center border-2 border-brand-dark-alt border-opacity-10 rounded-full hover:bg-gray-200 transition-colors text-brand-dark-alt"
            >
              {" "}
              <FaInstagram size={20} />{" "}
            </a>
            <a
              href="#"
              aria-label="YouTube"
              className="w-11 h-11 flex items-center justify-center border-2 border-brand-dark-alt border-opacity-10 rounded-full hover:bg-gray-200 transition-colors text-brand-dark-alt"
            >
              {" "}
              <FaYoutube size={20} />{" "}
            </a>
          </div>
        </div>

        {/* Copyright */}
        <div className="text-center mt-8 text-base font-semibold text-brand-dark-alt opacity-80">
          © {new Date().getFullYear()} Armour, LLC
        </div>
      </div>
    </footer>
  );
};

export default Footer;
