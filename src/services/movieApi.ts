import axios from "axios";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

// Add headers for better API compatibility
const headers = {
  Accept: "application/json",
  "Content-Type": "application/json",
};

export interface Genre {
  id: number;
  name: string;
}

export interface Movie {
  id: number;
  title: string;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  release_date: string;
  vote_average: number;
  vote_count: number;
  genre_ids: number[];
}

export interface MovieResponse {
  results: Movie[];
  total_pages: number;
  total_results: number;
  page: number;
}

export interface MovieDetails extends Movie {
  runtime: number;
  genres: Genre[];
  tagline: string;
  status: string;
  original_language: string;
}

const movieApi = {
  searchMovies: async (
    query: string,
    page = 1,
    genreId?: number
  ): Promise<MovieResponse> => {
    const response = await axios.get(`${BASE_URL}/search/movie`, {
      headers,
      params: {
        api_key: API_KEY,
        query,
        page,
        with_genres: genreId,
        include_adult: false,
        language: "en-US",
      },
    });
    return response.data;
  },

  getPopularMovies: async (
    page = 1,
    genreId?: number
  ): Promise<MovieResponse> => {
    // Use discover endpoint when genre is specified, otherwise use popular
    const endpoint = genreId ? "/discover/movie" : "/movie/popular";
    const params: any = {
      api_key: API_KEY,
      page,
      include_adult: false,
      language: "en-US",
    };

    if (genreId) {
      params.with_genres = genreId;
      params.sort_by = "popularity.desc"; // Sort by popularity when using discover
    }

    const response = await axios.get(`${BASE_URL}${endpoint}`, {
      headers,
      params,
    });
    return response.data;
  },

  getMovieDetails: async (movieId: number): Promise<MovieDetails> => {
    const response = await axios.get(`${BASE_URL}/movie/${movieId}`, {
      headers,
      params: {
        api_key: API_KEY,
        language: "en-US",
      },
    });
    return response.data;
  },

  getGenres: async (): Promise<{ genres: Genre[] }> => {
    const response = await axios.get(`${BASE_URL}/genre/movie/list`, {
      headers,
      params: {
        api_key: API_KEY,
        language: "en-US",
      },
    });
    return response.data;
  },
};

export default movieApi;
