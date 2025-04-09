// src/components/plp/filters/TagFilter.tsx
import React from "react";
import { Link } from "react-router-dom"; // Assuming tags might link somewhere

interface TagOption {
  label: string;
  href?: string;
}

interface TagFilterProps {
  title: string;
  options: TagOption[];
}

const TagFilter: React.FC<TagFilterProps> = ({ title, options = [] }) => {
  return (
    <div className="py-6">
      <h3 className="text-lg font-bold font-sans tracking-wide text-black mb-4">
        {title}
      </h3>
      <div className="flex flex-wrap gap-x-4 gap-y-2">
        {options.map((tag, index) =>
          tag.href ? (
            <Link
              key={index}
              to={tag.href}
              className="text-sm text-brand-gray-dark hover:text-brand-primary hover:underline"
            >
              {tag.label}
            </Link>
          ) : (
            <span key={index} className="text-sm text-brand-gray-dark">
              {tag.label}
            </span>
          )
        )}
      </div>
    </div>
  );
};

export default TagFilter;
