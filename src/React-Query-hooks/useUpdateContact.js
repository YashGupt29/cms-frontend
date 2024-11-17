import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiUpdateContact } from "../services/api";

export const useUpdateContact = () => {
  const queryClient = useQueryClient();

  const { mutate, isLoading, isError, error, isSuccess } = useMutation({
    mutationFn: ({ id, updatedContactData }) => {
      if (!id || !updatedContactData) {
        throw new Error("Missing ID or updated contact data");
      }
      return apiUpdateContact(id, updatedContactData);
    },
    onSuccess: (data) => {
      console.log("Contact updated successfully:", data);
      queryClient.invalidateQueries({ queryKey: ["contacts"] });
    },
    onError: (error) => {
      console.error(
        "Error updating contact:",
        error.response?.data?.message || error.message
      );
    },
  });

  return { mutate, isLoading, isError, error, isSuccess };
};
