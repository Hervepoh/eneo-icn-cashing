import { useQuery } from "@tanstack/react-query";

// import { client } from "@/lib/hono";


export const useGetCategory = (id?: string) => {
  const query = useQuery({
    enabled: !!id,   // Fetch only if we have the id
    queryKey: ["category", { id }],
    queryFn: async () => {
      // const response = await client.api.categories[":id"].$get({ param: { id } });

      // if (!response.ok) {
      //   throw new Error(`Failed to fetch category : ${id}`);
      // }

      // const { data } = await response.json();
      const data: any[] | PromiseLike<any[]> = [];
      return data;
    },
  });

  return query;
};
