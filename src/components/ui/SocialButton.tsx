// src/components/ui/SocialButton.tsx
import React from "react";

type SocialButtonProps = {
  provider: string;
  iconSrc: string; // URL or path to icon image
  text: string;
  onClick?: () => void;
  className?: string;
};

const SocialButton: React.FC<SocialButtonProps> = ({
  provider,
  iconSrc,
  text,
  onClick,
  className = "",
}) => {
  // Styles based on Login page Google/Facebook buttons
  const baseStyles = `w-full border border-brand-border rounded-2xl py-3 px-6
                     flex items-center justify-center gap-2 bg-brand-bg
                     hover:bg-gray-50 transition-colors duration-200`;

  return (
    <button
      type="button"
      onClick={onClick}
      className={`${baseStyles} ${className}`}
      aria-label={text} // Accessibility
    >
      <img
        src={iconSrc}
        alt={`${provider} logo`}
        className="w-[30px] h-[30px]"
      />
      <span className="text-sm font-normal text-brand-text-alt">{text}</span>
    </button>
  );
};

export default SocialButton;
