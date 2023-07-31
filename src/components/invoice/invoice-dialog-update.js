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
  TextField,
  MenuItem,
  IconButton,
  InputAdornment,
  Typography,
  Grid,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import InvoiceDataService from "../../services/invoices";

export const InvoiceDialogUpdate = (props) => {
  const { onClose, open, id, ...other } = props;
  const [dateValue, setDateValue] = useState(null);
  const [invoice, setInvoice] = useState([]);

  //Handle Invoice Changes
  const [invoiceStatus, setInvoiceStatus] = useState("");
  const [invoiceId, setInvoiceId] = useState("");
  const [invoiceObjectID, setInvoiceObjectID] = useState();
  const [invoiceNumber, setInvoiceNumber] = useState("");
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

  useEffect(() => {
    retrieveInvoice();
  }, [id]);

  //Retrieve Invoice by ID
  const retrieveInvoice = () => {
    InvoiceDataService.find(id, "InvoiceNumber")
      .then((response) => {
        setInvoice(response.data.invoiceData);
        console.log(response.data.invoiceData);
      })
      .catch((e) => {
        console.log("Invoice Not Fetch");
      });
  };

  const updateInvoice = (objectID) => {
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

    //Update Invoice
    InvoiceDataService.update(objectID, {
      InvoiceNumber: invoiceNumber,
      InvoiceName: invoiceName,
      InvoiceDate: invoiceDate,
      InvoiceStatus: invoiceStatus,
      InvoiceAmount: invoiceAmount,
      Invoice200g: invoice200g,
      Invoice500g: invoice500g,
    })

      .then((response) => {
        console.log(response.data);
        window.location.reload();
      })
      .catch((e) => {
        console.log(e);
      });
  };

  //Handle Close
  const handleClose = () => {
    onClose();
    setDateValue(null);

    //Reset State
    setCheckEmptyInvoiceId(false);
    setCheckEmptyInvoiceDate(false);
    setCheckEmptyInvoiceName(false);
    setCheckEmptyTotalAmount(false);
    setCheckEmptyInvoiceStatus(false);
  };

  const handleNumberInput = (event) => {
    setInvoiceNumber(event.target.value);
  };

  const handleNameInput = (event) => {
    setInvoiceName(event.target.value);
  };

  return (
    <Box
      sx={{
        my: 2,
        mx: 2,
      }}
    >
      <Dialog open={open} onClose={handleClose} sx={{ alignment: "center" }}>
        <Box
          sx={{
            alignItems: "center",
            display: "flex",
            justifyContent: "space-between",
            mt: 1,
            flexWrap: "wrap",
          }}
        >
          <DialogTitle sx={{ fontSize: "h4.fontSize" }}>Edit Invoice</DialogTitle>
          <IconButton onClick={handleClose} sx={{ mr: 2 }}>
            <CloseIcon />
          </IconButton>
        </Box>
        <DialogContent sx={{ alignItems: "center", display: "flex" }}>
          <form action="/" method="POST">
            <FormControl fullWidth>
              {checkEmptyInvoiceId ? (
                <Typography color="error" sx={{ mb: 1 }}>
                  Please fill in all the required fields
                </Typography>
              ) : null}

              {invoice.map((invoice) => (
                <>
                  <TextField
                    name="invoiceNumber"
                    label="Invoice Number"
                    hintText="Invoice Number"
                    sx={{ display: "block" }}
                    fullWidth
                    defaultValue={invoice.InvoiceNumber}
                    required
                    error={checkEmptyInvoiceId ? true : false}
                    onChange={handleNumberInput}
                  />
                  <TextField
                    name="Name"
                    hintText="Invoice Name"
                    label="Invoice Name"
                    sx={{ mt: 2, display: "block" }}
                    fullWidth
                    defaultValue={invoice.Name}
                    required
                    error={checkEmptyInvoiceName ? true : false}
                  />
                  <Grid sx={{ mt: 2, display: "block" }}>
                    <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ms}>
                      <DatePicker
                        label="Invoice Date"
                        value={dateValue ? dateValue : invoice.InvoiceDate}
                        onChange={(value) => {
                          setDateValue(value);
                        }}
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
                        hintText="200g"
                        label="Qty 200g"
                        sx={{ mt: 2, display: "block" }}
                        defaultValue={invoice.Qty200g}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        name="invoice500g"
                        hintText="500g"
                        label="Qty 500g"
                        sx={{ mt: 2, display: "block" }}
                        defaultValue={invoice.Qty500g}
                      />
                    </Grid>
                  </Grid>
                  <TextField
                    name="invoiceAmount"
                    hintText="Invoice Amount (RM)"
                    label="Invoice Amount (RM)"
                    value={invoice.InvoiceAmount}
                    sx={{ mt: 2, display: "block" }}
                    InputProps={{
                      startAdornment: <InputAdornment position="start">RM</InputAdornment>,
                    }}
                    fullWidth
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
                    defaultValue={invoice.Status}
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    <MenuItem value="Paid">Paid</MenuItem>
                    <MenuItem value="Pending">Pending</MenuItem>
                  </TextField>
                  <Button
                    type="submit"
                    onClick={() => updateInvoice(invoice._id)}
                    variant="contained"
                    sx={{ my: 2 }}
                  >
                    Update
                  </Button>
                </>
              ))}
            </FormControl>
          </form>
        </DialogContent>
      </Dialog>
    </Box>
  );
};
