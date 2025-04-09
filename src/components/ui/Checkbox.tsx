// src/components/ui/Checkbox.tsx
import React, { forwardRef } from "react";

interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  id: string;
  error?: string | null;
  labelClassName?: string; // Allows overriding label style
}

const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  (
    { label, id, error, className = "", labelClassName = "", ...props },
    ref
  ) => {
    // Using @tailwindcss/forms plugin's default styling primarily
    const checkboxStyles = `h-5 w-5 rounded text-brand-dark border-brand-dark focus:ring-brand-dark focus:ring-offset-0`;

    return (
      <div className="flex items-center gap-2.5">
        <input
          type="checkbox"
          id={id}
          ref={ref}
          name={id ?? props.name} // Ensure name attribute exists
          className={`${checkboxStyles} ${className}`}
          aria-invalid={!!error}
          aria-describedby={error ? `${id}-error` : undefined}
          {...props}
        />
        <label
          htmlFor={id}
          // Apply base styles then override with labelClassName if provided
          className={`text-base font-normal text-brand-dark ${labelClassName}`}
        >
          {label}
        </label>
        {/* Error display for checkbox might be handled differently, e.g., globally for form */}
        {/* {error && <p id={`${id}-error`} className="text-sm text-red-600">{error}</p>} */}
      </div>
    );
  }
);

Checkbox.displayName = "Checkbox";

export default Checkbox;
