import { useQuery } from "@tanstack/react-query";
import { apiGet } from "../services/api";

export const useGetContacts = () => {
  return useQuery({
    queryKey: ["contacts"],
    queryFn: async () => {
      const data = await apiGet();
      if (!data) throw new Error("No data returned");
      return data;
    },
    staleTime: 1000 * 60 * 5,
    cacheTime: 1000 * 60 * 10,
    retry: 2,
    onError: (error) => {
      console.error("React Query Error:", error.message);
    },
  });
};
