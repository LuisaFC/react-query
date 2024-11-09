import { useQuery } from "@tanstack/react-query";
import { IUser } from "./types";
import { sleep } from "./sleep";

export function Users() {

  const { data, isLoading, refetch, isFetching, isPending } = useQuery({
    enabled: false,
    queryKey: ["users"],
    staleTime: 5000,
    queryFn: async (): Promise<IUser[]> => {
      await sleep();
      const response = await fetch("http://localhost:3000/users");
      return response.json();
    },
  });

  console.log("Observer a alteração dos valores a cada vez que apertar o botão", isPending, isLoading, isFetching);

  return (
    <div>
      <button
        type="button"
        className="bg-white text-black px-4 py-2 rounded-lg"
        onClick={() => refetch()}
      >
        Listar Usuarios
      </button>

      {isLoading && "Carregando..."}
      {isFetching && <small>Fetching...</small>}

      {data?.map((user) => (
        <div key={user.id}>
          <strong className="block">{user.name}</strong>
          <small>{user.email}</small>
        </div>
      ))}
    </div>
  );
}
