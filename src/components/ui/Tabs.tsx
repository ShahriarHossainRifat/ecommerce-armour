// src/components/ui/Tabs.tsx
import React, { useState, ReactNode } from "react";

interface Tab {
  label: string;
  content: ReactNode;
}

interface TabsProps {
  tabs: Tab[];
  initialTab?: number;
  className?: string;
  tabListClassName?: string;
  tabButtonClassName?: string;
  activeTabButtonClassName?: string;
  inactiveTabButtonClassName?: string;
  tabPanelClassName?: string;
}

const Tabs: React.FC<TabsProps> = ({
  tabs = [],
  initialTab = 0,
  className = "",
  tabListClassName = "flex border-b border-gray-200",
  tabButtonClassName = "py-3 px-5 text-lg font-semibold whitespace-nowrap", // Base button style
  activeTabButtonClassName = "border-b-2 border-brand-dark-alt text-brand-dark-alt", // Active style
  inactiveTabButtonClassName = "text-brand-gray hover:text-brand-dark-alt", // Inactive style
  tabPanelClassName = "mt-6",
}) => {
  const [activeTabIndex, setActiveTabIndex] = useState(initialTab);

  if (tabs.length === 0) return null;

  return (
    <div className={className}>
      {/* Tab Buttons */}
      <div
        className={tabListClassName}
        role="tablist"
        aria-label="Information Tabs"
      >
        {" "}
        {/* Added aria-label */}
        {tabs.map((tab, index) => (
          <button
            key={index}
            role="tab"
            aria-selected={activeTabIndex === index}
            aria-controls={`tabpanel-${index}`}
            id={`tab-${index}`}
            // UPDATED: Added focus-visible styles
            className={`${tabButtonClassName} ${
              activeTabIndex === index
                ? activeTabButtonClassName
                : inactiveTabButtonClassName
            } focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-1 focus-visible:ring-brand-primary rounded-t-md`}
            onClick={() => setActiveTabIndex(index)}
            // Move focus manually if needed, libraries handle this better
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content Panels */}
      {tabs.map((tab, index) => (
        <div
          key={index}
          role="tabpanel"
          id={`tabpanel-${index}`}
          aria-labelledby={`tab-${index}`}
          // Use hidden attribute for better accessibility than display: none
          hidden={activeTabIndex !== index}
          className={`${tabPanelClassName}`}
          tabIndex={0} // Make panel focusable when active
        >
          {tab.content}
        </div>
      ))}
    </div>
  );
};

export default Tabs;
