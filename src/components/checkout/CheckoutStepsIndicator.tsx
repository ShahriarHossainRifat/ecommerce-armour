// src/components/checkout/CheckoutStepsIndicator.tsx
import React from "react";
import { FiMapPin, FiCreditCard, FiCheckCircle } from "react-icons/fi"; // Example icons

type Step = "Address" | "Payment" | "Review";

interface CheckoutStepsIndicatorProps {
  currentStep: Step;
}

const steps: Step[] = ["Address", "Payment", "Review"];

const StepIcon: React.FC<{
  step: Step;
  isCompleted: boolean;
  isActive: boolean;
}> = ({ step, isCompleted, isActive }) => {
  const Icon =
    step === "Address"
      ? FiMapPin
      : step === "Payment"
      ? FiCreditCard
      : FiCheckCircle; // Review step icon

  const baseClasses =
    "w-10 h-10 md:w-12 md:h-12 lg:w-[60px] lg:h-[60px] rounded-lg flex items-center justify-center transition-colors duration-300";
  const activeClasses = "bg-black text-white";
  const completedClasses = "bg-black text-white"; // Same as active for completed steps before current
  const pendingClasses = "bg-gray-300 text-gray-500";

  let classes = pendingClasses;
  if (isActive) {
    classes = activeClasses;
  } else if (isCompleted) {
    classes = completedClasses;
  }

  return (
    <div className={baseClasses + " " + classes}>
      <Icon size={24} /> {/* Adjust icon size */}
    </div>
  );
};

const CheckoutStepsIndicator: React.FC<CheckoutStepsIndicatorProps> = ({
  currentStep,
}) => {
  const currentStepIndex = steps.indexOf(currentStep);

  return (
    <div className="w-full mb-10 md:mb-16">
      <div className="flex items-center justify-center max-w-xl mx-auto">
        {steps.map((step, index) => (
          <React.Fragment key={step}>
            {/* Step */}
            <div className="flex flex-col items-center text-center z-10">
              <StepIcon
                step={step}
                isActive={index === currentStepIndex}
                isCompleted={index < currentStepIndex}
              />
              <span
                className={`mt-2 text-sm md:text-base font-medium ${
                  index <= currentStepIndex ? "text-black" : "text-gray-500"
                }`}
              >
                {step}
              </span>
            </div>

            {/* Connector Line */}
            {index < steps.length - 1 && (
              <div
                className={`flex-1 h-0.5 mx-1 md:mx-2 ${
                  index < currentStepIndex ? "bg-black" : "bg-gray-300"
                }`}
              >
                {/* Dashed line effect can be tricky, using solid for now */}
              </div>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default CheckoutStepsIndicator;
