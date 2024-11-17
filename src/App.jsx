import { useEffect, useState } from "react";
import EnhancedTable from "./components/ui/tableUI/table";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [openForm, setOpenForm] = useState(false);
  const [editForm, setEditForm] = useState(false);

  useEffect(() => {
    const handleEscapeKey = (event) => {
      if (event.key === "Escape") {
        setOpenForm(false);
        setEditForm(false);
      }
    };

    window.addEventListener("keydown", handleEscapeKey);
    return () => {
      window.removeEventListener("keydown", handleEscapeKey);
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
        autoClose={5000}
        hideProgressBar={false}
        closeOnClick
      />
    </>
  );
}

export default App;
