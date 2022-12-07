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
import { InvoiceDialogUpdate } from "./invoice-dialog-update";

export const InvoiceListResults = () => {
  const [invoices, setInvoices] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedInvoiceIds, setSelectedInvoiceIds] = useState([]);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);
  const [invoiceId, setInvoiceId] = useState("");

  useEffect(() => {
    retrieveInvoices();
  }, []);

  const retrieveInvoices = () => {
    InvoiceDataService.getAll()
      .then((response) => {
        setInvoices(response.data.invoiceData);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const handleOpenDialog = (id) => {
    setOpenDialog(true);
    setInvoiceId(id);
  };

  const handleSelectAll = (event) => {
    let newSelectedInvoiceIds;

    if (event.target.checked) {
      newSelectedInvoiceIds = invoices.map((invoice) => invoice._id);
    } else {
      newSelectedInvoiceIds = [];
    }

    setSelectedInvoiceIds(newSelectedInvoiceIds);
  };

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

  return (
    <>
      <Card>
        <PerfectScrollbar>
          <Box sx={{ overflow: "auto" }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={selectedInvoiceIds.length === invoices.length}
                      color="primary"
                      indeterminate={
                        selectedInvoiceIds.length > 0 && selectedInvoiceIds.length < invoices.length
                      }
                      onChange={handleSelectAll}
                    />
                  </TableCell>
                  <TableCell>Invoice Ref</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Date</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {invoices.map((invoice) => (
                  <TableRow
                    hover
                    key={invoice._id}
                    selected={selectedInvoiceIds.indexOf(invoice._id) !== -1}
                  >
                    <TableCell padding="checkbox">
                      <Checkbox
                        checked={selectedInvoiceIds.indexOf(invoice._id) !== -1}
                        onChange={(event) => handleSelectOne(event, invoice._id)}
                        value="true"
                      />
                    </TableCell>
                    <TableCell>{invoice.InvoiceNumber}</TableCell>
                    <TableCell>{invoice.Name}</TableCell>
                    <TableCell>{invoice.InvoiceDate}</TableCell>
                    {/* <TableCell>{format(invoice.InvoiceAddedDate, "dd/MM/yyyy")}</TableCell> */}
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
                    <TableCell>
                      <Tooltip title="View">
                        <IconButton aria-label="view" onClick={() => handleOpenDialog(invoice._id)}>
                          <VisibilityIcon />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Edit">
                        <IconButton aria-label="edit">
                          <EditIcon />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Delete">
                        <IconButton aria-label="delete">
                          <DeleteIcon />
                        </IconButton>
                      </Tooltip>
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
      </Card>
      <InvoiceDialogUpdate
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        InvoiceNumber={invoiceId}
      />
    </>
  );
};

InvoiceListResults.propTypes = {
  invoices: PropTypes.array.isRequired,
};
