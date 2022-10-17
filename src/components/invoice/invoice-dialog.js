/* eslint-disable react/jsx-max-props-per-line */
import React, { useState } from "react";
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
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

export const InvoiceDialog = (props) => {
  const { onClose, open, ...other } = props;
  const [dateValue, setDateValue] = useState(null);

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
            m: 1,
            flexWrap: "wrap",
          }}
        >
          <DialogTitle sx={{ fontSize: "h4.fontSize" }}>Invoice Details</DialogTitle>
          <IconButton onClick={onClose}>
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
                sx={{ mt: 2, display: "block" }}
                fullWidth
              />
              <TextField
                name="invoiceName"
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
              <Button type="submit" variant="contained" sx={{ my: 2 }}>
                Submit
              </Button>
            </FormControl>
          </form>
        </DialogContent>
      </Dialog>
    </Box>
  );
};
