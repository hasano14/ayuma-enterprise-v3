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
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import CashbillDataService from "../../services/cashbill";

export const CashbillDialogUpdate = (props) => {
  const { onClose, open, id, ...other } = props;
  const [dateValue, setDateValue] = useState(null);
  const [cashbill, setCashbill] = useState([]);
  const [cashbillStatus, setCashbillStatus] = useState("");

  useEffect(() => {
    retrieveCashbill(id);
  }, []);

  const handleStatusChange = (event) => {
    setCashbillStatus(event.target.value);
  };

  //Retrieve Cashbill by ID
  const retrieveCashbill = (id) => {
    CashbillDataService.get(id)
      .then((response) => {
        setCashbill(response.data.cashbillData);
        console.log(response.data);
      })
      .catch((e) => {
        console.log("Error");
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
            mt: 1,
            flexWrap: "wrap",
          }}
        >
          <DialogTitle sx={{ fontSize: "h4.fontSize" }}>Edit Cashbill</DialogTitle>
          <IconButton onClick={onClose} sx={{ mr: 2 }}>
            <CloseIcon />
          </IconButton>
        </Box>
        <DialogContent sx={{ alignItems: "center", display: "flex" }}>
          <form action="/" method="POST">
            <FormControl fullWidth>
              <TextField
                name="cashbillNumber"
                label="Cashbill Number"
                hintText="Cashbill Number"
                sx={{ display: "block" }}
                fullWidth
                defaultValue="Testing"
              />
              <TextField
                name="Name"
                hintText="Cashbill Name"
                label="Cashbill Name"
                sx={{ mt: 2, display: "block" }}
                fullWidth
                defaultValue={cashbill.Name}
              />
              <Box sx={{ mt: 2, display: "block" }}>
                <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ms}>
                  <DatePicker
                    label="Cashbill Date"
                    value={dateValue}
                    onChange={(value) => {
                      setDateValue(value);
                    }}
                    renderInput={(params) => <TextField {...params} />}
                  />
                </LocalizationProvider>
              </Box>
              <TextField
                name="cashbillAmount"
                hintText="Cashbill Amount (RM)"
                label="Cashbill Amount (RM)"
                sx={{ mt: 2, display: "block" }}
                InputProps={{
                  startAdornment: <InputAdornment position="start">RM</InputAdornment>,
                }}
                fullWidth
              />
              <TextField
                name="cashbillStatus"
                hintText="Select Status"
                label="Status"
                select
                onChange={handleStatusChange}
                sx={{ mt: 2, display: "block" }}
                fullWidth
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value="Paid">Paid</MenuItem>
                <MenuItem value="Pending">Pending</MenuItem>
                <MenuItem value="Refunded">Refunded</MenuItem>
              </TextField>
              <Button type="submit" variant="contained" sx={{ my: 2 }}>
                Update
              </Button>
            </FormControl>
          </form>
        </DialogContent>
      </Dialog>
    </Box>
  );
};
