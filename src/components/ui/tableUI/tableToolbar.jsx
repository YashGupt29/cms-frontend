import {
  Backdrop,
  Box,
  Button,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import { alpha } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import PropTypes from "prop-types";
import FilterListIcon from "@mui/icons-material/FilterList";
import { usePostForm } from "../../../React-Query-hooks/usePostForm";
import { ContactForm } from "../formUi/form";
import { defaultValues } from "../../../constants/constants";
import { useDeleteContact } from "../../../React-Query-hooks/useDeleteContact";
export function EnhancedTableToolbar(props) {
  // eslint-disable-next-line react/prop-types
  const { numSelected, onSetForm, openForm, contactId } = props;
  const { mutate, isPending: isLoadingAddForm } = usePostForm(onSetForm);
  const { mutate: deleteContactMutate } = useDeleteContact();
  const handleClickOutsideForm = (event) => {
    if (event.target === event.currentTarget) {
      onSetForm(false);
    }
  };
  const handleAddSubmit = (formData) => {
    console.log(formData);
    try {
      mutate({ data: formData });
      console.log("Form submitted successfully!");
    } catch (err) {
      console.error("Failed to submit form:", err.message);
    }
  };
  const handleContactDelete = () => {
    console.log(contactId);
    if (window.confirm("Are you sure you want to delete this contact?")) {
      deleteContactMutate(contactId);
    }
  };
  return (
    <>
      {openForm && (
        <Backdrop
          open={openForm}
          sx={{
            color: "#fff",
            zIndex: (theme) => theme.zIndex.drawer + 1,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
          onClick={handleClickOutsideForm}
        >
          <ContactForm
            initialValues={defaultValues}
            onSubmit={handleAddSubmit}
            isLoading={isLoadingAddForm}
          />
        </Backdrop>
      )}
      <Toolbar
        sx={[
          {
            pl: { sm: 2 },
            pr: { xs: 1, sm: 1 },
          },
          numSelected > 0 && {
            bgcolor: (theme) =>
              alpha(
                theme.palette.primary.main,
                theme.palette.action.activatedOpacity
              ),
          },
        ]}
      >
        {numSelected > 0 ? (
          <Typography
            sx={{ flex: "1 1 100%" }}
            color="inherit"
            variant="subtitle1"
            component="div"
          >
            {numSelected} selected
          </Typography>
        ) : (
          <Typography
            sx={{ flex: "1 1 100%" }}
            variant="h6"
            id="tableTitle"
            component="div"
          >
            Contacts
          </Typography>
        )}
        {numSelected > 0 ? (
          <Tooltip title="Delete">
            <IconButton onClick={handleContactDelete}>
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        ) : (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Button
              sx={{
                p: 2,
                textWrap: "nowrap",
                height: 28,
                textTransform: "none",
                color: "gray",
              }}
              onClick={() => onSetForm(!openForm)}
            >
              Add Contact
            </Button>

            <Tooltip title="Filter list">
              <IconButton>
                <FilterListIcon />
              </IconButton>
            </Tooltip>
          </Box>
        )}
      </Toolbar>
    </>
  );
}

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};
