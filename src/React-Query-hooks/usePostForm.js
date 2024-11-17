import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiPostForm } from "../services/api";

export function usePostForm(onSetForm) {
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: apiPostForm,
    onSuccess: () => {
      queryClient.invalidateQueries(["contacts"]);
      onSetForm(false);
    },
    onError: (error) => {
      console.error("Error posting data:", error.message);
      onSetForm(false);
    },
  });

  return { mutate, isPending };
}
