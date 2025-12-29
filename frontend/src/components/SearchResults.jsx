import React from "react";
import { useSearchParams } from "react-router-dom";
import { useSearch } from "../pages/context/SearchContext";
import Cards from "../common/Cards";

function SearchResults() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q");
  const { searchResults, isSearching } = useSearch();

  if (isSearching) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <span className="loading loading-spinner loading-lg text-pink-500"></span>
      </div>
    );
  }

  return (
    <div className="max-w-screen-2xl container mx-auto md:px-20 px-4 pt-24 pb-10">
      <h1 className="text-md font-bold mb-6">
        Search results for: <span className="text-pink-500">"{query}"</span>
      </h1>

      {searchResults.length === 0 ? (
        <div className="text-center py-10">
          <p className="text-xl">No books found matching your search.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {searchResults.map((item) => (
            <Cards key={item._id} item={item} />
          ))}
        </div>
      )}
    </div>
  );
}

export default SearchResults;
