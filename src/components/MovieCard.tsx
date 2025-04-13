import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Movie } from "../services/movieApi";
import movieApi from "../services/movieApi";
import MovieModal from "./MovieModal";

interface MovieCardProps {
  movie: Movie;
}

const MovieCard = ({ movie }: MovieCardProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data: movieDetails } = useQuery({
    queryKey: ["movieDetails", movie.id],
    queryFn: () => movieApi.getMovieDetails(movie.id),
    enabled: isModalOpen,
  });

  return (
    <>
      <div
        className="bg-slate-800 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer"
        onClick={() => setIsModalOpen(true)}
      >
        <div className="aspect-[2/3] relative">
          {movie.poster_path ? (
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-slate-700 flex items-center justify-center">
              <span className="text-slate-400">No Image</span>
            </div>
          )}
        </div>
        <div className="p-4">
          <h3 className="text-lg font-semibold text-slate-100 mb-2">
            {movie.title}
          </h3>
          <p className="text-sm text-slate-400 mb-2">
            {new Date(movie.release_date).getFullYear()}
          </p>
          <div className="flex items-center">
            <span className="text-yellow-400">★</span>
            <span className="ml-1 text-slate-300">
              {movie.vote_average.toFixed(1)}
            </span>
          </div>
        </div>
      </div>

      <MovieModal
        movie={movieDetails || null}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
};

export default MovieCard;
