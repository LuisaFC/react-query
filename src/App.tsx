import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Users } from "./Users";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import { Posts } from "./Posts";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5000,
      retry: false,
      gcTime: 10 * 60 * 60 * 1000, //10min
      refetchOnWindowFocus: false,
    },
    mutations: {}
  },
});

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <ul>
          <li>
            <Link className="m-2" to="/">Usuários</Link>
            <Link to="/posts">Posts</Link>
          </li>
        </ul>
        <Routes>
          <Route path="/" element={<Users />} />
          <Route path="/posts" element={<Posts />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}
