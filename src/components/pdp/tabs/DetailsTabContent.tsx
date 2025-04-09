// src/components/pdp/tabs/DetailsTabContent.tsx
import React from "react";

interface DetailsTabContentProps {
  description: string;
}

const DetailsTabContent: React.FC<DetailsTabContentProps> = ({
  description,
}) => {
  // Split description into paragraphs for better readability if needed
  const paragraphs = description?.split("\n").filter((p) => p.trim() !== "");

  return (
    <div className="prose max-w-none text-base text-brand-gray-dark leading-relaxed">
      {" "}
      {/* Use Tailwind typography plugin if installed */}
      {paragraphs && paragraphs.length > 0 ? (
        paragraphs.map((para, index) => <p key={index}>{para}</p>)
      ) : (
        <p>{description || "No details available."}</p>
      )}
    </div>
  );
};

export default DetailsTabContent;
