import { useEffect, useState } from "react";
import EnhancedTable from "./components/ui/tableUI/table";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [openForm, setOpenForm] = useState(false);
  const [editForm, setEditForm] = useState(false);
  useEffect(() => {
    toast.info("Use CTRL + A for adding contact to form");
  }, []);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.ctrlKey && event.key === "a") {
        event.preventDefault();
        setOpenForm(true);
        toast.info("Opening Add Form");
      }

      if (event.key === "Escape") {
        setOpenForm(false);
        setEditForm(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <>
      <EnhancedTable
        openForm={openForm}
        onSetForm={setOpenForm}
        editForm={editForm}
        onEditForm={setEditForm}
      />
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        closeOnClick
      />
    </>
  );
}

export default App;
