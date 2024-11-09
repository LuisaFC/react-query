import { useEffect } from "react";
import { useUsers } from "./hooks/useUsers";
import { useMutation } from "@tanstack/react-query";
import { IUser } from "./types";
import { sleep } from "./sleep";

export function Users() {
  const { data: users, isLoading: isUsersLoading, refetch, isFetching, isPending: isQueryPending, error: usersError, isError } =
    useUsers();

  const {mutate, isPending, data, error} = useMutation({
    mutationFn: async ({name, email}: {name: string, email: string}): Promise<IUser> => {
      await sleep()
      const response = await fetch("http://localhost:3000/users", {
        method: "POST",
        headers: {'content-type': 'application/json'},
        body: JSON.stringify({name, email})
      })

      return response.json()
    },
    onError: (error, variables) => {
      console.log(`Erro na request. \n${error.toString()} \n${variables}`)
    },
    onSuccess: (data, variables) => {
      console.log("onSucess", {data, variables})
    },
    onSettled: () => {
      console.log("Terminou a execução")
    }
  })

  console.log(
    "Observer a alteração dos valores a cada vez que apertar o botão",
    isQueryPending,
    isUsersLoading,
    isFetching
  );

  console.log("data", data)
  console.log("error", error)

  useEffect(() => {}, [isError]);

  function handleOnSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const elements = event.currentTarget.elements as typeof event.currentTarget.elements & {
      name: HTMLFormElement
      email: HTMLFormElement
    }

    console.log("nome: ", elements.name.value)
    console.log("email: ", elements.email.value)

    mutate({
      email: elements.email.value,
      name: elements.name.value
    })
  }

  return (
    <div className="p-4">
      <div className="mb-10">
        <form className="flex flex-col gap-2" onSubmit={handleOnSubmit}>
          <input className="outline-none p1 rounded-md text-zinc-900" type="text" placeholder="Nome" name="name"/>
          <input className="outline-none p1 rounded-md text-zinc-900" type="text" placeholder="Email"name="email"/>

          <button className="bg-blue-400 py-2 text-zinc-950 rounded-md">
            {isPending ? 'Cadastrando' : 'Cadastar'}
          </button>
        </form>

      </div>

      <button
        type="button"
        className="bg-white text-black px-4 py-2 rounded-lg"
        onClick={() => refetch()}
      >
        Listar Usuarios
      </button>

      {isUsersLoading && "Carregando..."}
      {isFetching && <small>Fetching...</small>}
      {usersError && <h1 className="text-red-400">{usersError.toString()}</h1>}

      {users?.map((user) => (
        <div key={user.id}>
          <strong className="block">{user.name}</strong>
          <small>{user.email}</small>
        </div>
      ))}
    </div>
  );
}
