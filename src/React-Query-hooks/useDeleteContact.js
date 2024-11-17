import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiDeleteForm } from "../services/api";
import { toast } from "react-toastify";

export function useDeleteContact(onSelected) {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: apiDeleteForm,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["contacts"] });
      onSelected([]);
      toast.success("Contact deleted successfully");
    },
    onError: (error) => {
      console.error("Error deleting contact:", error.message);
      toast.error("Failed to delete contact");
    },
  });

  return mutation;
}
