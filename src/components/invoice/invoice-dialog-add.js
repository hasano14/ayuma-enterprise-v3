/* eslint-disable react/jsx-max-props-per-line */
import React, { useState, useEffect } from "react";
import ms from "date-fns/locale/ms";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import {
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  FormControl,
  Grid,
  TextField,
  IconButton,
  InputAdornment,
  InputLabel,
  Select,
  MenuItem,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import InvoiceDataService from "../../services/invoices";

export const InvoiceDialogAdd = (props) => {
  const { onClose, open, ...other } = props;
  const [dateValue, setDateValue] = useState(null);

  //Handle Invoice Changes
  const [invoiceStatus, setInvoiceStatus] = useState("");
  const [invoiceId, setInvoiceId] = useState("");
  const [invoiceName, setInvoiceName] = useState("");
  const [invoiceDate, setInvoiceDate] = useState(null);
  const [invoiceAmount, setInvoiceAmount] = useState("");
  const [invoice200g, setInvoice200g] = useState("");
  const [invoice500g, setInvoice500g] = useState("");

  const [checkEmptyInvoiceId, setCheckEmptyInvoiceId] = useState(false);
  const [checkEmptyInvoiceName, setCheckEmptyInvoiceName] = useState(false);
  const [checkEmptyInvoiceStatus, setCheckEmptyInvoiceStatus] = useState(false);
  const [checkEmptyInvoiceDate, setCheckEmptyInvoiceDate] = useState(false);
  const [checkEmptyTotalAmount, setCheckEmptyTotalAmount] = useState(false);

  const handleStatusChange = (event) => {
    setInvoiceStatus(event.target.value);
  };

  const handleDateChange = (newValue) => {
    setDateValue(newValue);
    setInvoiceDate(newValue);
  };

  //Handle Invoice Add
  const addInvoice = () => {
    var data = {
      invoiceNumber: invoiceId,
      invoiceName: invoiceName,
      invoiceStatus: invoiceStatus,
      invoice200g: invoice200g,
      invoice500g: invoice500g,
      invoiceAmount: invoiceAmount,
      invoiceDate: invoiceDate,
    };

    //Check If Empty
    invoiceId !== "" ? setCheckEmptyInvoiceId(false) : setCheckEmptyInvoiceId(true);
    invoiceName !== "" ? setCheckEmptyInvoiceName(false) : setCheckEmptyInvoiceName(true);
    invoiceAmount !== "" ? setCheckEmptyTotalAmount(false) : setCheckEmptyTotalAmount(true);
    invoiceDate !== null ? setCheckEmptyInvoiceDate(false) : setCheckEmptyInvoiceDate(true);
    invoiceStatus !== "" ? setCheckEmptyInvoiceStatus(false) : setCheckEmptyInvoiceStatus(true);

    if (
      invoiceId === "" ||
      invoiceName === "" ||
      invoiceStatus === "" ||
      invoiceAmount === "" ||
      invoiceDate === null
    ) {
      return;
    }

    InvoiceDataService.create(data)
      .then((response) => {
        console.log(response.data);
        onClose("Received");
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const handleClose = () => {
    onClose();

    //Reset All States
    setInvoiceStatus("");
    setInvoiceId("");
    setInvoiceName("");
    setInvoiceDate(null);
    setInvoiceAmount("");
    setInvoice200g("");
    setInvoice500g("");

    setCheckEmptyInvoiceId(false);
    setCheckEmptyInvoiceName(false);
    setCheckEmptyInvoiceStatus(false);
    setCheckEmptyInvoiceDate(false);
    setCheckEmptyTotalAmount(false);
  };

  return (
    <Box
      sx={{
        my: 1,
        mx: 1,
      }}
    >
      <Dialog open={open} onClose={handleClose} sx={{ alignment: "center" }}>
        <Box
          sx={{
            alignItems: "center",
            display: "flex",
            justifyContent: "space-between",
            flexWrap: "wrap",
            mt: 1,
          }}
        >
          <DialogTitle sx={{ fontSize: "h4.fontSize" }}>Add Invoice</DialogTitle>
          <IconButton onClick={handleClose} sx={{ mr: 2 }}>
            <CloseIcon />
          </IconButton>
        </Box>
        <DialogContent sx={{ alignItems: "center", display: "flex" }}>
          <form action="/" method="POST">
            <FormControl fullWidth>
              {checkEmptyInvoiceId ||
              checkEmptyInvoiceName ||
              checkEmptyInvoiceStatus ||
              checkEmptyInvoiceDate ||
              checkEmptyTotalAmount ? (
                <Typography sx={{ color: "red", mb: 2 }} variant="body2">
                  Please fill in all the required fields
                </Typography>
              ) : (
                ""
              )}
              <TextField
                error={checkEmptyInvoiceId ? true : false}
                id="invoiceNumber"
                name="invoiceNumber"
                label="Invoice Number"
                hintText="Invoice Number"
                sx={{ display: "block" }}
                fullWidth
                onChange={(e) => setInvoiceId(e.target.value)}
                required
              />
              <TextField
                name="Name"
                hintText="Invoice Name"
                label="Invoice Name"
                sx={{ mt: 2, display: "block" }}
                fullWidth
                onChange={(e) => setInvoiceName(e.target.value)}
                required
                error={checkEmptyInvoiceName ? true : false}
              />
              <Grid sx={{ mt: 2, display: "block" }} container>
                <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ms}>
                  <DatePicker
                    label="Invoice Date"
                    value={dateValue}
                    onChange={handleDateChange}
                    inputFormat="dd/MM/yyyy"
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        error={checkEmptyInvoiceDate ? true : false}
                        fullWidth
                        required
                      />
                    )}
                  />
                </LocalizationProvider>
              </Grid>
              <Grid container spacing={1}>
                <Grid item xs={6}>
                  <TextField
                    name="invoice200g"
                    hintText="Qty 200g"
                    label="Qty 200g"
                    sx={{ mt: 2, display: "block" }}
                    onChange={(e) => setInvoice200g(e.target.value)}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    name="invoice500g"
                    hintText="Qty 500g"
                    label="Qty 500g"
                    sx={{ mt: 2, display: "block" }}
                    onChange={(e) => setInvoice500g(e.target.value)}
                  />
                </Grid>
              </Grid>
              <TextField
                name="invoiceAmount"
                hintText="Total Amount (RM)"
                label="Total Amount (RM)"
                sx={{ mt: 2, display: "block" }}
                InputProps={{
                  startAdornment: <InputAdornment position="start">RM</InputAdornment>,
                }}
                fullWidth
                onChange={(e) => setInvoiceAmount(e.target.value)}
                required
                error={checkEmptyTotalAmount ? true : false}
              />
              <TextField
                name="invoiceStatus"
                hintText="Select Status"
                label="Status"
                select
                onChange={handleStatusChange}
                sx={{ mt: 2, display: "block" }}
                fullWidth
                required
                error={checkEmptyInvoiceStatus ? true : false}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value="Paid">Paid</MenuItem>
                <MenuItem value="Pending">Pending</MenuItem>
              </TextField>
              <Button variant="contained" sx={{ my: 2 }} onClick={addInvoice}>
                Add
              </Button>
            </FormControl>
          </form>
        </DialogContent>
      </Dialog>
    </Box>
  );
};
