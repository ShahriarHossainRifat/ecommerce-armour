// src/components/ui/InputField.tsx
import React, { forwardRef } from "react";

interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string; // Keep label prop for association, even if visually hidden
  id: string;
  error?: string | null;
  containerClassName?: string;
  labelClassName?: string; // Keep prop for flexibility (e.g., sr-only)
}

const InputField = forwardRef<HTMLInputElement, InputFieldProps>(
  (
    {
      label,
      id,
      error,
      className = "",
      containerClassName = "",
      labelClassName = "",
      ...props
    },
    ref
  ) => {
    const baseInputStyles = `block w-full border border-brand-dark rounded-lg px-4 py-3 h-[50px]
                           text-base text-brand-gray-dark placeholder-brand-gray-dark
                           focus:ring-1 focus:ring-brand-primary focus:border-brand-primary focus:outline-none`;

    const errorInputStyles = `border-red-500 focus:border-red-500 focus:ring-red-500`;
    const hasVisibleLabel =
      label && label.trim() !== "" && !labelClassName?.includes("sr-only");

    return (
      <div className={`w-full ${containerClassName}`}>
        {/* Label Tag for accessibility (associated by htmlFor) */}
        <label
          htmlFor={id}
          className={`block text-sm font-normal text-brand-dark mb-1 ${labelClassName}`}
        >
          {/* Only render label text content if it's meant to be visible */}
          {hasVisibleLabel && label}
          {/* Show required indicator only if label is visible */}
          {hasVisibleLabel && props.required && (
            <span className="text-red-500 ml-1">*</span>
          )}
        </label>
        <input
          id={id}
          ref={ref}
          name={props.name ?? id}
          className={`${baseInputStyles} ${
            error ? errorInputStyles : ""
          } ${className}`}
          aria-invalid={!!error}
          aria-describedby={error ? `${id}-error` : undefined}
          // If label is visually hidden, add aria-label for screen readers
          aria-label={!hasVisibleLabel ? label : undefined}
          {...props}
        />
        {/* Error message display */}
        {error && (
          <p id={`${id}-error`} className="mt-1 text-sm text-red-600">
            {error}
          </p>
        )}
      </div>
    );
  }
);

InputField.displayName = "InputField";

export default InputField;
