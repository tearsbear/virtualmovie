import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import movieApi, { Movie, MovieResponse } from "../services/movieApi";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import MovieCard from "./MovieCard";
import GenreFilter from "./GenreFilter";
import HeroSection from "./HeroSection";

const MovieSearch = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [selectedGenre, setSelectedGenre] = useState<number | null>(null);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setDebouncedQuery(searchQuery);
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [searchQuery]);

  // Popular movies with genre filter
  const { data: popularMovies, isLoading: isLoadingPopular } =
    useQuery<MovieResponse>({
      queryKey: ["popularMovies", selectedGenre],
      queryFn: () => movieApi.getPopularMovies(1, selectedGenre || undefined),
    });

  // Search results with genre filter
  const { data: searchResults, isLoading: isLoadingSearch } =
    useQuery<MovieResponse>({
      queryKey: ["searchMovies", debouncedQuery, selectedGenre],
      queryFn: () =>
        movieApi.searchMovies(debouncedQuery, 1, selectedGenre || undefined),
      enabled: debouncedQuery.length > 0,
    });

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const movies = debouncedQuery
    ? searchResults?.results
    : popularMovies?.results;
  const isLoading = debouncedQuery ? isLoadingSearch : isLoadingPopular;

  return (
    <div className="space-y-6">
      {!debouncedQuery && <HeroSection />}

      <div className="space-y-6">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <MagnifyingGlassIcon className="h-5 w-5 text-slate-400" />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearch}
            placeholder="Search movies..."
            className="block w-full pl-10 pr-3 py-2 border border-slate-700 rounded-lg bg-slate-800 text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <GenreFilter
          selectedGenre={selectedGenre}
          onSelectGenre={(genreId) => setSelectedGenre(genreId)}
        />
      </div>

      {isLoading ? (
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto"></div>
        </div>
      ) : movies && movies.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {movies.map((movie: Movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      ) : (
        <div className="text-center text-slate-400">
          <p>No movies found</p>
        </div>
      )}
    </div>
  );
};

export default MovieSearch;
