import axios from 'axios';
import { useMutation, useQueryClient } from '@tanstack/react-query';

interface GetRequestsParams {
  value: string | number
  from:  string
  to:  string
}

interface ResponseData{
  success: boolean 
  bills: any[][]
}

export const useGetUnpaid = (key:string) => {
   
  const queryClient = useQueryClient();
  
  const mutation = useMutation({
    mutationFn: async (payload: GetRequestsParams) => {
      const { value, from , to } = payload;
      const response = await axios.post(`http://localhost:8000/api/v1/search-unpaid?by=${key}`, {
        value,
        from,
        to,
      }, {
        withCredentials: true,
      });
      return response.data;
    },
    onSuccess: () => {
      console.log("Unpaid search request")
      // Invalidate the cache for the affected queries
      //queryClient.invalidateQueries({ queryKey: ["request", { key } ] });
      // queryClient.invalidateQueries({ queryKey: ["requests"] });
      // queryClient.invalidateQueries({ queryKey: ["summary"] });

    },
    onError: (error) => {
      console.error('Error creating request:', error);
    },
  });

  return mutation;
};
