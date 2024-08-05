import { toast } from "sonner"
import { useMutation, useQueryClient } from "@tanstack/react-query";
// import { InferRequestType, InferResponseType } from "hono";

// import { client } from "@/lib/hono";

// type ResponseType = InferResponseType<typeof client.api.categories.$post>;
// type RequestType = InferRequestType<typeof client.api.categories.$post>["json"];

export const useCreateCategory = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation<
    ResponseType,
    Error//,
    //RequestType
  >({
    mutationFn: async (json) => {

      console.log("mutationFn" , json);
      //TODO faire un appel de l'api 
      // const response = await client.api.categories.$post({ json });

      // return await response.json();
      return JSON.parse("a");
    },
    onSuccess: () => {
      toast.success("Category has been created.")
      queryClient.invalidateQueries({ queryKey: ["categories"] });

    },
    onError: () => {
      toast.error("Failed to create category.")
    },
  });

  return mutation;
};
