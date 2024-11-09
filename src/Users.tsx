import { useEffect, useState } from "react";
import { useUsers } from "./hooks/useUsers";

export function Users() {
  const { data, isLoading, refetch, isFetching, isPending, error, isError } =
    useUsers();

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')

  console.log(
    "Observer a alteração dos valores a cada vez que apertar o botão",
    isPending,
    isLoading,
    isFetching
  );

  useEffect(() => {}, [isError]);

  function handleOnSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

  }

  return (
    <div className="p-4">
      <div className="mb-10">
        <form className="flex flex-col gap-2" onSubmit={handleOnSubmit}>
          <input className="outline-none p1 rounded-md text-zinc-900" type="text" placeholder="Nome" value={name} onChange={e => setName(e.target.value)}/>
          <input className="outline-none p1 rounded-md text-zinc-900" type="text" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)}/>

          <button className="bg-blue-400 py-2 text-zinc-950 rounded-md">Cadastrar</button>
        </form>

      </div>

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
