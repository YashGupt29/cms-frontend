import * as React from "react";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Checkbox from "@mui/material/Checkbox";
import { defaultValues } from "../../../constants/constants";
import { EnhancedTableHead } from "./tableHeader";
import { EnhancedTableToolbar } from "./tableToolbar";
import { getComparator } from "../../../utils/tableHelper";
import { Backdrop, IconButton, Menu, MenuItem, Skeleton } from "@mui/material";
import { ContactForm } from "../formUi/form";
import { useGetContacts } from "../../../React-Query-hooks/useGetContact";
import { useUpdateContact } from "../../../React-Query-hooks/useUpdateContact";

export default function EnhancedTable({
  // eslint-disable-next-line react/prop-types
  onSetForm,
  // eslint-disable-next-line react/prop-types
  openForm,
  // eslint-disable-next-line react/prop-types
  editForm,
  // eslint-disable-next-line react/prop-types
  onEditForm,
}) {
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("names");
  const [contactId, setContactId] = React.useState([]);
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [defaultEditValues, setDefaultEditValues] = React.useState({});
  const [selectedRow, setSelectedRow] = React.useState(null);
  const [editId, setEditId] = React.useState(null);
  const { data: sampleContacts, isLoading } = useGetContacts();
  const { mutate: updateContact, isLoading: isLodaingUpdateContact } =
    useUpdateContact();
  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = sampleContacts?.map((n) => n._id);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, id) => {
    const isChecked = event.target.checked;

    if (isChecked) {
      setContactId((prevContactId) => [...prevContactId, id]);
    } else {
      setContactId((prevContactId) =>
        prevContactId.filter((contact) => contact !== id)
      );
    }

    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const emptyRows =
    page > 0
      ? Math.max(0, (1 + page) * rowsPerPage - sampleContacts?.length)
      : 0;

  const visibleRows = React.useMemo(
    () =>
      [...(sampleContacts || [])]
        .sort(getComparator(order, orderBy))
        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage),
    [order, orderBy, page, rowsPerPage, sampleContacts]
  );

  const handleOpen = (event, row) => {
    setSelectedRow(row);
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleEditClick = () => {
    if (selectedRow) {
      setDefaultEditValues({
        firstName: selectedRow.firstName,
        lastName: selectedRow.lastName,
        email: selectedRow.email,
        phone: selectedRow.phone,
        company: selectedRow.company,
        jobTitle: selectedRow.jobTitle,
      });
      setEditId(selectedRow._id);
      onEditForm(true);
    }
    handleClose();
  };
  const handleClickOutsideForm = (event) => {
    if (event.target === event.currentTarget) {
      onEditForm(false);
    }
  };
  const handleAddSubmit = (formData) => {
    updateContact({ id: editId, updatedContactData: formData });
    if (isLodaingUpdateContact) {
      alert("loading");
    }

    onEditForm(false);
  };

  return (
    <>
      {editForm && (
        <Backdrop
          open={editForm}
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
            initialValues={
              defaultEditValues ? defaultEditValues : defaultValues
            }
            onSubmit={handleAddSubmit}
            editForm={editForm}
          />
        </Backdrop>
      )}
      <Box
        sx={{
          width: "90%",
          m: 10,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Paper sx={{ width: "100%", mb: 2, p: 3 }}>
          <EnhancedTableToolbar
            numSelected={selected.length}
            onSetForm={onSetForm}
            openForm={openForm}
            contactId={contactId}
          />
          <TableContainer>
            <Table
              sx={{ minWidth: 750 }}
              aria-labelledby="tableTitle"
              size={"medium"}
            >
              <EnhancedTableHead
                numSelected={selected.length}
                order={order}
                orderBy={orderBy}
                onSelectAllClick={handleSelectAllClick}
                onRequestSort={handleRequestSort}
                rowCount={sampleContacts?.length}
              />
              <TableBody>
                {isLoading
                  ? Array.from({ length: 5 }).map((_, rowIndex) => (
                      <TableRow key={rowIndex}>
                        <TableCell padding="checkbox">
                          <Skeleton
                            variant="rectangular"
                            width={20}
                            height={30}
                          />
                        </TableCell>
                        <TableCell>
                          <Skeleton variant="text" width="60%" />
                        </TableCell>
                        <TableCell align="center">
                          <Skeleton variant="text" width="80%" />
                        </TableCell>
                        <TableCell align="center">
                          <Skeleton variant="text" width="80%" />
                        </TableCell>
                        <TableCell align="center">
                          <Skeleton variant="text" width="70%" />
                        </TableCell>
                        <TableCell align="center">
                          <Skeleton variant="text" width="70%" />
                        </TableCell>
                        <TableCell align="center">
                          <Skeleton variant="circular" width={24} height={24} />
                        </TableCell>
                      </TableRow>
                    ))
                  : visibleRows?.map((row, index) => {
                      const isItemSelected = selected.includes(row._id);
                      const labelId = `enhanced-table-checkbox-${index}`;
                      return (
                        <TableRow
                          hover
                          role="checkbox"
                          aria-checked={isItemSelected}
                          tabIndex={-1}
                          key={row._id}
                          selected={isItemSelected}
                          sx={{ cursor: "pointer" }}
                        >
                          <TableCell
                            padding="checkbox"
                            onClick={(event) => handleClick(event, row._id)}
                          >
                            <Checkbox
                              color="primary"
                              checked={isItemSelected}
                              inputProps={{
                                "aria-labelledby": labelId,
                              }}
                            />
                          </TableCell>
                          <TableCell
                            component="th"
                            id={labelId}
                            scope="row"
                            padding="none"
                          >
                            {row.firstName} {row.lastName}
                          </TableCell>
                          <TableCell align="center">{row.email}</TableCell>
                          <TableCell align="center">{row.phone}</TableCell>
                          <TableCell align="center">{row.company}</TableCell>
                          <TableCell align="center">{row.jobTitle}</TableCell>
                          <>
                            <IconButton
                              onClick={(event) => handleOpen(event, row)}
                              sx={{ color: "gray", cursor: "pointer" }}
                            >
                              <MoreVertIcon />
                            </IconButton>
                            <Menu
                              anchorEl={anchorEl}
                              open={Boolean(anchorEl)}
                              onClose={handleClose}
                              anchorOrigin={{
                                vertical: "bottom",
                                horizontal: "left",
                              }}
                              transformOrigin={{
                                vertical: "top",
                                horizontal: "left",
                              }}
                            >
                              <MenuItem
                                onClick={handleEditClick}
                                sx={{
                                  padding: 1,
                                  height: 5,
                                }}
                              >
                                Edit Contact
                              </MenuItem>
                            </Menu>
                          </>
                        </TableRow>
                      );
                    })}
                {emptyRows > 0 && (
                  <TableRow
                    style={{
                      height: 53 * emptyRows,
                    }}
                  >
                    <TableCell colSpan={6} />
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={sampleContacts?.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      </Box>
    </>
  );
}
