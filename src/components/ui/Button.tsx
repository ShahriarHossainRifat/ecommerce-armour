// src/components/ui/Button.tsx
import React from "react";
import { Link } from "react-router-dom";

type ButtonProps = {
  children: React.ReactNode;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  type?: "button" | "submit" | "reset";
  variant?: "primary" | "secondary" | "dark" | "outline" | "link" | "ghost";
  size?: "sm" | "md" | "lg" | "icon";
  className?: string;
  to?: string;
  disabled?: boolean;
  fullWidth?: boolean;
  ariaLabel?: string;
};

const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  type = "button",
  variant = "primary",
  size = "md",
  className = "",
  to,
  disabled = false,
  fullWidth = false,
  ariaLabel,
}) => {
  // UPDATED: Added base transitions and optional hover/active transforms
  const baseStyles = `inline-flex items-center justify-center font-semibold rounded-lg transition-all duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-[1.01] active:scale-[0.98]`; // Added subtle transform

  const variantStyles = {
    primary:
      "bg-brand-primary text-white hover:bg-opacity-90 focus:ring-brand-primary",
    secondary:
      "bg-brand-primary-light text-brand-primary hover:bg-opacity-80 focus:ring-brand-primary",
    dark: "bg-brand-dark text-white hover:bg-opacity-90 focus:ring-brand-dark",
    outline:
      "bg-transparent border border-current hover:bg-gray-100 focus:ring-current", // Adjusted hover
    link: "bg-transparent text-brand-dark hover:underline p-0 focus:ring-brand-primary hover:scale-100 active:scale-100", // No scale for link
    ghost:
      "bg-transparent hover:bg-gray-100 focus:ring-current p-2 hover:scale-100 active:scale-100", // No scale for ghost
  };

  const sizeStyles = {
    sm: "px-3 py-1.5 text-sm h-[36px]",
    md: "px-5 py-3 text-base h-[50px]",
    lg: "px-6 py-4 text-lg h-[56px]",
    icon: "p-2", // Keep specific padding for icon buttons
  };

  const combinedClassName = `
    ${baseStyles}
    ${variantStyles[variant]}
    ${sizeStyles[size]}
    ${fullWidth ? "w-full" : ""}
    ${className}
  `;

  if (to && !disabled) {
    return (
      <Link to={to} className={combinedClassName} aria-label={ariaLabel}>
        {children}
      </Link>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      className={combinedClassName}
      disabled={disabled}
      aria-label={ariaLabel}
    >
      {children}
    </button>
  );
};

export default Button;
