import { XMarkIcon } from "@heroicons/react/24/outline";
import { useEffect } from "react";

interface MovieDetails {
  id: number;
  title: string;
  overview: string;
  poster_path: string | null;
  release_date: string;
  vote_average: number;
  runtime: number;
  genres: { id: number; name: string }[];
  tagline: string;
  status: string;
  original_language: string;
}

interface MovieModalProps {
  movie: MovieDetails | null;
  isOpen: boolean;
  onClose: () => void;
}

const MovieModal = ({ movie, isOpen, onClose }: MovieModalProps) => {
  // Handle body overflow
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen || !movie) return null;

  return (
    <div
      className="fixed inset-0 z-50 md:overflow-y-auto"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div className="flex min-h-screen items-center justify-center md:p-4">
        {/* Background overlay */}
        <div
          className="fixed inset-0 bg-gray-900 bg-opacity-75 transition-opacity"
          aria-hidden="true"
          onClick={onClose}
        ></div>

        {/* Modal panel */}
        <div className="relative bg-slate-800 w-full h-screen md:h-auto md:max-h-[90vh] md:rounded-lg overflow-hidden shadow-xl md:max-w-4xl">
          <button
            onClick={onClose}
            className="absolute right-4 top-4 text-slate-400 hover:text-slate-300 focus:outline-none z-10"
          >
            <XMarkIcon className="h-6 w-6" />
          </button>

          <div className="flex flex-col md:flex-row h-full md:h-auto">
            {/* Movie poster */}
            <div className="w-full md:w-1/3 relative h-[40vh] md:h-auto">
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

            {/* Movie details */}
            <div className="w-full md:w-2/3 p-6 md:p-8 overflow-y-auto flex-1">
              <h3 className="text-2xl md:text-3xl font-bold text-slate-100 mb-2">
                {movie.title}
              </h3>
              {movie.tagline && (
                <p className="text-slate-400 italic mb-4 md:mb-6">
                  {movie.tagline}
                </p>
              )}
              <div className="space-y-4 md:space-y-6">
                <div>
                  <h4 className="text-sm font-medium text-slate-400 mb-2">
                    Overview
                  </h4>
                  <p className="text-slate-200 leading-relaxed">
                    {movie.overview}
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-4 md:gap-6">
                  <div>
                    <h4 className="text-sm font-medium text-slate-400 mb-1">
                      Release Date
                    </h4>
                    <p className="text-slate-200">
                      {new Date(movie.release_date).toLocaleDateString()}
                    </p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-slate-400 mb-1">
                      Runtime
                    </h4>
                    <p className="text-slate-200">{movie.runtime} minutes</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-slate-400 mb-1">
                      Rating
                    </h4>
                    <p className="text-slate-200 flex items-center">
                      <span className="text-yellow-400 mr-1">★</span>
                      {movie.vote_average.toFixed(1)}
                    </p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-slate-400 mb-1">
                      Status
                    </h4>
                    <p className="text-slate-200">{movie.status}</p>
                  </div>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-slate-400 mb-2">
                    Genres
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {movie.genres.map((genre) => (
                      <span
                        key={genre.id}
                        className="px-3 py-1 bg-slate-700 rounded-full text-sm text-slate-300"
                      >
                        {genre.name}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieModal;
