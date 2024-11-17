import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiDeleteForm } from "../services/api";

export function useDeleteContact() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: apiDeleteForm,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["contacts"] });
    },
    onError: (error) => {
      console.error("Error deleting contact:", error.message);
    },
  });

  return mutation;
}
