import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiPostForm } from "../services/api";

export function usePostForm() {
  const queryClient = useQueryClient();
  const { mutate, mutateAsync, isLoading, isError, isSuccess, error } =
    useMutation({
      mutationFn: apiPostForm,
      onSuccess: () => {
        queryClient.invalidateQueries(["contacts"]);
      },
    });

  return { mutate, mutateAsync, isLoading, isError, isSuccess, error };
}
