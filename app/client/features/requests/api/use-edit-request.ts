import { toast } from "sonner"
import { useMutation, useQueryClient } from "@tanstack/react-query";
// import { InferRequestType, InferResponseType } from "hono";

// import { client } from "@/lib/hono";

// type ResponseType = InferResponseType<typeof client.api.transactions[":id"]["$patch"]>;
// type RequestType = InferRequestType<typeof client.api.transactions[":id"]["$patch"]>["json"];

export const useEditTransaction = (id?: string) => {
  const queryClient = useQueryClient();

  const mutation = useMutation<
    ResponseType,
    Error//,
    // RequestType
  >({
    mutationFn: async (json) => {
      // const response = await client.api.transactions[":id"]["$patch"]({
      //   param: { id },
      //   json
      // });

      // return await response.json();
      return JSON.parse("a");
    },
    onSuccess: () => {
      toast.success("Request updated.")
      queryClient.invalidateQueries({ queryKey: ["request", { id }] });
      queryClient.invalidateQueries({ queryKey: ["requests"] });
      queryClient.invalidateQueries({ queryKey: ["summary"] });

    },
    onError: () => {
      toast.error("Failed to edit request.")
    },
  });

  return mutation;
};
