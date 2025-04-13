import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import MovieSearch from "./components/MovieSearch";
import Footer from "./components/Footer";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      gcTime: 1000 * 60 * 30, // 30 minutes
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen bg-slate-900 flex flex-col">
        <header className="bg-slate-800 shadow-lg py-6">
          <div className="container mx-auto px-4">
            <h1 className="text-3xl font-bold text-slate-100">
              🎬 Virtual Movie Search
            </h1>
          </div>
        </header>
        <main className="container mx-auto px-4 py-8 flex-1">
          <MovieSearch />
        </main>
        <Footer />
      </div>
    </QueryClientProvider>
  );
}

export default App;
