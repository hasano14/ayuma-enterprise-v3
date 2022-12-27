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
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import CashbillDataService from "../../services/cashbill";

export const CashbillDialogAdd = (props) => {
  const { onClose, open, ...other } = props;
  const [dateValue, setDateValue] = useState(null);

  //Handle Cashbill Changes
  const [cashbillStatus, setCashbillStatus] = useState("");
  const [cashbillId, setCashbillId] = useState("");
  const [cashbillName, setCashbillName] = useState("");
  const [cashbillDate, setCashbillDate] = useState(null);
  const [cashbillAmount, setCashbillAmount] = useState("");

  const handleStatusChange = (event) => {
    setCashbillStatus(event.target.value);
  };

  const handleDateChange = (newValue) => {
    setDateValue(newValue);
    setCashbillDate(newValue);
  };

  //Handle Cashbill Add
  const addCashbill = () => {
    var data = {
      cashbillNumber: cashbillId,
      cashbillName: cashbillName,
      cashbillDate: cashbillDate,
      cashbillStatus: cashbillStatus,
      cashbillAmount: cashbillAmount,
    };

    CashbillDataService.create(data)
      .then((response) => {
        console.log(response.data);
        onClose("Received");
      })
      .catch((e) => {
        console.log(e);
      });
  };

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
          <DialogTitle sx={{ fontSize: "h4.fontSize" }}>Add Cash Bill</DialogTitle>
          <IconButton onClick={onClose} sx={{ mr: 2 }}>
            <CloseIcon />
          </IconButton>
        </Box>
        <DialogContent sx={{ alignItems: "center", display: "flex" }}>
          <form action="/" method="POST">
            <FormControl fullWidth>
              <TextField
                id="cashbillNumber"
                name="cashbillNumber"
                label="No."
                hintText="No."
                sx={{ display: "block" }}
                fullWidth
                onChange={(e) => setCashbillId(e.target.value)}
                required
              />
              <TextField
                name="Name"
                hintText="Name"
                label="Name"
                sx={{ mt: 2, display: "block" }}
                fullWidth
                onChange={(e) => setCashbillName(e.target.value)}
                required
              />
              <Box sx={{ mt: 2, display: "block" }}>
                <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ms}>
                  <DatePicker
                    label="Date"
                    value={dateValue}
                    onChange={handleDateChange}
                    renderInput={(params) => <TextField {...params} />}
                    required
                  />
                </LocalizationProvider>
              </Box>
              <TextField
                name="cashbillAmount"
                hintText="Total Amount (RM)"
                label="Total Amount (RM)"
                sx={{ mt: 2, display: "block" }}
                InputProps={{
                  startAdornment: <InputAdornment position="start">RM</InputAdornment>,
                }}
                fullWidth
                onChange={(e) => setCashbillAmount(e.target.value)}
                required
              />
              <TextField
                name="cashbillStatus"
                hintText="Select Status"
                label="Status"
                select
                onChange={handleStatusChange}
                sx={{ mt: 2, display: "block" }}
                fullWidth
                required
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value="Paid">Paid</MenuItem>
                <MenuItem value="Pending">Pending</MenuItem>
              </TextField>
              <Button variant="contained" sx={{ my: 2 }} onClick={addCashbill}>
                Add
              </Button>
            </FormControl>
          </form>
        </DialogContent>
      </Dialog>
    </Box>
  );
};
