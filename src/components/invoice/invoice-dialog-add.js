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
  IconButton,
  InputAdornment,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import InvoiceDataService from "../../services/invoices";
import { textTransform } from "@mui/system";

export const InvoiceDialogAdd = (props) => {
  const { onClose, open, ...other } = props;
  const [dateValue, setDateValue] = useState(null);
  const [invoice, setInvoice] = useState([]);

  return (
    <Box
      sx={{
        my: 2,
        mx: 2,
      }}
    >
      <Dialog open={open} onClose={onClose} sx={{ alignment: "center" }}>
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
          <IconButton onClick={onClose} sx={{ mr: 2 }}>
            <CloseIcon />
          </IconButton>
        </Box>
        <DialogContent sx={{ alignItems: "center", display: "flex" }}>
          <form action="/" method="POST">
            <FormControl>
              <TextField
                name="invoiceNumber"
                label="Invoice Number"
                hintText="Invoice Number"
                sx={{ display: "block" }}
                fullWidth
                defaultValue={invoice.InvoiceNumber}
              />
              <TextField
                name="Name"
                hintText="Invoice Name"
                label="Invoice Name"
                sx={{ mt: 2, display: "block" }}
                fullWidth
              />
              <Box sx={{ mt: 2, display: "block" }}>
                <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ms}>
                  <DatePicker
                    label="Invoice Date"
                    value={dateValue}
                    onChange={(value) => {
                      setDateValue(value);
                    }}
                    renderInput={(params) => <TextField {...params} />}
                  />
                </LocalizationProvider>
              </Box>
              <TextField
                name="invoiceAmount"
                hintText="Invoice Amount (RM)"
                label="Invoice Amount (RM)"
                sx={{ mt: 2, display: "block" }}
                InputProps={{
                  startAdornment: <InputAdornment position="start">RM</InputAdornment>,
                }}
                fullWidth
              />
              <Button type="submit" variant="contained" sx={{ my: 2 }}>
                Add
              </Button>
            </FormControl>
          </form>
        </DialogContent>
      </Dialog>
    </Box>
  );
};
