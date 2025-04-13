import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import MovieSearch from "../MovieSearch";
import movieApi from "../../services/movieApi";

// Mock the movieApi
jest.mock("../../services/movieApi");
const mockedMovieApi = movieApi as jest.Mocked<typeof movieApi>;

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

const mockMovies = {
  results: [
    {
      id: 1,
      title: "Test Movie 1",
      overview: "Overview 1",
      poster_path: "/poster1.jpg",
      backdrop_path: "/backdrop1.jpg",
      release_date: "2024-03-20",
      vote_average: 7.5,
      vote_count: 100,
      genre_ids: [28],
    },
    {
      id: 2,
      title: "Test Movie 2",
      overview: "Overview 2",
      poster_path: "/poster2.jpg",
      backdrop_path: "/backdrop2.jpg",
      release_date: "2024-03-21",
      vote_average: 8.0,
      vote_count: 200,
      genre_ids: [35],
    },
  ],
  total_pages: 1,
  total_results: 2,
  page: 1,
};

const renderWithClient = (ui: React.ReactElement) => {
  return render(
    <QueryClientProvider client={queryClient}>{ui}</QueryClientProvider>
  );
};

describe("MovieSearch", () => {
  beforeEach(() => {
    queryClient.clear();
    jest.clearAllMocks();

    // Setup default mocks
    mockedMovieApi.getPopularMovies.mockResolvedValue(mockMovies);
    mockedMovieApi.searchMovies.mockResolvedValue(mockMovies);
  });

  it("renders search input", () => {
    renderWithClient(<MovieSearch />);
    expect(screen.getByPlaceholderText("Search movies...")).toBeInTheDocument();
  });

  it("displays popular movies by default", async () => {
    renderWithClient(<MovieSearch />);

    await waitFor(() => {
      expect(screen.getByText("Test Movie 1")).toBeInTheDocument();
      expect(screen.getByText("Test Movie 2")).toBeInTheDocument();
    });

    expect(mockedMovieApi.getPopularMovies).toHaveBeenCalled();
  });

  it("searches movies when typing in search input", async () => {
    renderWithClient(<MovieSearch />);

    const searchInput = screen.getByPlaceholderText("Search movies...");
    fireEvent.change(searchInput, { target: { value: "test" } });

    // Wait for debounce
    await waitFor(
      () => {
        expect(mockedMovieApi.searchMovies).toHaveBeenCalledWith(
          "test",
          1,
          undefined
        );
      },
      { timeout: 1000 }
    );
  });

  it("shows loading state while fetching", async () => {
    // Delay the API response
    mockedMovieApi.getPopularMovies.mockImplementation(
      () => new Promise((resolve) => setTimeout(() => resolve(mockMovies), 100))
    );

    renderWithClient(<MovieSearch />);

    expect(screen.getByRole("status")).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.queryByRole("status")).not.toBeInTheDocument();
    });
  });

  it("shows no results message when no movies found", async () => {
    mockedMovieApi.searchMovies.mockResolvedValue({
      results: [],
      total_pages: 0,
      total_results: 0,
      page: 1,
    });

    renderWithClient(<MovieSearch />);

    const searchInput = screen.getByPlaceholderText("Search movies...");
    fireEvent.change(searchInput, { target: { value: "nonexistent" } });

    await waitFor(() => {
      expect(screen.getByText("No movies found")).toBeInTheDocument();
    });
  });
});
