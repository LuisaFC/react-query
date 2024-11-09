import { useQuery } from "@tanstack/react-query";
import { IUser } from "../types";
import { sleep } from "../sleep";

export function useUsers() {
  return useQuery({
    enabled: true,
    queryKey: ["users"],
    queryFn: async (): Promise<IUser[]> => {
      // throw new Error("Deu erro!")
      await sleep();
      const response = await fetch("http://localhost:3000/users");
      return response.json();
    },
  });
}
