import axios from "axios";
export const apiGet = async () => {
  try {
    const res = await axios.get(
      "https://cms-backend-production-4495.up.railway.app/api/contacts/"
    );
    return res.data;
  } catch (error) {
    console.error("Error fetching data:", error.message);
    throw new Error("Failed to fetch contacts");
  }
};
export const apiPostForm = async ({ data }) => {
  try {
    const res = await axios.post(
      "https://cms-backend-production-4495.up.railway.app/api/contacts/",
      data
    );
    console.log("Response:", res.data);
    return res.data;
  } catch (error) {
    console.error("Error posting data:", error.message);
    throw error;
  }
};
export const apiUpdateContact = async (id, updatedContactData) => {
  console.log(updatedContactData, id);
  try {
    const response = await axios.put(
      `https://cms-backend-production-4495.up.railway.app/api/contacts/${id}`,
      updatedContactData
    );
    console.log("Updated contact:", response.data);
  } catch (error) {
    console.error(
      "Error updating contact:",
      error.response?.data?.message || error.message
    );
  }
};
export const apiDeleteForm = async (ids) => {
  try {
    console.log(ids);
    const deleteRequests = ids.map((id) =>
      axios.delete(
        `https://cms-backend-production-4495.up.railway.app/api/contacts/${id}`
      )
    );
    const responses = await axios.all(deleteRequests);
    return responses.map((response) => response.data);
  } catch (error) {
    console.error("Error Deleting data:", error.message);
    throw error;
  }
};
