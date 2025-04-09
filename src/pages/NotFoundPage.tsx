// src/pages/NotFoundPage.tsx
import React from "react";
import Button from "../components/ui/Button"; // Assuming Button component exists

const NotFoundPage: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-200px)] text-center px-4">
      <h1 className="text-6xl font-bold text-brand-dark mb-4">404</h1>
      <h2 className="text-2xl font-semibold text-brand-dark-alt mb-6">
        Page Not Found
      </h2>
      <p className="text-brand-gray-dark mb-8 max-w-md">
        Oops! The page you are looking for does not exist. It might have been
        moved or deleted.
      </p>
      <Button to="/" variant="primary" size="lg">
        Go Back Home
      </Button>
    </div>
  );
};

export default NotFoundPage;
