import { toast } from "sonner"
import { useMutation, useQueryClient } from "@tanstack/react-query";
// import { InferRequestType, InferResponseType } from "hono";

// import { client } from "@/lib/hono";

// type ResponseType = InferResponseType<typeof client.api.transactions.$post>;
// type RequestType = InferRequestType<typeof client.api.transactions.$post>["json"];

export const useCreateRequest = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation<
    ResponseType,
    Error//,
    // RequestType
  >({
    mutationFn: async (json) => {
      // const response = await client.api.transactions.$post({ json });

      // return await response.json();
      return JSON.parse("a");
    },
    onSuccess: () => {
      toast.success("Request has been created.")
      queryClient.invalidateQueries({ queryKey: ["requests"] });
      queryClient.invalidateQueries({ queryKey: ["summary"] });
    },
    onError: () => {
      toast.error("Failed to create request.")
    },
  });

  return mutation;
};
