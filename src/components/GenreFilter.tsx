import { useQuery } from "@tanstack/react-query";
import movieApi, { Genre } from "../services/movieApi";

interface GenreFilterProps {
  selectedGenre: number | null;
  onSelectGenre: (genreId: number | null) => void;
}

const GenreFilter = ({ selectedGenre, onSelectGenre }: GenreFilterProps) => {
  const { data: genreData, isLoading } = useQuery({
    queryKey: ["genres"],
    queryFn: () => movieApi.getGenres(),
  });

  if (isLoading) {
    return (
      <div className="h-12 flex items-center">
        <div className="animate-pulse bg-slate-800 rounded-full h-8 w-24"></div>
      </div>
    );
  }

  const genres = genreData?.genres || [];

  return (
    <div className="relative">
      <div
        className="flex overflow-x-auto pb-2 -mb-2 gap-2 no-scrollbar"
        style={{
          scrollbarWidth: "none",
          msOverflowStyle: "none",
          WebkitOverflowScrolling: "touch",
        }}
      >
        <button
          onClick={() => onSelectGenre(null)}
          className={`shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 ${
            selectedGenre === null
              ? "bg-white text-slate-900"
              : "bg-slate-800 text-slate-300 hover:bg-slate-700"
          }`}
        >
          All Popular
        </button>
        {genres.map((genre) => (
          <button
            key={genre.id}
            onClick={() => onSelectGenre(genre.id)}
            className={`shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 ${
              selectedGenre === genre.id
                ? "bg-white text-slate-900"
                : "bg-slate-800 text-slate-300 hover:bg-slate-700"
            }`}
          >
            {genre.name}
          </button>
        ))}
      </div>
      <div className="absolute right-0 top-0 h-full w-16 bg-gradient-to-l from-slate-900 to-transparent pointer-events-none" />
    </div>
  );
};

export default GenreFilter;
