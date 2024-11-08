import { useQuery } from "@tanstack/react-query";
import { IUser } from "./types";
import { sleep } from "./sleep";


export function Users() {
  const { data, isLoading } = useQuery(
    {
      enabled: false,
      queryKey: ["users"],
      queryFn: async (): Promise<IUser[]> => {
        await sleep()
        const response = await fetch("http://localhost:3000/users");
        return response.json();
      },
    }
  );

  return(
    <div>
      {isLoading && 'Carregando...'}

        {data?.map((user) => (
          <div key={user.id}>
            <strong className="block">{user.name}</strong>
            <small>{user.email}</small>
          </div>
        ))}
      </div>
  )
}
