import axios from "axios";
import movieApi from "../movieApi";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("movieApi", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("searchMovies", () => {
    it("should fetch movies based on search query", async () => {
      const mockResponse = {
        data: {
          results: [{ id: 1, title: "Test Movie" }],
          total_pages: 1,
          total_results: 1,
          page: 1,
        },
      };

      mockedAxios.get.mockResolvedValueOnce(mockResponse);

      const result = await movieApi.searchMovies("test");
      expect(mockedAxios.get).toHaveBeenCalledWith(
        "https://api.themoviedb.org/3/search/movie",
        expect.any(Object)
      );
      expect(result).toEqual(mockResponse.data);
    });
  });

  describe("getPopularMovies", () => {
    it("should fetch popular movies", async () => {
      const mockResponse = {
        data: {
          results: [{ id: 1, title: "Popular Movie" }],
          total_pages: 1,
          total_results: 1,
          page: 1,
        },
      };

      mockedAxios.get.mockResolvedValueOnce(mockResponse);

      const result = await movieApi.getPopularMovies();
      expect(mockedAxios.get).toHaveBeenCalledWith(
        "https://api.themoviedb.org/3/movie/popular",
        expect.any(Object)
      );
      expect(result).toEqual(mockResponse.data);
    });

    it("should use discover endpoint when genre is specified", async () => {
      const mockResponse = {
        data: {
          results: [{ id: 1, title: "Genre Movie" }],
          total_pages: 1,
          total_results: 1,
          page: 1,
        },
      };

      mockedAxios.get.mockResolvedValueOnce(mockResponse);

      const result = await movieApi.getPopularMovies(1, 28); // 28 is Action genre
      expect(mockedAxios.get).toHaveBeenCalledWith(
        "https://api.themoviedb.org/3/discover/movie",
        expect.any(Object)
      );
      expect(result).toEqual(mockResponse.data);
    });
  });

  describe("getMovieDetails", () => {
    it("should fetch movie details by ID", async () => {
      const mockResponse = {
        data: {
          id: 1,
          title: "Movie Details",
          runtime: 120,
          genres: [{ id: 28, name: "Action" }],
        },
      };

      mockedAxios.get.mockResolvedValueOnce(mockResponse);

      const result = await movieApi.getMovieDetails(1);
      expect(mockedAxios.get).toHaveBeenCalledWith(
        "https://api.themoviedb.org/3/movie/1",
        expect.any(Object)
      );
      expect(result).toEqual(mockResponse.data);
    });
  });

  describe("getGenres", () => {
    it("should fetch all movie genres", async () => {
      const mockResponse = {
        data: {
          genres: [
            { id: 28, name: "Action" },
            { id: 35, name: "Comedy" },
          ],
        },
      };

      mockedAxios.get.mockResolvedValueOnce(mockResponse);

      const result = await movieApi.getGenres();
      expect(mockedAxios.get).toHaveBeenCalledWith(
        "https://api.themoviedb.org/3/genre/movie/list",
        expect.any(Object)
      );
      expect(result).toEqual(mockResponse.data);
    });
  });
});
