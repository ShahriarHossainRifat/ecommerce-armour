// src/components/pdp/tabs/ShippingTabContent.tsx
import React from "react";

interface ShippingTabContentProps {
  policyText: string;
}

const ShippingTabContent: React.FC<ShippingTabContentProps> = ({
  policyText,
}) => {
  // Split text into paragraphs for better readability
  const paragraphs = policyText?.split("\n").filter((p) => p.trim() !== "");

  return (
    <div className="prose max-w-none text-base font-nunito text-black leading-relaxed space-y-4">
      {" "}
      {/* Use Nunito font */}
      {paragraphs && paragraphs.length > 0 ? (
        paragraphs.map((para, index) => <p key={index}>{para}</p>)
      ) : (
        <p>
          {policyText || "Shipping and return information is not available."}
        </p>
      )}
    </div>
  );
};

export default ShippingTabContent;
