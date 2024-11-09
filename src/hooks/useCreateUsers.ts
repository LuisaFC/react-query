import { useMutation } from "@tanstack/react-query"
import { IUser } from "../types"
import { sleep } from "../sleep"

export function useCreateUsers() {
  return useMutation({
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
}
