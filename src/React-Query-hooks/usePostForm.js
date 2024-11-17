import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiPostForm } from "../services/api";
import { toast } from "react-toastify";

export function usePostForm(onSetForm) {
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: apiPostForm,
    onSuccess: () => {
      queryClient.invalidateQueries(["contacts"]);
      toast.success("contact added successfully");
      onSetForm(false);
    },
    onError: (error) => {
      console.error("Error posting data:", error.message);
      toast.error("Failed to add contact");
      onSetForm(false);
    },
  });

  return { mutate, isPending };
}
