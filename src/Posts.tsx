import { useQuery } from "@tanstack/react-query";
import { IUser } from "./types";
import { sleep } from "./sleep";

export function Posts() {
  const {data} = useQuery({
    enabled: false,
    queryKey: ["users"],
    staleTime: 5000,
    gcTime: 10000,
    refetchOnWindowFocus: false,
    queryFn: async (): Promise<IUser[]> => {
      await sleep();
      const response = await fetch("http://localhost:3000/users");
      return response.json();
    },
  });
  return (
    <pre>
      {JSON.stringify({data}, null, 2)}
    </pre>
  )
}
