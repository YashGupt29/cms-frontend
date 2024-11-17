import { useEffect, useState } from "react";
import EnhancedTable from "./components/ui/tableUI/table";
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
    </>
  );
}

export default App;
