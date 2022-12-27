/* eslint-disable react/jsx-max-props-per-line */
import React, { useEffect, useState } from "react";
import PerfectScrollbar from "react-perfect-scrollbar";
import PropTypes from "prop-types";
import { format } from "date-fns";
import {
  Avatar,
  Box,
  Card,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Tooltip,
  IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { SeverityPill } from "../severity-pill";
import InvoiceDataService from "../../services/invoices";

// import { InvoiceDialogView } from "./invoice-dialog-view";
import { InvoiceDialogUpdate } from "./invoice-dialog-update";
import { InvoiceDialogDelete } from "./invoice-dialog-delete";

export const InvoiceListResults = (prop) => {
  const { result, search } = prop;
  const searchInvoice = result;
  const [invoices, setInvoices] = useState([]);
  const [invoiceResult, setInvoiceResult] = useState([]);

  //Using result to display search results

  useEffect(
    (result) => {
      if (result !== undefined) {
        console.log("Result: " + searchInvoice);
        InvoiceDataService.find(searchInvoice, "Invoice Number")
          .then((response) => {
            setInvoiceResult(response.data.invoiceData);
            console.log(response.data);
          })
          .catch((e) => {
            console.log(e);
          });
      }
    },
    [search]
  );

  //Check if result is undefined
  const checkResult = () => {
    if (result !== undefined) {
      setResults(result);
    }
    return;
  };

  //Dialog
  const [openDialogView, setOpenDialogView] = useState(false);
  const [openDialogUpdate, setOpenDialogUpdate] = useState(false);
  const [openDialogDelete, setOpenDialogDelete] = useState(false);

  //Selected Invoice ID
  const [selectedInvoiceIds, setSelectedInvoiceIds] = useState([]);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);
  const [invoiceId, setInvoiceId] = useState("");
  const [invoiceIdDelete, setInvoiceIdDelete] = useState("");

  useEffect(() => {
    retrieveInvoices();
  }, []);

  const retrieveInvoices = () => {
    InvoiceDataService.getAll()
      .then((response) => {
        setInvoices(response.data.invoiceData);
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  //Handle Update Invoice
  const handleOpenDialogUpdate = (id) => {
    setInvoiceId(id);
    setOpenDialogUpdate(true);
  };

  //Handle Delete Invoice
  const handleDeleteInvoice = (id) => {
    setInvoiceIdDelete(id);
    setOpenDialogDelete(true);
  };

  //Refresh page after update/delete
  const handlePageUpdate = () => {
    if (openDialogUpdate === true) {
      setInvoiceId(null);
      setOpenDialogUpdate(false);
    }
    if (openDialogDelete === true) {
      setOpenDialogDelete(false);
    }
    if (openDialogView === true) {
      setOpenDialogView(false);
    }
    retrieveInvoices();
  };

  //Handle Select All Invoice
  const handleSelectAll = (event) => {
    let newSelectedInvoiceIds;
    if (event.target.checked) {
      newSelectedInvoiceIds = invoices.map((invoice) => invoice._id);
    } else {
      newSelectedInvoiceIds = [];
    }

    setSelectedInvoiceIds(newSelectedInvoiceIds);
  };

  //Handle Select One Invoice
  const handleSelectOne = (event, id) => {
    const selectedIndex = selectedInvoiceIds.indexOf(id);
    let newSelectedInvoiceIds = [];

    if (selectedIndex === -1) {
      newSelectedInvoiceIds = newSelectedInvoiceIds.concat(selectedInvoiceIds, id);
    } else if (selectedIndex === 0) {
      newSelectedInvoiceIds = newSelectedInvoiceIds.concat(selectedInvoiceIds.slice(1));
    } else if (selectedIndex === selectedInvoiceIds.length - 1) {
      newSelectedInvoiceIds = newSelectedInvoiceIds.concat(selectedInvoiceIds.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelectedInvoiceIds = newSelectedInvoiceIds.concat(
        selectedInvoiceIds.slice(0, selectedIndex),
        selectedInvoiceIds.slice(selectedIndex + 1)
      );
    }

    setSelectedInvoiceIds(newSelectedInvoiceIds);
  };

  const handleLimitChange = (event) => {
    setLimit(event.target.value);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  //Convert from ISO to dd/MM/yyyy
  const convertDate = (date) => {
    const newDate = new Date(date);
    const day = newDate.getDate();
    const month = newDate.getMonth() + 1;
    const year = newDate.getFullYear();

    if (day < 10) day = "0" + day;
    if (month < 10) month = "0" + month;

    return day + "/" + month + "/" + year;
  };

  return (
    <>
      <Card>
        <PerfectScrollbar>
          <Box sx={{ overflow: "auto" }}>
            <Table>
              <TableHead>
                <TableRow>
                  {/* <TableCell padding="checkbox">
                    <Checkbox
                      checked={selectedInvoiceIds.length === invoices.length}
                      color="primary"
                      indeterminate={
                        selectedInvoiceIds.length > 0 && selectedInvoiceIds.length < invoices.length
                      }
                      onChange={handleSelectAll}
                    />
                  </TableCell> */}
                  <TableCell>Invoice Ref</TableCell>
                  <TableCell>Date</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Qty (200g)</TableCell>
                  <TableCell>Qty (500g)</TableCell>
                  <TableCell>Total (RM)</TableCell>
                  <TableCell>Actions</TableCell>
                  <TableCell>Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {invoices.map((invoice) => (
                  <TableRow
                    hover
                    key={invoice._id}
                    selected={selectedInvoiceIds.indexOf(invoice._id) !== -1}
                  >
                    {/* <TableCell padding="checkbox">
                      <Checkbox
                        checked={selectedInvoiceIds.indexOf(invoice._id) !== -1}
                        onChange={(event) => handleSelectOne(event, invoice._id)}
                        value="true"
                      />
                    </TableCell> */}
                    <TableCell>{invoice.InvoiceNumber}</TableCell>
                    <TableCell>{convertDate(invoice.InvoiceDate)}</TableCell>
                    <TableCell>{invoice.Name}</TableCell>
                    <TableCell>{invoice.Qty200g}</TableCell>
                    <TableCell>{invoice.Qty500g}</TableCell>
                    <TableCell>{invoice.InvoiceAmount}</TableCell>
                    {/* Actions */}
                    <TableCell>
                      {/* View Invoice
                      <Tooltip title="View">
                        <IconButton
                          aria-label="view"
                          onClick={() => handleOpenDialogView(invoice._id)}
                        >
                          <VisibilityIcon />
                        </IconButton>
                      </Tooltip> */}
                      {/* Edit Invoice */}
                      <Tooltip title="Edit">
                        <IconButton
                          aria-label="edit"
                          onClick={() => handleOpenDialogUpdate(invoice.InvoiceNumber)}
                        >
                          <EditIcon />
                        </IconButton>
                      </Tooltip>

                      {/* Delete Invoice */}
                      <Tooltip title="Delete">
                        <IconButton
                          aria-label="delete"
                          onClick={() => handleDeleteInvoice(invoice._id)}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </Tooltip>
                    </TableCell>

                    {/* Status */}
                    <TableCell>
                      <SeverityPill
                        color={
                          (invoice.Status === "Paid" && "success") ||
                          (invoice.Status === "Refunded" && "error") ||
                          "warning"
                        }
                      >
                        {invoice.Status}
                      </SeverityPill>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Box>
        </PerfectScrollbar>
        <TablePagination
          component="div"
          count={invoices.length}
          onPageChange={handlePageChange}
          onRowsPerPageChange={handleLimitChange}
          page={page}
          rowsPerPage={limit}
          rowsPerPageOptions={[5, 10, 25]}
        />
        <InvoiceDialogUpdate
          open={openDialogUpdate}
          onClose={() => handlePageUpdate()}
          id={invoiceId}
        />

        <InvoiceDialogDelete
          open={openDialogDelete}
          onClose={() => handlePageUpdate()}
          id={invoiceIdDelete}
        />
      </Card>
    </>
  );
};

InvoiceListResults.propTypes = {
  invoices: PropTypes.array.isRequired,
};
