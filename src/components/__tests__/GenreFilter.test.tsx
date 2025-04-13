import { render, screen, fireEvent } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import GenreFilter from "../GenreFilter";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

// Mock the movieApi
jest.mock("../../services/movieApi", () => ({
  __esModule: true,
  default: {
    getGenres: jest.fn().mockResolvedValue({
      genres: [
        { id: 28, name: "Action" },
        { id: 35, name: "Comedy" },
      ],
    }),
  },
}));

const renderWithClient = (ui: React.ReactElement) => {
  return render(
    <QueryClientProvider client={queryClient}>{ui}</QueryClientProvider>
  );
};

describe("GenreFilter", () => {
  const mockOnSelectGenre = jest.fn();

  beforeEach(() => {
    queryClient.clear();
    mockOnSelectGenre.mockClear();
  });

  it("renders genre buttons after loading", async () => {
    renderWithClient(
      <GenreFilter selectedGenre={null} onSelectGenre={mockOnSelectGenre} />
    );

    // Wait for genres to load
    const actionButton = await screen.findByText("Action");
    const comedyButton = await screen.findByText("Comedy");

    expect(actionButton).toBeInTheDocument();
    expect(comedyButton).toBeInTheDocument();
  });

  it("highlights selected genre", async () => {
    renderWithClient(
      <GenreFilter selectedGenre={28} onSelectGenre={mockOnSelectGenre} />
    );

    const actionButton = await screen.findByText("Action");
    expect(actionButton.className).toContain("bg-blue-500");
  });

  it("calls onSelectGenre when clicking a genre", async () => {
    renderWithClient(
      <GenreFilter selectedGenre={null} onSelectGenre={mockOnSelectGenre} />
    );

    const actionButton = await screen.findByText("Action");
    fireEvent.click(actionButton);

    expect(mockOnSelectGenre).toHaveBeenCalledWith(28);
  });

  it("deselects genre when clicking selected genre", async () => {
    renderWithClient(
      <GenreFilter selectedGenre={28} onSelectGenre={mockOnSelectGenre} />
    );

    const actionButton = await screen.findByText("Action");
    fireEvent.click(actionButton);

    expect(mockOnSelectGenre).toHaveBeenCalledWith(null);
  });
});
