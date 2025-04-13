import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import movieApi from "../services/movieApi";

const HeroSection = () => {
  const { data: popularMovies } = useQuery({
    queryKey: ["popularMovies"],
    queryFn: () => movieApi.getPopularMovies(1),
  });

  const [selectedMovie, setSelectedMovie] = useState<number>(0);

  const featuredMovies = popularMovies?.results.slice(0, 3) || [];
  const currentMovie = featuredMovies[selectedMovie];

  if (!currentMovie) return null;

  return (
    <div className="relative mb-8">
      {/* Hero Background */}
      <div className="relative h-[500px] w-full overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/50 to-transparent z-10" />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900 to-transparent z-10" />
        <img
          src={`https://image.tmdb.org/t/p/original${currentMovie.backdrop_path}`}
          alt={currentMovie.title}
          className="w-full h-full object-cover object-center transition-opacity duration-500"
        />
      </div>

      {/* Hero Content */}
      <div className="absolute inset-0 z-20 container mx-auto px-4 flex flex-col justify-end pb-80">
        <div className="max-w-3xl">
          <h1 className="text-5xl font-bold text-white mb-3">
            {currentMovie.title}
          </h1>
          <p className="text-base text-slate-300 mb-3">
            {new Date(currentMovie.release_date).getFullYear()} | Rating:{" "}
            {currentMovie.vote_average.toFixed(1)}
          </p>
          <p className="text-slate-300 text-sm mb-6 line-clamp-2 max-w-2xl">
            {currentMovie.overview}
          </p>
        </div>
      </div>

      {/* Recommended Movies */}
      <div className="absolute bottom-0 z-20 w-full bg-gradient-to-t from-slate-900 pt-10 pb-6">
        <div className="container mx-auto px-4">
          <h2 className="text-lg font-medium text-white mb-3">
            Recommended Movies
          </h2>
          <div className="grid grid-cols-3 gap-3">
            {featuredMovies.map((movie, index) => (
              <div
                key={movie.id}
                className={`relative cursor-pointer transition-all duration-300 transform hover:scale-105 ${
                  selectedMovie === index
                    ? "ring-2 ring-blue-500 shadow-lg shadow-blue-500/20 rounded-lg"
                    : ""
                }`}
                onClick={() => setSelectedMovie(index)}
              >
                <div className="relative aspect-video rounded-lg overflow-hidden">
                  <img
                    src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`}
                    alt={movie.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-30 flex items-end p-3">
                    <h3 className="text-white font-medium text-sm">
                      {movie.title}
                    </h3>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
