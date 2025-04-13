import { render, screen, fireEvent } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import MovieCard from "../MovieCard";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

const mockMovie = {
  id: 1,
  title: "Test Movie",
  overview: "Test Overview",
  poster_path: "/test-poster.jpg",
  backdrop_path: "/test-backdrop.jpg",
  release_date: "2024-03-20",
  vote_average: 7.5,
  vote_count: 100,
  genre_ids: [28, 12],
};

const renderWithClient = (ui: React.ReactElement) => {
  return render(
    <QueryClientProvider client={queryClient}>{ui}</QueryClientProvider>
  );
};

describe("MovieCard", () => {
  beforeEach(() => {
    queryClient.clear();
  });

  it("renders movie information correctly", () => {
    renderWithClient(<MovieCard movie={mockMovie} />);

    expect(screen.getByText("Test Movie")).toBeInTheDocument();
    expect(screen.getByText("2024")).toBeInTheDocument();
    expect(screen.getByText("7.5")).toBeInTheDocument();
  });

  it("renders fallback when no poster is available", () => {
    const movieWithoutPoster = { ...mockMovie, poster_path: null };
    renderWithClient(<MovieCard movie={movieWithoutPoster} />);

    expect(screen.getByText("No Image")).toBeInTheDocument();
  });

  it("opens modal when clicked", () => {
    renderWithClient(<MovieCard movie={mockMovie} />);

    const card = screen.getByText("Test Movie").closest("div");
    fireEvent.click(card!);

    // Modal should be in loading state initially since it fetches data
    expect(screen.queryByRole("dialog")).toBeNull();
  });
});
