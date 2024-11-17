import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiUpdateContact } from "../services/api";
import { toast } from "react-toastify";

export const useUpdateContact = (onEditForm) => {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: ({ id, updatedContactData }) => {
      if (!id || !updatedContactData) {
        throw new Error("Missing ID or updated contact data");
      }
      return apiUpdateContact(id, updatedContactData);
    },
    onSuccess: (data) => {
      console.log("Contact updated successfully:", data);
      queryClient.invalidateQueries({ queryKey: ["contacts"] });
      toast.success("Contact updated successfully");
      onEditForm(false);
    },
    onError: (error) => {
      console.error(
        "Error updating contact:",
        error.response?.data?.message || error.message
      );
      toast.error("Failed to update contact");
      onEditForm(false);
    },
  });

  return { mutate, isPending };
};
