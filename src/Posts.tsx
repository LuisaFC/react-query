import { useQueryClient } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { IUser } from "./types";
import { sleep } from "./sleep";
// import { useUsers } from "./hooks/useUsers";

export function Posts() {
  const queryClient = useQueryClient();

 // const { data } = useUsers();

  function handleMouseEnter() {
    queryClient.prefetchQuery({
      queryKey: ["users"],
      queryFn: async (): Promise<IUser[]> => {
        await sleep();
        const response = await fetch("http://localhost:3000/users");
        return response.json();
      },
    });
  }
  return (
    <pre>
      Posts
      <br />
      <br />
      <Link to="/users" onMouseEnter={handleMouseEnter}>
        Ir para usuários
      </Link>
    </pre>
  );
}
