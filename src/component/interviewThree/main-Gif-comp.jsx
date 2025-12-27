import React, { useState } from "react";
import SearchInput from "./searchInput";
import Button from "./button";
import ErrorMessage from "./error-message";
import Loader from "./loader";
import EmptyState from "./empty-state";
import GiftCard from "./gift-card";

const API_KEY = "U5oTb4iIB71RhG9a9kRkQzDMKWrcDOhv";

const MainGifComp = () => {
  const [query, setQuery] = useState("");
  const [gifs, setGifs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [hasSearched, setSearched] = useState(false);

  const searchGifs = async () => {
    if (!query.trim()) {
      setError("Please enter a search term");
      return;
    }

    setLoading(true);
    setError("");
    setSearched(true);

    try {
      const res = await fetch(
        `https://api.giphy.com/v1/gifs/search?api_key=${API_KEY}&q=${query}&limit=10`
      );
      if (!res.ok) {
        throw new error("Failed to fetch GIFS");
      }

      const data = await res.json();
      setGifs(data.data);
    } catch (err) {
      setError("Failed to fetch GIFS please try agian");
      setGifs([]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") searchGifs();
  };

  return (
    <>
      <div className="min-h-screen  from-gray-900 via-gray-800 to-gray-900">
        <div className="container mx-auto px-4 py-8 max-w-7xl">
          {/* Header */}
          <header className="text-center mb-12">
            <h1 className="text-5xl font-bold text-white mb-3">GIF Search</h1>
            <p className="text-gray-300 text-lg">
              Search and discover amazing GIFs powered by Giphy
            </p>
          </header>

          {/* Search Section */}
          <div className="mb-12">
            <div className="flex flex-col sm:flex-row gap-3 max-w-2xl mx-auto">
              <SearchInput
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Search for GIFs..."
              />
              <Button onClick={searchGifs} disabled={loading}>
                <span>Search</span>
              </Button>
            </div>

            {error && (
              <div className="mt-4 max-w-2xl mx-auto">
                <ErrorMessage message={error} />
              </div>
            )}
          </div>

          {/* Results Section */}
          <div className="max-w-6xl mx-auto">
            {loading && <Loader />}

            {!loading && hasSearched && gifs.length === 0 && !error && (
              <EmptyState message="No GIFs found. Try a different search term!" />
            )}

            {!loading && gifs.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {gifs.map((gif) => (
                  <GiftCard key={gif.id} gif={gif} />
                ))}
              </div>
            )}

            {!loading && !hasSearched && (
              <EmptyState message="Start searching for GIFs above!" />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default MainGifComp;
