import axios from "axios";
import { toast } from "sonner"
import { useMutation, useQueryClient } from "@tanstack/react-query";

type RequestType = any;

export const useBulkCreateRequests = () => {
    const queryClient = useQueryClient();
  
    const mutation = useMutation<
      ResponseType,
      Error, 
      RequestType
    >({
      mutationFn: async (json) => {
        const response = await axios.post(`http://localhost:8000/api/v1/request-bulk`, json, {
          withCredentials: true,
        });
        return response.data;
      },
      onSuccess: () => {
        toast.success("Requests created successfully")
        queryClient.invalidateQueries({ queryKey: ["requests"] });
        queryClient.invalidateQueries({ queryKey: ["summary"] });
  
      },
      onError: () => {
        toast.error("Failed to create requests.")
      },
    });
  
    return mutation;
  };
  