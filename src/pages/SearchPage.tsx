// src/pages/SearchPage.tsx
import React from "react";
import { useSearchParams } from "react-router-dom";

const SearchPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q");
  // TODO: Fetch search results based on query

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-semibold mb-6">
        Search Results for "{query}"
      </h1>
      <p>Search results placeholder...</p>
      {/* Display results grid or message */}
    </div>
  );
};

export default SearchPage;
