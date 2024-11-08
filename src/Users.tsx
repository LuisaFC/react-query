import { useQuery } from "@tanstack/react-query";
import { IUser } from "./types";
import { sleep } from "./sleep";
import { useState } from "react";

export function Users() {
  const [signedIn, setSignedIn] = useState(false);
  const { data, isLoading } = useQuery({
    enabled: signedIn,
    queryKey: ["users"],
    queryFn: async (): Promise<IUser[]> => {
      await sleep();
      const response = await fetch("http://localhost:3000/users");
      return response.json();
    },
  });

  return (
    <div>
      <button
        type="button"
        className="bg-white text-black px-4 py-2 rounded-lg"
        onClick={() => setSignedIn(true)}
      >
        Logar
      </button>

      {isLoading && "Carregando..."}

      {data?.map((user) => (
        <div key={user.id}>
          <strong className="block">{user.name}</strong>
          <small>{user.email}</small>
        </div>
      ))}
    </div>
  );
}
