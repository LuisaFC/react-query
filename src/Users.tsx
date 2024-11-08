import { useQuery } from "@tanstack/react-query";
import { IUser } from "./types";


export function Users() {
  const { data } = useQuery(
    {
      queryKey: ["users"],
      queryFn: async (): Promise<IUser[]> => {
        const response = await fetch("http://localhost:3000/users");
        return response.json();
      },
    }
  );

  return(
    <div>
        {data?.map((user) => (
          <div key={user.id}>
            <strong className="block">{user.name}</strong>
            <small>{user.email}</small>
          </div>
        ))}
      </div>
  )
}
