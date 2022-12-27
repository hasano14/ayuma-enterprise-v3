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
  TableRow,
  TableCell,
  IconButton,
  InputAdornment,
  InputLabel,
  Select,
  Stack,
  MenuItem,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import InvoiceDataService from "../../services/invoices";

export const InvoiceDialogSearch = (props) => {
  const { onClose, open, search, ...other } = props;
  const [invoiceResult, setInvoiceResult] = useState([]);

  useEffect(() => {
    retrieveInvoice();
  }, [search]);

  const retrieveInvoice = () => {
    if (search !== "") {
      InvoiceDataService.find(search, "InvoiceNumber").then((response) => {
        setInvoiceResult(response.data.invoiceData);
      });
    }
  };

  const handleClose = () => {
    onClose("Clear");
    setInvoiceResult([]);
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
            flexWrap: "wrap",
            mt: 1,
          }}
        >
          <DialogTitle sx={{ fontSize: "h4.fontSize", textAlign: "center" }}>
            Search Result
          </DialogTitle>
          <IconButton onClick={handleClose} sx={{ mr: 2 }}>
            <CloseIcon />
          </IconButton>
        </Box>
        <DialogContent sx={{ alignItems: "center", display: "flex" }}>
          {invoiceResult.length > 0 ? (
            invoiceResult.map((invoice) => (
              <>
                <Stack spacing={1}>
                  <Stack direction="row" spacing={1}>
                    <Typography sx={{ fontWeight: "bold" }}>Invoice Number:</Typography>
                    <Typography> {invoice.InvoiceNumber}</Typography>
                  </Stack>
                  <Stack direction="row" spacing={1}>
                    <Typography sx={{ fontWeight: "bold" }}>Name:</Typography>
                    <Typography>{invoice.Name}</Typography>
                  </Stack>
                  <Stack direction="row" spacing={1}>
                    <Typography sx={{ fontWeight: "bold" }}>Qty (200g):</Typography>
                    <Typography>{invoice.Qty200g}</Typography>
                  </Stack>
                  <Stack direction="row" spacing={1}>
                    <Typography sx={{ fontWeight: "bold" }}>Qty (500g):</Typography>
                    <Typography>{invoice.Qty500g}</Typography>
                  </Stack>
                  <Stack direction="row" spacing={1}>
                    <Typography sx={{ fontWeight: "bold" }}>Total Amount (RM):</Typography>
                    <Typography>{invoice.InvoiceAmount}</Typography>
                  </Stack>
                </Stack>
              </>
            ))
          ) : (
            <Typography sx={{ fontWeight: "bold" }}>No Result Found</Typography>
          )}
        </DialogContent>
      </Dialog>
    </Box>
  );
};
