import { useEffect } from "react";
import { useUsers } from "./hooks/useUsers";

export function Users() {
  const { data, isLoading, refetch, isFetching, isPending, error, isError } =
    useUsers();

  console.log(
    "Observer a alteração dos valores a cada vez que apertar o botão",
    isPending,
    isLoading,
    isFetching
  );

  useEffect(() => {}, [isError]);

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
      {error && <h1 className="text-red-400">{error.toString()}</h1>}

      {data?.map((user) => (
        <div key={user.id}>
          <strong className="block">{user.name}</strong>
          <small>{user.email}</small>
        </div>
      ))}
    </div>
  );
}
