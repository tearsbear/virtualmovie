import { render, screen, fireEvent } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import HeroSection from "../HeroSection";
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
      title: "Featured Movie 1",
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
      title: "Featured Movie 2",
      overview: "Overview 2",
      poster_path: "/poster2.jpg",
      backdrop_path: "/backdrop2.jpg",
      release_date: "2024-03-21",
      vote_average: 8.0,
      vote_count: 200,
      genre_ids: [35],
    },
    {
      id: 3,
      title: "Featured Movie 3",
      overview: "Overview 3",
      poster_path: "/poster3.jpg",
      backdrop_path: "/backdrop3.jpg",
      release_date: "2024-03-22",
      vote_average: 8.5,
      vote_count: 300,
      genre_ids: [12],
    },
  ],
  total_pages: 1,
  total_results: 3,
  page: 1,
};

const renderWithClient = (ui: React.ReactElement) => {
  return render(
    <QueryClientProvider client={queryClient}>{ui}</QueryClientProvider>
  );
};

describe("HeroSection", () => {
  beforeEach(() => {
    queryClient.clear();
    jest.clearAllMocks();
    mockedMovieApi.getPopularMovies.mockResolvedValue(mockMovies);
  });

  it("renders the first featured movie by default", async () => {
    renderWithClient(<HeroSection />);

    expect(await screen.findByText("Featured Movie 1")).toBeInTheDocument();
    expect(screen.getByText("2024")).toBeInTheDocument();
    expect(screen.getByText("Overview 1")).toBeInTheDocument();
  });

  it("displays all three recommended movies", async () => {
    renderWithClient(<HeroSection />);

    expect(await screen.findByText("Featured Movie 1")).toBeInTheDocument();
    expect(screen.getByText("Featured Movie 2")).toBeInTheDocument();
    expect(screen.getByText("Featured Movie 3")).toBeInTheDocument();
  });

  it("changes featured movie when clicking on a recommended movie", async () => {
    renderWithClient(<HeroSection />);

    // Wait for initial render
    await screen.findByText("Featured Movie 1");

    // Click the second movie
    const movie2 = screen.getByText("Featured Movie 2");
    fireEvent.click(movie2.closest("div")!);

    // Check if the main content updated
    expect(screen.getByText("Overview 2")).toBeInTheDocument();
  });

  it("shows virtualcinema text", async () => {
    renderWithClient(<HeroSection />);

    expect(await screen.findByText("virtualcinema")).toBeInTheDocument();
  });

  it("shows Recommended Movies section", async () => {
    renderWithClient(<HeroSection />);

    expect(await screen.findByText("Recommended Movies")).toBeInTheDocument();
  });
});
