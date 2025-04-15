// src/components/common/Footer.tsx
import React from "react";
import { Link } from "react-router-dom";
// Ensure you have installed react-icons: npm install react-icons
import {
  FaFacebookF,
  FaYoutube,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";
import { FiPhone, FiMail, FiMapPin } from "react-icons/fi"; // Using consistent icons
import Button from "../ui/Button"; // Import Button component
// *** ENSURE THIS IMPORT PATH IS CORRECT ***
import logoSrc from "../../assets/images/armour-logo.svg"; // Import your logo

const Footer: React.FC = () => {
  return (
    // Footer container: White background, padding, top border for separation
    <footer className="bg-white pt-16 pb-8 md:pt-20 border-t border-gray-100">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* --- Request More Information Section --- */}
        <div className="text-center max-w-3xl mx-auto mb-16 md:mb-20">
          <p className="text-sm uppercase tracking-[2.8px] text-brand-dark opacity-60 mb-4 font-sans">
            UPSKILL FOR A BETTER {/* Text from CSS */}
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-brand-dark-alt mb-5 font-sans leading-tight">
            Request More Information
          </h2>
          <p className="text-lg text-brand-dark opacity-80 mb-10 font-sans leading-relaxed">
            {/* Replace with actual description */}
            Providing comprehensive solutions for your business needs. Contact
            us to learn more about how we can help you achieve your goals.
          </p>
          <Button
            to="/contact" // Link to contact page
            variant="primary"
            size="lg"
            // Apply specific styles: rounded-full, custom padding/height, shadow
            className="!rounded-full h-auto px-10 py-3 md:py-4 shadow-lg text-xl font-sans"
          >
            Contact Us
          </Button>
        </div>
        {/* --- END Request Info Section --- */}

        {/* --- Footer Link Columns --- */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Column 1: Product */}
          <div>
            <h4 className="text-2xl font-semibold text-brand-dark-alt mb-4 font-sans">
              Product
            </h4>
            <ul className="space-y-3">
              {/* Add actual links if available */}
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
          {/* Column 2: Information */}
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
              {/* Support seemed duplicated in original CSS, verify if needed */}
              {/* <li><Link to="/support-alt" className="text-xl text-brand-blue-dark opacity-70 hover:opacity-100 transition-colors">Support</Link></li> */}
            </ul>
          </div>
          {/* Column 3: Company */}
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
                <a
                  href="tel:01453625987"
                  className="font-semibold break-all hover:text-brand-primary"
                >
                  01453625987
                </a>
              </li>
              <li className="flex items-center gap-2.5 text-xl text-brand-blue-dark opacity-70">
                <FiMail className="flex-shrink-0 w-5 h-5" />{" "}
                <a
                  href="mailto:contact@armour.com"
                  className="font-semibold break-all hover:text-brand-primary"
                >
                  contact@armour.com
                </a>
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

        {/* Bottom Row: Logo, Center Links, Social Icons */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          {/* Logo */}
          <Link to="/">
            <img className="h-[42px] w-auto" src={logoSrc} alt="Armour Logo" />
          </Link>
          {/* Center Links */}
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
            <a
              href="#"
              aria-label="LinkedIn"
              className="w-11 h-11 flex items-center justify-center border-2 border-brand-dark-alt border-opacity-10 rounded-full hover:bg-gray-200 hover:border-brand-primary transition-colors text-brand-dark-alt hover:text-brand-primary"
            >
              {" "}
              <FaLinkedinIn size={20} />{" "}
            </a>
            <a
              href="#"
              aria-label="Facebook"
              className="w-11 h-11 flex items-center justify-center border-2 border-brand-dark-alt border-opacity-10 rounded-full hover:bg-gray-200 hover:border-brand-primary transition-colors text-brand-dark-alt hover:text-brand-primary"
            >
              {" "}
              <FaFacebookF size={20} />{" "}
            </a>
            <a
              href="#"
              aria-label="Instagram"
              className="w-11 h-11 flex items-center justify-center border-2 border-brand-dark-alt border-opacity-10 rounded-full hover:bg-gray-200 hover:border-brand-primary transition-colors text-brand-dark-alt hover:text-brand-primary"
            >
              {" "}
              <FaInstagram size={20} />{" "}
            </a>
            <a
              href="#"
              aria-label="YouTube"
              className="w-11 h-11 flex items-center justify-center border-2 border-brand-dark-alt border-opacity-10 rounded-full hover:bg-gray-200 hover:border-brand-primary transition-colors text-brand-dark-alt hover:text-brand-primary"
            >
              {" "}
              <FaYoutube size={20} />{" "}
            </a>
          </div>
        </div>

        {/* Copyright */}
        <div className="text-center mt-8 text-base font-semibold text-brand-dark-alt opacity-80">
          © {new Date().getFullYear()} Armour, LLC {/* Or your client's name */}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
